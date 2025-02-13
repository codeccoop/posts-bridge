<?php

namespace POSTS_BRIDGE;

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
    /**
     * Handles the addon name.
     *
     * @var string
     */
    protected static $name = 'Google Sheets';

    /**
     * Handles the addon slug.
     *
     * @var string
     */
    protected static $slug = 'google-sheets-api';

    /**
     * Handles the addom's custom form hook class.
     *
     * @var string
     */
    protected static $relation_class = '\POSTS_BRIDGE\Google_Sheets_Remote_Relation';

    /**
     * Addon constructor. Inherits from the abstract addon and sets up custom hooks.
     */
    protected function construct(...$args)
    {
        parent::construct(...$args);

        self::custom_hooks();
        self::wp_hooks();
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
                if ($name !== self::setting_name()) {
                    return $data;
                }

                return array_merge($data, [
                    'authorized' => Google_Sheets_Service::is_authorized(),
                ]);
            },
            10,
            2
        );

        add_filter(
            'wpct_validate_setting',
            static function ($data, $setting) {
                if ($setting->full_name() !== self::setting_name()) {
                    return $data;
                }

                unset($data['authorized']);
                return $data;
            },
            9,
            2
        );
    }

    /**
     * Binds wp standard hooks.
     */
    private static function wp_hooks()
    {
        // Patch authorized state on the setting value
        add_filter('option_' . self::setting_name(), static function ($data) {
            $data['authorized'] = Google_Sheets_Service::is_authorized();
            return $data;
        });
    }

    protected static function setting_config()
    {
        return [
            self::$slug,
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

    /**
     * Sanitizes the setting value before updates.
     *
     * @param array $data Setting data.
     * @param Setting $setting Setting instance.
     *
     * @return array Sanitized data.
     */
    protected static function validate_setting($data, $setting)
    {
        $data['relations'] = self::validate_relations($data['relations']);
        return $data;
    }

    /**
     * Validates setting relations data.
     *
     * @param array $relations List with relations data.
     *
     * @return array Validated list with relations data.
     */
    private static function validate_relations($relations)
    {
        if (!wp_is_numeric_array($relations)) {
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
