<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

class Custom_Post_Type
{
    /**
     * Handle internat WP post types.
     *
     * @var array
     */
    private const internal_post_types = [
        'attachment',
        'revision',
        'nav_menu_item',
        'custom_css',
        'customize_changeset',
        'oembed_cache',
        'user_request',
        'wp_block',
        'wp_template',
        'wp_template_part',
        'wp_global_styles',
        'wp_navigation',
        'wp_font_family',
        'wp_font_face',
    ];

    /**
     * Handle post types registry option name.
     *
     * @var string
     */
    private const option_name = 'posts_bridge_custom_post_types';

    /**
     * Handle post supports tokens.
     *
     * @var array
     */
    private const supports_tokens = [
        'title',
        'editor',
        'featured_image',
        'excerpt',
        'custom_fields',
        'author',
        'comments',
        'trackbacks',
    ];

    /**
     * Handle custom post types registry.
     *
     * @var array|null
     */
    private static $registry = null;

    public static function load()
    {
        add_action(
            'add_option_' . self::option_name,
            static function ($option, $value) {
                self::$registry = $value;
            },
            10,
            2
        );

        add_action(
            'update_option_' . self::option_name,
            function ($from, $to) {
                self::$registry = $to;
            },
            10,
            2
        );

        add_action(
            'delete_option_' . self::option_name,
            function () {
                self::$registry = null;
            },
            10,
            0
        );

        self::handle_setting();

        add_action(
            'init',
            static function () {
                self::init();
            },
            10
        );
    }

    public static function register($name, $args)
    {
        $registry = self::registry();

        $name = sanitize_title($name);
        $registry[$name] = self::sanitize_args($name, $args);

        update_option(self::option_name, $registry);

        self::register_post_type($name, $args);
    }

    public static function unregister($name)
    {
        $name = sanitize_title($name);

        $registry = self::registry();
        unset($registry[$name]);

        update_option(self::option_name, $registry);

        unregister_post_type($name);
    }

    private static function registry()
    {
        if (is_array(self::$registry)) {
            return self::$registry;
        }

        self::$registry = (array) get_option(self::option_name, []);
        return self::$registry;
    }

    private static function init()
    {
        $cpts = self::registry();

        foreach ($cpts as $name => $args) {
            self::register_post_type($name, $args);
        }
    }

    private static function post_types()
    {
        $post_types = array_keys(get_post_types());

        return array_values(
            array_filter($post_types, static function ($post_type) {
                return !in_array($post_type, self::internal_post_types);
            })
        );
    }

    private static function register_post_type($name, $args)
    {
        $name = sanitize_title($name);

        $args['labels'] = [
            'name' => $args['label'],
            'singular_name' => $args['singular_label'],
        ];

        unset($args['label']);
        unset($args['singular_label']);

        register_post_type($name, $args);
    }

    private static function handle_setting()
    {
        $setting_name = Posts_Bridge::slug() . '_general';

        add_filter(
            'wpct_setting_default',
            static function ($default, $name) use ($setting_name) {
                if ($name !== $setting_name) {
                    return $default;
                }

                return array_merge($default, [
                    'post_types' => self::post_types(),
                ]);
            },
            10,
            2
        );

        add_filter(
            "option_{$setting_name}",
            static function ($value) {
                if (!is_array($value)) {
                    return $value;
                }

                return array_merge($value, [
                    'post_types' => self::post_types(),
                ]);
            },
            9,
            2
        );

        add_filter(
            'wpct_validate_setting',
            static function ($data, $setting) use ($setting_name) {
                if ($setting->full_name() !== $setting_name) {
                    return $data;
                }

                unset($data['post_types']);
                return $data;
            },
            9,
            2
        );
    }

    private function sanitize_args($name, $args)
    {
        return array_merge($args, [
            'label' =>
                !empty($args['label']) && is_string($args['label'])
                    ? sanitize_text_field($args['label'])
                    : $name,
            'singular_label' =>
                !empty($args['singular_label']) &&
                is_string($args['singular_label'])
                    ? sanitize_text_field($args['singular_label'])
                    : $name,
            'rewrite' =>
                !empty($args['rewrite']) && is_string($args['rewrite'])
                    ? ['slug' => sanitize_title($args['rewrite'])]
                    : (is_array($args['rewrite']) &&
                    isset($args['rewrite']['slug'])
                        ? ['slug' => sanitize_title($args['rewrite']['slug'])]
                        : false),
            'rest_base' =>
                !empty($args['rest_base']) && is_string($args['rest_base'])
                    ? sanitize_title($args['rest_base'])
                    : $name,
            'public' => $args['public'] ?? true,
            'publicly_queryable' => $args['queryable'] ?? true,
            'show_in_menu' => $args['show_in_menu'] ?? true,
            'supports' =>
                isset($args['supports']) && is_array($args['supports'])
                    ? array_map(
                        function ($token) {
                            return trim($token);
                        },
                        array_filter($args['supports'], static function (
                            $token
                        ) {
                            $token = trim($token);
                            return in_array(
                                $token,
                                self::supports_tokens,
                                true
                            );
                        })
                    )
                    : ['title', 'featured_image', 'excerpt'],
            'taxonomies' => isset($args['taxonomies'])
                ? array_map(
                    function ($tax) {
                        return trim($tax);
                    },
                    is_string($args['taxonomies'])
                        ? explode(',', $args['taxonomies'])
                        : (is_array($args['taxonomies'])
                            ? $args['taxonomies']
                            : [])
                )
                : [],
        ]);
    }
}
