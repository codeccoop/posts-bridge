<?php

namespace POSTS_BRIDGE;

use Exception;

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
        $this->interceptors();
        $this->custom_hooks();
    }

    private function interceptors()
    {
        add_filter(
            'posts_bridge_relation',
            function ($relation, $post_type) {
                if ($relation instanceof Remote_Relation) {
                    return $relation;
                }

                $relations = Odoo_Remote_Relation::relations();
                foreach ($relations as $rel) {
                    if ($rel->post_type === $post_type) {
                        return $rel;
                    }
                }
            },
            10,
            2
        );

        add_filter(
            'posts_bridge_relations',
            function ($relations, $api = null) {
                if ($api && $api !== 'odoo-api') {
                    return $relations;
                }

                return array_merge(
                    $relations,
                    array_map(function ($rel) {
                        return new Odoo_Remote_Relation($rel);
                    }, $this->setting()->relations)
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

    protected function register_setting($settings)
    {
        $settings->register_setting(
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
            ]
        );
    }

    protected function sanitize_setting($value, $setting)
    {
        $value['databases'] = $this->validate_databases($value['databases']);
        $value['relations'] = $this->validate_relations(
            $value['relations'],
            $value['databases']
        );

        return $value;
    }

    private function validate_databases($dbs)
    {
        if (!is_list($dbs)) {
            return [];
        }

        $backends = array_map(function ($backend) {
            return $backend['name'];
        }, apply_filters('posts_bridge_setting', null, 'general')->backends);

        return array_map(
            function ($db_data) {
                $db_data['name'] = sanitize_text_field($db_data['name']);
                $db_data['user'] = sanitize_text_field($db_data['user']);
                $db_data['password'] = sanitize_text_field(
                    $db_data['password']
                );
                $db_data['backend'] = sanitize_text_field($db_data['backend']);
                return $db_data;
            },
            array_filter($dbs, function ($db_data) use ($backends) {
                return isset(
                    $db_data['name'],
                    $db_data['user'],
                    $db_data['password'],
                    $db_data['backend']
                ) && in_array($db_data['backend'], $backends);
            })
        );
    }

    private function validate_relations($relations, $dbs)
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
                    function ($is_valid, $db) use ($rel) {
                        return $rel['database'] === $db['name'] || $is_valid;
                    },
                    false
                ) && in_array($rel['post_type'], $post_types);

            if ($is_valid) {
                // filter empty fields
                $rel['fields'] = isset($rel['fields'])
                    ? (array) $rel['fields']
                    : [];
                $rel['fields'] = array_values(
                    array_filter($rel['fields'], static function ($field) {
                        return $field['foreign'] && $field['name'];
                    })
                );

                $rel['model'] = sanitize_text_field($rel['model']);

                $fields = [];
                foreach ($rel['fields'] as $field) {
                    $field['name'] = sanitize_text_field($field['name']);
                    $field['foreign'] = sanitize_text_field($field['foreign']);
                    $fields[] = $field;
                }
                $rel['fields'] = $fields;

                $valid_relations[] = $rel;
            }
        }

        return $valid_relations;
    }
}

Odoo_Addon::setup();
