<?php

namespace POSTS_BRIDGE;

use Exception;
use ReflectionClass;
use WPCT_ABSTRACT\Singleton;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Abstract addon class to be used by addons.
 */
abstract class Addon extends Singleton
{
    /**
     * Handles addon's registry option name.
     *
     * @var string registry
     */
    private const registry = 'posts_bridge_addons';

    /**
     * Handles addon public name.
     *
     * @var string $name
     */
    protected static $name;

    /**
     * Handles addon's API name.
     *
     * @var string
     */
    protected static $api;

    /**
     * Handles addon's custom bridge class name.
     *
     * @var string
     */
    protected static $bridge_class = '\POSTS_BRIDGE\Post_Bridge';

    /**
     * Public singleton initializer.
     */
    final public static function setup(...$args)
    {
        return static::get_instance(...$args);
    }

    /**
     * Public addons registry getter.
     *
     * @return array Addons registry state.
     */
    final public static function registry()
    {
        $state = (array) get_option(self::registry, ['rest-api' => true]);
        $addons_dir = dirname(__FILE__);
        $addons = array_diff(scandir($addons_dir), ['.', '..']);

        $registry = [];
        foreach ($addons as $addon) {
            $addon_dir = "{$addons_dir}/{$addon}";
            if (!is_dir($addon_dir)) {
                continue;
            }

            $index = "{$addon_dir}/{$addon}.php";
            if (is_file($index)) {
                $registry[$addon] = isset($state[$addon])
                    ? (bool) $state[$addon]
                    : false;
            }
        }

        return $registry;
    }

    /**
     * Updates the addons' registry state.
     *
     * @param array $value Plugin's general setting data.
     */
    private static function update_registry($addons = [])
    {
        $registry = self::registry();
        foreach ($addons as $addon => $enabled) {
            if (!isset($registry[$addon])) {
                continue;
            }

            $registry[$addon] = (bool) $enabled;
        }

        update_option(self::registry, $registry);
    }

    /**
     * Public addons loader.
     */
    final public static function load()
    {
        $registry = self::registry();
        foreach ($registry as $addon => $enabled) {
            if ($enabled) {
                require_once dirname(__FILE__) . "/{$addon}/{$addon}.php";
            }
        }

        $general_setting = Posts_Bridge::slug() . '_general';
        add_filter(
            'wpct_setting_default',
            static function ($default, $name) use ($general_setting) {
                if ($name !== $general_setting) {
                    return $default;
                }

                return array_merge($default, ['addons' => self::registry()]);
            },
            10,
            2
        );

        add_filter(
            "option_{$general_setting}",
            static function ($value) {
                if (!is_array($value)) {
                    return $value;
                }

                return array_merge($value, ['addons' => self::registry()]);
            },
            10,
            1
        );

        add_filter(
            'wpct_validate_setting',
            static function ($data, $setting) use ($general_setting) {
                if ($setting->full_name() !== $general_setting) {
                    return $data;
                }

                self::update_registry((array) $data['addons']);
                unset($data['addons']);

                return $data;
            },
            9,
            2
        );
    }

    /**
     * Abstract setting registration method to be overwriten by its descendants.
     */
    abstract protected static function setting_config();

    /**
     * Abstract setting validation method to be overwriten by its descendants.
     * This method will be executed before each database update on the options table.
     *
     * @param array $data Setting value.
     * @param Setting $setting Setting instance.
     *
     * @return array Validated value.
     */
    abstract protected static function validate_setting($value, $setting);

    /**
     * Private class constructor. Add addons scripts as dependency to the
     * plugin's scripts and setup settings hooks.
     */
    protected function construct(...$args)
    {
        if (!(static::$name && static::$api)) {
            throw new Exception('Invalid addon registration');
        }

        self::load_templates();
        self::handle_settings();
        self::admin_scripts();

        add_filter(
            'posts_bridge_bridges',
            static function ($bridges, $api = null) {
                return self::bridges($bridges, $api);
            },
            10,
            2
        );

        add_filter(
            'posts_bridge_bridge',
            static function ($bridge, $name) {
                if ($bridge instanceof Post_Bridge) {
                    return $bridge;
                }

                $bridges = static::setting()->bridges;
                foreach ($bridges as $bridge_data) {
                    if ($bridge_data['name'] === $name) {
                        return new static::$bridge_class(
                            $bridge_data,
                            static::$api
                        );
                    }
                }

                return $bridge;
            },
            10,
            2
        );
    }

