<?php

namespace POSTS_BRIDGE;

use function WPCT_ABSTRACT\is_list;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-wp-remote-relation.php';

class WP_Addon extends Addon
{
    protected static $name = 'WP REST API';
    protected static $slug = 'wp-api';
    protected static $relation_class = '\POSTS_BRIDGE\WP_Remote_Relation';

    protected function construct(...$args)
    {
        parent::construct(...$args);
        self::interceptors();
    }

    private static function interceptors()
    {
        add_filter(
            'posts_bridge_relations',
            function ($relations) {
                return array_merge($relations, WP_Remote_Relation::relations());
            },
            10,
            1
        );
    }

    protected static function setting_config()
    {
        return [
            'wp-api',
            [
                'relations' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'additionalProperties' => false,
                        'properties' => [
                            'post_type' => ['type' => 'string'],
                            'backend' => ['type' => 'string'],
                            'remote_type' => ['type' => 'string'],
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
                'credentials' => [
                    'type' => 'object',
                    'additionalProperties' => false,
                    'properties' => [
                        'username' => ['type' => 'string'],
                        'password' => ['type' => 'string'],
                    ],
                ],
            ],
            [
                'relations' => [],
                'credentials' => [
                    'username' => '',
                    'password' => '',
                ],
            ],
        ];
    }

    protected static function validate_setting($data, $setting)
    {
        $backends = Posts_Bridge::setting('general')->backends;
        $data['relations'] = self::validate_relations(
            $data['relations'],
            $backends
        );

        return $data;
    }

    private static function validate_relations($relations, $backends)
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
                    $backends,
                    static function ($is_valid, $backend) use ($rel) {
                        return $rel['backend'] === $backend['name'] ||
                            $is_valid;
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

WP_Addon::setup();
