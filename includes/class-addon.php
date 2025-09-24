<?php

namespace POSTS_BRIDGE;

use PBAPI;
use WPCT_PLUGIN\Singleton;
use HTTP_BRIDGE\Settings_Store as Http_Store;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Base addon class to be used by addons.
 */
class Addon extends Singleton
{
    /**
     * Handles active addon instance references.
     *
     * @var array<string, Addon>
     */
    private static $addons = [];

    /**
     * Handles addon's registry option name.
     *
     * @var string registry
     */
    private const registry = 'posts_bridge_addons';

    /**
     * Handles addon public title.
     *
     * @var string
     */
    public const title = '';

    /**
     * Handles addon's API name.
     *
     * @var string
     */
    public const name = '';

    /**
     * Handles addon's custom bridge class name.
     *
     * @var string
     */
    public const bridge_class = '\POSTS_BRIDGE\Post_Bridge';

    /**
     * Addon's default config getter.
     *
     * @return array
     */
    public static function schema()
    {
        $bridge_schema = PBAPI::get_bridge_schema(static::name);

        return [
            'type' => 'object',
            'properties' => [
                'title' => ['type' => 'string'],
                'description' => [
                    'type' => 'string',
                    'default' => '',
                ],
                'bridges' => [
                    'type' => 'array',
                    'items' => $bridge_schema,
                    'default' => [],
                ],
            ],
            'required' => ['title', 'bridges'],
        ];
    }

    /**
     * Addon's default data getter.
     *
     * @return array
     */
    protected static function defaults()
    {
        return [
            'title' => static::title,
            'bridges' => [],
        ];
    }

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
        $state = get_option(self::registry, ['rest' => true]) ?: [];
        $addons_dir = POSTS_BRIDGE_ADDONS_DIR;
        $addons = array_diff(scandir($addons_dir), ['.', '..']);