    /**
     * Addon templates getter.
     *
     * @todo Define abstract template and implementations.
     *
     * @return array List with addon template instances.
     */
    final protected static function templates()
    {
        return apply_filters('posts_bridge_templates', [], static::$api);
    }

    /**
     * Addon's setting name getter.
     *
     * @return string
     */
    final protected static function setting_name()
    {
        return Posts_Bridge::slug() . '_' . static::$api;
    }

    /**
     * Addon setting getter.
     *
     * @return Setting|null Setting instance.
     */
    final protected static function setting()
    {
        return Posts_Bridge::setting(static::$api);
    }

    /**
     * Adds addons' bridges to the available bridges list.
     *
     * @param array $bridges List with available bridges.
     * @param string $api API name to filter by.
     *
     * @return array List with available bridges.
     */
    private static function bridges($bridges, $api = null)
    {
        if (!wp_is_numeric_array($bridges)) {
            $bridges = [];
        }

        if (!empty($api) && $api !== static::$api) {
            return $bridges;
        }

        return array_merge(
            $bridges,
            array_map(
                static function ($bridge_data) {
                    return new static::$bridge_class(
                        $bridge_data,
                        static::$api
                    );
                },
                static::setting()->bridges ?: []
            )
        );
    }

    /**
     * Settings hooks interceptors to register on the plugin's settings store
     * the addon setting.
     */
    private static function handle_settings()
    {
        add_filter(
            'wpct_settings_config',
            static function ($config, $group) {
                if ($group !== Posts_Bridge::slug()) {
                    return $config;
                }

                return array_merge($config, [static::setting_config()]);
            },
            10,
            2
        );

        add_filter(
            'wpct_validate_setting',
            static function ($data, $setting) {
                return self::do_validation($data, $setting);
            },
            11,
            2
        );

        add_filter(
            'wpct_setting_default',
            static function ($default, $name) {
                if ($name !== self::setting_name()) {
                    return $default;
                }

                return array_merge($default, [
                    'templates' => static::templates(),
                ]);
            },
            10,
            2
        );

        add_filter(
            'option_' . self::setting_name(),
            static function ($value) {
                if (!is_array($value)) {
                    return $value;
                }

                return array_merge($value, [
                    'templates' => static::templates(),
                ]);
            },
            10,
            1
        );
    }

    /**
     * Enqueue addon scripts as wordpress scripts and shifts it
     * as dependency to the posts bridge admin script.
     */
    private static function admin_scripts()
    {
        add_action(
            'admin_enqueue_scripts',
            static function ($admin_page) {
                if ('settings_page_' . Posts_Bridge::slug() !== $admin_page) {
                    return;
                }

                $reflector = new ReflectionClass(static::class);
                $__FILE__ = $reflector->getFileName();

                $script_name = Posts_Bridge::slug() . '-' . static::$api;
                wp_enqueue_script(
                    $script_name,
                    plugins_url('assets/addon.bundle.js', $__FILE__),
                    [
                        'react',
                        'react-jsx-runtime',
                        'wp-api-fetch',
                        'wp-components',
                        'wp-dom-ready',
                        'wp-element',
                        'wp-i18n',
                        'wp-api',
                    ],
                    Posts_Bridge::version(),
                    ['in_footer' => true]
                );

                wp_set_script_translations(
                    $script_name,
                    Posts_Bridge::slug(),
                    Posts_Bridge::path() . 'languages'
                );

                add_filter('posts_bridge_admin_script_deps', static function (
                    $deps
                ) use ($script_name) {
                    return array_merge($deps, [$script_name]);
                });
            },
            9,
            1
        );
    }

    /**
     * Middelware to the addon settings validation method to filter out of domain
     * setting updates.
     *
     * @param array $data Setting data.
     * @param Setting $setting Setting instance.
     *
     * @return array Validated setting data.
     */
    private static function do_validation($data, $setting)
    {
        if ($setting->full_name() !== self::setting_name()) {
            return $data;
        }

        unset($data['templates']);
        return static::validate_setting($data, $setting);
    }

    /**
     * Loads addon's bridge templates.
     */
    private static function load_templates()
    {
        $__FILE__ = (new ReflectionClass(static::class))->getFileName();
        $dir = dirname($__FILE__) . '/templates';

        static::$bridge_class::load_templates($dir, static::$api);
    }
}
