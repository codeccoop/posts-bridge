<?php

namespace POSTS_BRIDGE;

use Exception;

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
        $this->interceptors();
    }

    private function interceptors()
    {
        add_filter(
            'posts_bridge_relation',
            function ($relation, $post_type) {
                if ($relation instanceof Remote_Relation) {
                    return $relation;
                }

                $relations = WP_Remote_Relation::relations();
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
                if ($api && $api !== 'wp-api') {
                    return $relations;
                }

                return array_merge(
                    $relations,
                    array_map(function ($rel) {
                        return new WP_Remote_Relation($rel);
                    }, $this->setting()->relations)
                );
            },
            10,
            2
        );
    }

    protected function register_setting($settings)
    {
        $settings->register_setting(
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
            ],
            [
                'relations' => [],
            ]
        );
    }

    protected function sanitize_setting($value, $setting)
    {
        $backends = apply_filters('posts_bridge_setting', null, 'general')
            ->backends;
        $value['relations'] = $this->validate_relations(
            $value['relations'],
            $backends
        );

        return $value;
    }

    private function validate_relations($relations, $backends)
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
                    function ($is_valid, $backend) use ($rel) {
                        return $rel['backend'] === $backend['name'] ||
                            $is_valid;
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

WP_Addon::setup();