        $registry = [];
        foreach ($addons as $addon) {
            $addon_dir = "{$addons_dir}/{$addon}";
            if (!is_dir($addon_dir)) {
                continue;
            }

            $index = "{$addon_dir}/class-{$addon}-addon.php";
            if (is_file($index) && is_readable($index)) {
                $registry[$addon] = boolval($state[$addon] ?? false);
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

    final public static function addons()
    {
        $addons = [];
        foreach (self::$addons as $addon) {
            if ($addon->enabled) {
                $addons[] = $addon;
            }
        }

        return $addons;
    }

    /**
     * Addon instances getter.
     *
     * @var string $name Addon name.
     *
     * @return Addon|null
     */
    final public static function addon($name)
    {
        return self::$addons[$name] ?? null;
    }

    /**
     * Public addons loader.
     */
    final public static function load_addons()
    {
        $addons_dir = POSTS_BRIDGE_ADDONS_DIR;
        $registry = self::registry();
        foreach ($registry as $addon => $enabled) {
            require_once "{$addons_dir}/{$addon}/class-{$addon}-addon.php";

            if ($enabled) {
                self::$addons[$addon]->load();
            }
        }

        Settings_Store::ready(function ($store) {
            $store::use_getter('general', static function ($data) {
                $registry = self::registry();
                $addons = [];
                foreach (self::$addons as $name => $addon) {
                    $logo_path =
                        POSTS_BRIDGE_ADDONS_DIR .
                        '/' .
                        $addon::name .
                        '/assets/logo.png';

                    if (is_file($logo_path) && is_readable($logo_path)) {
                        $logo = plugin_dir_url($logo_path) . 'logo.png';
                    } else {
                        $logo = '';
                    }

                    $addons[$name] = [
                        'name' => $name,
                        'title' => $addon::title,
                        'enabled' => $registry[$name] ?? false,
                        'logo' => $logo,
                    ];
                }

                ksort($addons);
                $addons = array_values($addons);

                $addons = apply_filters('posts_bridge_addons', $addons);
                return array_merge($data, ['addons' => $addons]);
            });

            $store::use_setter(
                'general',
                static function ($data) {
                    if (!isset($data['addons']) || !is_array($data['addons'])) {
                        return $data;
                    }

                    $registry = [];
                    foreach ($data['addons'] as $addon) {
                        $registry[$addon['name']] = (bool) $addon['enabled'];
                    }

                    self::update_registry($registry);

                    unset($data['addons']);
                    return $data;
                },
                9
            );
        });
    }

    /**
     * Middelware to the addon settings validation method to filter out of domain
     * setting updates.
     *
     * @param array $data Setting data.
     *
     * @return array Validated setting data.
     */
    private static function sanitize_setting($data)
    {
        if (!isset($data['bridges'])) {
            return $data;
        }

        $data['bridges'] = static::sanitize_bridges($data['bridges']);

        return $data;
    }

    /**
     * Apply bridges setting data sanitization and validation.
     *
     * @param array $bridges Collection of bridges data.
     *
     * @return array
     */
    private static function sanitize_bridges($bridges)
    {
        $post_types = PBAPI::get_post_types();

        $uniques = [];
        $sanitized = [];

        $schema = PBAPI::get_bridge_schema(static::name);
        foreach ($bridges as $bridge) {
            $bridge['post_type'] = trim($bridge['post_type']);

            if (!in_array($bridge['post_type'], $post_types, true)) {
                continue;
            }

            if (in_array($bridge['post_type'], $uniques, true)) {
                continue;
            }

            $bridge = static::sanitize_bridge($bridge, $schema);
            if ($bridge) {
                $sanitized[] = $bridge;
                $uniques[] = $bridge['post_type'];
            }
        }

        return $sanitized;
    }

    /**
     * Common bridge sanitization method.
     *
     * @param array $bridge Bridge data.
     * @param array $schema Bridge schema.
     *
     * @return array
     */
    protected static function sanitize_bridge($bridge, $schema)
    {
        $backends = Http_Store::setting('general')->backends ?: [];

        foreach ($backends as $candidate) {
            if ($candidate['name'] === $bridge['backend']) {
                $backend = $candidate;
                break;
            }
        }

        if (!isset($backend)) {
            $bridge['backend'] = '';
        }

        $mappers = [];
        foreach ($bridge['mappers'] ?? [] as $mapper) {
            if (!empty($mapper['name']) && !empty(['foreign'])) {
                $mappers[] = $mapper;
            }
        }

        $bridge['mappers'] = $mappers;

        $bridge['is_valid'] =
            $bridge['backend'] && $bridge['method'] && $bridge['endpoint'];

        $bridge['enabled'] = boolval($bridge['enabled'] ?? true);
        return $bridge;
    }

    public $enabled = false;

    /**
     * Private class constructor. Add addons scripts as dependency to the
     * plugin's scripts and setup settings hooks.
     */
    protected function construct(...$args)
    {
        if (empty(static::name) || empty(static::title)) {
            Logger::log('Skip invalid addon registration', Logger::DEBUG);
            Logger::log(
                'Addon name and title const are required',
                Logger::ERROR
            );
            return;
        }

        self::$addons[static::name] = $this;
    }

    public function load()
    {
        add_filter(
            'posts_bridge_bridges',
            static function ($bridges, $addon = null) {
                if (!wp_is_numeric_array($bridges)) {
                    $bridges = [];
                }

                if ($addon && $addon !== static::name) {
                    return $bridges;
                }

                $setting = static::setting();
                if (!$setting) {
                    return $bridges;
                }

                foreach ($setting->bridges ?: [] as $bridge_data) {
                    $bridge_class = static::bridge_class;
                    $bridges[] = new $bridge_class($bridge_data, static::name);
                }

                return $bridges;
            },
            10,
            2
        );

        add_filter(
            'posts_bridge_remote_cpts',
            static function ($post_types, $addon = null) {
                if (!wp_is_numeric_array($post_types)) {
                    $post_types = [];
                }

                if ($addon && $addon !== static::name) {
                    return $post_types;
                }

                $setting = static::setting();
                if (!$setting) {
                    return $post_types;
                }

                foreach ($setting->bridges ?: [] as $bridge_data) {
                    $post_types[] = $bridge_data['post_type'];
                }

                return $post_types;
            },
            10,
            2
        );

        Settings_Store::register_setting(static function ($settings) {
            $schema = static::schema();
            $schema['name'] = static::name;
            $schema['default'] = static::defaults();

            $settings[] = $schema;
            return $settings;
        });

        Settings_Store::ready(static function ($store) {
            $store::use_setter(
                static::name,
                static function ($data) {
                    return static::sanitize_setting($data);
                },
                9
            );
        });

        $this->enabled = true;
    }

    /**
     * Addon's setting name getter.
     *
     * @return string
     */
    final protected static function setting_name()
    {
        return 'posts-bridge_' . static::name;
    }

    /**
     * Addon setting getter.
     *
     * @return Setting|null Setting instance.
     */
    final protected static function setting()
    {
        return Posts_Bridge::setting(static::name);
    }

    // /**
    //  * Registers remote cpts remote fields as post meta to make it visibles
    //  * on the REST API.
    //  */
    // private static function register_meta()
    // {
    //     $bridges = static::bridges();
    //     foreach ($bridges as $bridge) {
    //         $bridge->register_meta();
    //     }
    // }
}
