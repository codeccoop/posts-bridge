<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-odoo-remote-relation.php';
require_once 'class-odoo-db.php';

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
    protected static $name = 'Odoo JSON-RPC';

    /**
     * Handles the addon slug.
     *
     * @var string
     */
    protected static $slug = 'odoo-api';

    /**
     * Handles the addom's custom relation class.
     *
     * @var string
     */
    protected static $relation_class = '\POSTS_BRIDGE\Odoo_Remote_Relation';

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
     * Addon settings config getter.
     *
     * @return array Settings config.
     */
    protected static function setting_config()
    {
        return [
            self::$slug,
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
                    ],
                ],
                'relations' => [
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
                                        'name' => ['type' => 'string'],
                                        'foreign' => ['type' => 'string'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            [
                'databases' => [],
                'relations' => [],
            ],
        ];
    }

    /**
     * Validate setting data callback.
     *
     * @param array $data Setting data.
     * @param Setting $setting Setting instance.
     *
     * @return array Validated setting data.
     */
    protected static function validate_setting($data, $setting)
    {
        $data['databases'] = self::validate_databases($data['databases']);
        $data['relations'] = self::validate_relations(
            $data['relations'],
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
            return isset(
                $db_data['name'],
                $db_data['user'],
                $db_data['password'],
                $db_data['backend']
            ) && in_array($db_data['backend'], $backends, true);
        });
    }

    /**
     * Validate relations settings. Filters relations with inconsistencies with the
     * existing databases.
     *
     * @param array $relations Array with relation configurations.
     * @param array $dbs Array with databases data.
     *
     * @return array Array with valid relation configurations.
     */
    private static function validate_relations($relations, $dbs)
    {
        if (!wp_is_numeric_array($relations)) {
            return [];
        }

        $post_types = get_post_types();

        $valid_relations = [];
        for ($i = 0; $i < count($relations); $i++) {
            $rel = $relations[$i];

            // Valid only if backend and post type exists
            $is_valid =
                array_reduce(
                    $dbs,
                    static function ($is_valid, $db) use ($rel) {
                        return $rel['database'] === $db['name'] || $is_valid;
                    },
                    false
                ) && in_array($rel['post_type'], $post_types);

            if ($is_valid) {
                // filter empty fields
                $rel['fields'] = array_values(
                    array_filter((array) $rel['fields'], static function (
                        $field
                    ) {
                        return $field['foreign'] && $field['name'];
                    })
                );

                $valid_relations[] = $rel;
            }
        }

        return $valid_relations;
    }
}

Odoo_Addon::setup();
