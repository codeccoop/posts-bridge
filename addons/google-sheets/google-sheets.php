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
require_once 'class-gs-post-bridge.php';
require_once 'class-gs-post-bridge-template.php';

class Google_Sheets_Addon extends Addon
{
    /**
     * Handles the addon name.
     *
     * @var string
     */
    protected static $name = 'Google Sheets';

    /**
     * Handles the addon's API name.
     *
     * @var string
     */
    protected static $api = 'google-sheets';

    /**
     * Handles the addom's custom bridge class.
     *
     * @var string
     */
    protected static $bridge_class = '\POSTS_BRIDGE\Google_Sheets_Post_Bridge';

    /**
     * Addon constructor. Inherits from the abstract addon and sets up custom hooks.
     */
    protected function construct(...$args)
    {
        parent::construct(...$args);
        self::setting_hooks();
    }

    /**
     * Intercepts addon setting filters and adds authorized attribute.
     */
    private static function setting_hooks()
    {
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
                if ($setting->full_name() === self::setting_name()) {
                    unset($data['authorized']);
                }

                return $data;
            },
            9,
            2
        );

        add_filter(
            'option_' . self::setting_name(),
            static function ($value) {
                if (!is_array($value)) {
                    return $value;
                }

                $value['authorized'] = Google_Sheets_Service::is_authorized();
                return $value;
            },
            9,
            1
        );
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
                'bridges' => [
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
                            'spreadsheet',
                            'tab',
                            'foreign_key',
                            'fields',
                        ],
                    ],
                ],
            ],
            [
                'bridges' => [],
            ],
        ];
    }

    /**
     * Apply settings' data validations before db updates.
     *
     * @param array $data Setting data.
     *
     * @return array Validated setting data.
     */
    protected static function validate_setting($data, $setting)
    {
        $data['bridges'] = self::validate_bridges($data['bridges']);
        return $data;
    }

    /**
     * Validate bridge settings. Filters bridges with inconsistencies with
     * current store state.
     *
     * @param array $bridges Array with bridge configurations.
     *
     * @return array Array with valid bridge configurations.
     */
    private static function validate_bridges($bridges)
    {
        if (!wp_is_numeric_array($bridges)) {
            return [];
        }

        $post_types = array_keys(get_post_types());

        $templates = array_map(function ($template) {
            return $template['name'];
        }, apply_filters('posts_bridge_templates', [], 'google-sheets'));

        $valid_bridges = [];
        for ($i = 0; $i < count($bridges); $i++) {
            $bridge = $bridges[$i];

            // Valid only if post type exists
            $is_valid =
                in_array($bridge['post_type'], $post_types, true) &&
                (empty($bridge['template']) ||
                    empty($templates) ||
                    in_array($bridge['template'], $templates));

            if ($is_valid) {
                $bridge['fields'] = array_values(
                    array_filter($bridge['fields'], function ($field) {
                        return !empty($field['name']) &&
                            !empty($field['foreign']);
                    })
                );

                $valid_bridges[] = $bridge;
            }
        }

        return $valid_bridges;
    }
}

Google_Sheets_Addon::setup();
