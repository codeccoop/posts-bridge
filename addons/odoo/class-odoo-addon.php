<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-odoo-post-bridge.php';

/**
 * Odoo Addon class.
 */
class Odoo_Addon extends Addon
{
    /**
     * Handles the addon name.
     *
     * @var string
     */
    public const title = 'Odoo JSON-RPC';

    /**
     * Handles the addon's API name.
     *
     * @var string
     */
    public const name = 'odoo';

    /**
     * Handles the addom's custom relation class.
     *
     * @var string
     */
    protected static $bridge_class = '\POSTS_BRIDGE\Odoo_Post_Bridge';

    /**
     * Addon constructor. Inherits from the abstract addon and sets up custom hooks.
     */
    protected function construct(...$args)
    {
        parent::construct(...$args);
        self::custom_hooks();
    }

    /**
     * Addon custom hooks.
     */
    private static function custom_hooks()
    {
        add_filter('posts_bridge_odoo_dbs', static function ($dbs) {
            if (!wp_is_numeric_array($dbs)) {
                $dbs = [];
            }

            return array_merge($dbs, self::databases());
        });

        add_filter(
            'posts_bridge_odoo_db',
            static function ($db, $name) {
                if ($db instanceof Odoo_DB) {
                    return $db;
                }

                $dbs = self::databases();
                foreach ($dbs as $db) {
                    if ($db->name === $name) {
                        return $db;
                    }
                }
            },
            10,
            2
        );
    }

    /**
     * Addon databases instances getter.
     *
     * @return array List with available databases instances.
     */
    private static function databases()
    {
        return array_map(function ($db_data) {
            return new Odoo_DB($db_data);
        }, self::setting()->databases);
    }

    /**
     * Registers the setting and its fields.
     *
     * @return array Addon's setting configuration.
     */
    protected static function setting_config()
    {
        return [
            self::$api,
            [
                'databases' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'additionalProperties' => false,
                        'properties' => [
                            'name' => ['type' => 'string'],
                            'user' => ['type' => 'string'],
                            'password' => ['type' => 'string'],
                            'backend' => ['type' => 'string'],
                        ],
                        'required' => ['name', 'user', 'password', 'backend'],
                    ],
                ],
                'bridges' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'additionalProperties' => false,
                        'properties' => [
                            'post_type' => ['type' => 'string'],
                            'model' => ['type' => 'string'],
                            'database' => ['type' => 'string'],
                            'fields' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'additionalProperties' => false,
                                    'properties' => [
                                        'name' => [
                                            'type' => 'string',
                                            'minLength' => 1,
                                        ],
                                        'foreign' => [
                                            'type' => 'string',
                                            'minLength' => 1,
                                        ],
                                    ],
                                    'required' => ['name', 'foreign'],
                                ],
                            ],
                            'template' => ['type' => 'string'],
                        ],
                        'required' => [
                            'post_type',
                            'model',
                            'database',
                            'fields',
                        ],
                    ],
                ],
            ],
            [
                'databases' => [],
                'bridges' => [],
            ],
        ];
    }

    /**
     * Validate setting data callback.
     *
     * @param array $data Setting data.
     *
     * @return array Validated setting data.
     */
    protected static function validate_setting($data)
    {
        $data['databases'] = self::validate_databases($data['databases']);
        $data['bridges'] = self::validate_bridges(
            $data['bridges'],
            $data['databases']
        );

        return $data;
    }

    /**
     * Database setting field validation.
     *
     * @param array $dbs Databases data.
     *
     * @return array Validated databases data.
     */
    private static function validate_databases($dbs)
    {
        if (!wp_is_numeric_array($dbs)) {
            return [];
        }

        $backends = array_map(
            static function ($backend) {
                return $backend['name'];
            },
            \HTTP_BRIDGE\Settings_Store::setting('general')->backends ?: []
        );

        return array_filter($dbs, static function ($db_data) use ($backends) {
            return in_array($db_data['backend'], $backends, true);
        });
    }

    /**
     * Validate bridge settings. Filters bridges with inconsistencies with
     * the current store state.
     *
     * @param array $bridges Array with bridge configurations.
     * @param array $dbs Array with databases data.
     *
     * @return array Array with valid bridge configurations.
     */
    private static function validate_bridges($bridges, $dbs)
    {
        if (!wp_is_numeric_array($bridges)) {
            return [];
        }

        $post_types = get_post_types();

        $templates = array_map(function ($template) {
            return $template['name'];
        }, apply_filters('posts_bridge_templates', [], 'odoo'));

        $valid_bridges = [];
        for ($i = 0; $i < count($bridges); $i++) {
            $bridge = $bridges[$i];

            // Valid only if backend and post type exists
            $is_valid =
                array_reduce(
                    $dbs,
                    static function ($is_valid, $db) use ($bridge) {
                        return $bridge['database'] === $db['name'] || $is_valid;
                    },
                    false
                ) &&
                in_array($bridge['post_type'], $post_types) &&
                (empty($bridge['template']) ||
                    empty($templates) ||
                    in_array($bridge['template'], $templates));

            if ($is_valid) {
                $bridge['fields'] = array_values(
                    array_filter($bridge['fields'], function ($field) {
                        return !(
                            empty($field['name']) || empty($field['foreign'])
                        );
                    })
                );

                unset($bridge['backend']);
                unset($bridge['foreign_key']);

                $valid_bridges[] = $bridge;
            }
        }

        return $valid_bridges;
    }
}

Odoo_Addon::setup();
