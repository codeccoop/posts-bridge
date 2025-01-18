<?php

namespace POSTS_BRIDGE;

use function WPCT_ABSTRACT\is_list;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'vendor/autoload.php';

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
        self::interceptors();
        self::custom_hooks();
        self::wp_hooks();
    }

    private static function interceptors()
    {
        add_filter(
            'posts_bridge_relations',
            static function ($relations) {
                return array_merge(
                    $relations,
                    Google_Sheets_Remote_Relation::relations()
                );
            },
            10,
            1
        );
    }

    /**
     * Binds plugin custom hooks.
     */
    private static function custom_hooks()
    {
        // Patch authorized state on the setting default value
        add_filter(
            'wpct_setting_default',
            static function ($data, $name) {
                if ($name !== Posts_Bridge::slug() . '_' . self::$slug) {
                    return $data;
                }

                return array_merge($data, [
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
    private static function wp_hooks()
    {
        // Patch authorized state on the setting value
        $plugin_slug = Posts_Bridge::slug();
        $addon_slug = self::$slug;
        add_filter("option_{$plugin_slug}_{$addon_slug}", function ($data) {
            $data['authorized'] = Google_Sheets_Service::is_authorized();
            return $data;
        });
    }

    protected static function setting_config()
    {
        return [
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
            ],
        ];
    }

    protected static function validate_setting($data, $setting)
    {
        $data['relations'] = self::validate_relations($data['relations']);
        return $data;
    }

    private static function validate_relations($relations)
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

Google_Sheets_Addon::setup();
