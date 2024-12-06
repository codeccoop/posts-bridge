<?php

namespace POSTS_BRIDGE;

use WP_REST_Server;
use WPCT_ABSTRACT\REST_Settings_Controller as Base_REST_Settings_Controller;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Plugin REST API controller
 */
class REST_Settings_Controller extends Base_REST_Settings_Controller
{
    /**
     * Handle REST API controller namespace.
     *
     * @var string $namespace REST API namespace.
     */
    protected static $namespace = 'wp-bridges';

    /**
     * Handle REST API controller namespace version.
     *
     * @var int $version REST API namespace version.
     */
    protected static $version = 1;

    /**
     * Handle plugin settings names.
     *
     * @var array<string> $settings Plugin settings names list.
     */
    protected static $settings = ['general', 'rest-api', 'rpc-api'];

    /**
     * Handle internat WP post types excluded from relations.
     *
     * @var array<string> Post type slugs.
     */
    private static $_excluded_post_types = [
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
     * Overwrite of the parent constructor to register the post types route
     *
     * @param string $group Plugin settings group name.
     */
    public function construct(...$args)
    {
        [$group] = $args;
        parent::construct($group);

        add_action('rest_api_init', function () {
            $this->register_post_types_route();
        });
    }

    /**
     * Registers the post types REST API route.
     */
    private function register_post_types_route()
    {
        $namespace = self::$namespace;
        $version = self::$version;
        register_rest_route(
            "{$namespace}/v{$version}",
            '/posts-bridge/types/',
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => function () {
                    return $this->get_post_types();
                },
                'permission_callback' => function () {
                    return $this->permission_callback();
                },
            ]
        );
    }

    /**
     * Get available post types on the WP instance excluding WP internal posts.
     *
     * @return array Array of post type slugs.
     */
    private function get_post_types()
    {
        return array_values(
            array_filter(array_values(get_post_types()), function ($post_type) {
                return !in_array($post_type, self::$_excluded_post_types);
            })
        );
    }
}
