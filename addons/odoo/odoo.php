<?php

namespace POSTS_BRIDGE;

use function WPCT_ABSTRACT\is_list;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-odoo-remote-relation.php';
require_once 'class-odoo-db.php';

class Odoo_Addon extends Addon
{
    protected static $name = 'Odoo JSON-RPC';
    protected static $slug = 'odoo-api';
    protected static $relation_class = '\POSTS_BRIDGE\Odoo_Remote_Relation';

    protected function construct(...$args)
    {
        parent::construct(...$args);
        self::interceptors();
        self::custom_hooks();
    }

    private static function interceptors()
    {
        add_filter(
            'posts_bridge_relations',
            static function ($relations) {
                return array_merge(
                    $relations,
                    Odoo_Remote_Relation::relations()
                );
            },
            10,
            2
        );
    }

    private function custom_hooks()
    {
        add_filter('posts_bridge_odoo_dbs', function ($dbs) {
            if (!is_list($dbs)) {
                $dbs = [];
            }

            return array_merge($dbs, $this->databases());
        });

        add_filter(
            'posts_bridge_odoo_db',
            function ($db, $name) {
                if ($db instanceof Odoo_DB) {
                    return $db;
                }

                $dbs = $this->databases();
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

    private function databases()
    {
        return array_map(function ($db_data) {
            return new Odoo_DB($db_data);
        }, $this->setting()->databases);
    }

    protected static function setting_config()
    {
        return [
            'odoo-api',
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

    protected static function validate_setting($data, $setting)
    {
        $data['databases'] = self::validate_databases($data['databases']);
        $data['relations'] = self::validate_relations(
            $data['relations'],
            $data['databases']
        );

        return $data;
    }

    private static function validate_databases($dbs)
    {
        if (!is_list($dbs)) {
            return [];
        }

        $backends = array_map(static function ($backend) {
            return $backend['name'];
        }, Posts_Bridge::setting('general')->backends);

        return array_filter($dbs, static function ($db_data) use ($backends) {
            return isset(
                $db_data['name'],
                $db_data['user'],
                $db_data['password'],
                $db_data['backend']
            ) && in_array($db_data['backend'], $backends, true);
        });
    }

    private static function validate_relations($relations, $dbs)
    {
        if (!is_list($relations)) {
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
