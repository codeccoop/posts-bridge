<?php

namespace POSTS_BRIDGE;

use function WPCT_ABSTRACT\is_list;

if (!defined('ABSPATH')) {
    exit();
}

if (
    !class_exists('\FORMS_BRIDGE\Forms_Bridge') &&
    !class_exists('\Google\Client')
) {
    require_once 'vendor/autoload.php';
}

require_once 'class-gs-store.php';
require_once 'class-gs-client.php';
require_once 'class-gs-rest-controller.php';
require_once 'class-gs-ajax-controller.php';
require_once 'class-gs-service.php';
require_once 'class-gs-remote-relation.php';

class Google_Sheets_Addon extends Addon
{
    protected static $name = 'Google Sheets';
    protected static $slug = 'google-sheets-api';
    protected static $relation_class = '\POSTS_BRIDGE\Google_Sheets_Remote_Relation';

    protected function construct(...$args)
    {
        parent::construct(...$args);
        $this->interceptors();
        $this->custom_hooks();
        $this->wp_hooks();
    }

    private function interceptors()
    {
        add_filter(
            'posts_bridge_relation',
            function ($relation, $post_type) {
                if ($relation instanceof Remote_Relation) {
                    return $relation;
                }

                $relations = Google_Sheets_Remote_Relation::relations();
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
                if ($api && $api !== 'google-sheets-api') {
                    return $relations;
                }

                return array_merge(
                    $relations,
                    array_map(function ($rel) {
                        return new Google_Sheets_Remote_Relation($rel);
                    }, $this->setting()->relations)
                );
            },
            10,
            2
        );
    }

    /**
     * Binds plugin custom hooks.
     */
    private function custom_hooks()
    {
        // Patch authorized state on the setting default value
        add_filter(
            'wpct_setting_default',
            function ($value, $name) {
                if ($name !== Posts_Bridge::slug() . '_' . self::$slug) {
                    return $value;
                }

                return array_merge($value, [
                    'authorized' => Google_Sheets_Service::is_authorized(),
                ]);
            },
            10,
            2
        );
    }

    /**
     * Binds wp standard hooks.
     */
    private function wp_hooks()
    {
        // Patch authorized state on the setting value
        $plugin_slug = Posts_Bridge::slug();
        $addon_slug = self::$slug;
        add_filter("option_{$plugin_slug}_{$addon_slug}", function ($value) {
            $value['authorized'] = Google_Sheets_Service::is_authorized();
            return $value;
        });
    }

    protected function register_setting($settings)
    {
        $settings->register_setting(
            'google-sheets-api',
            [
                'relations' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'additionalProperties' => false,
                        'properties' => [
                            'post_type' => ['type' => 'string'],
                            'spreadsheet' => ['type' => 'string'],
                            'tab' => ['type' => 'string'],
                            'foreign_key' => ['type' => 'string'],
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
        $value['relations'] = $this->validate_relations($value['relations']);
        return $value;
    }

    private function validate_relations($relations)
    {
        if (!is_list($relations)) {
            return [];
        }

        $post_types = get_post_types();

        $valid_relations = [];
        for ($i = 0; $i < count($relations); $i++) {
            $rel = $relations[$i];

            // Valid only if backend and post type exists
            $is_valid = in_array($rel['post_type'], $post_types);

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

Google_Sheets_Addon::setup();
