<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-wp-post-bridge.php';
require_once 'class-wp-post-bridge-template.php';

/**
 * WP Addon class.
 */
class WP_Addon extends Addon
{
    /**
     * Handles the addon name.
     */
    protected static $name = 'WP REST API';

    /**
     * Handles the addon's API name.
     */
    protected static $api = 'wp-rest';

    /**
     * Handles the addon's custom bridge class.
     */
    protected static $bridge_class = '\POSTS_BRIDGE\WP_Post_Bridge';

    /**
     * Addon settings configuration getter.
     *
     * @return array Addon's settings configuration.
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
                            'backend' => ['type' => 'string'],
                            'remote_type' => ['type' => 'string'],
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
                                ],
                            ],
                            'template' => ['type' => 'string'],
                        ],
                        'required' => [
                            'post_type',
                            'backend',
                            'remote_type',
                            'fields',
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
                    'required' => ['username', 'password'],
                ],
            ],
            [
                'bridges' => [],
                'credentials' => [
                    'username' => '',
                    'password' => '',
                ],
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
        $data['bridges'] = self::validate_bridges(
            $data['bridges'],
            \HTTP_BRIDGE\Settings_Store::setting('general')->backends ?: []
        );

        return $data;
    }

    /**
     * Validate bridge settings. Filters bridges with inconsistencies with
     * current store state.
     *
     * @param array $bridges Array with bridge configurations.
     * @param array $backends Array with backends data.
     *
     * @return array Array with valid bridge configurations.
     */
    private static function validate_bridges($bridges, $backends)
    {
        if (!wp_is_numeric_array($bridges)) {
            return [];
        }

        $post_types = array_keys(get_post_types());

        $templates = array_map(function ($template) {
            return $template['name'];
        }, apply_filters('posts_bridge_templates', [], 'rest-api'));

        $valid_bridges = [];
        for ($i = 0; $i < count($bridges); $i++) {
            $bridge = $bridges[$i];

            // Valid only if backend and post type exists
            $is_valid =
                array_reduce(
                    $backends,
                    static function ($is_valid, $backend) use ($bridge) {
                        return $bridge['backend'] === $backend['name'] ||
                            $is_valid;
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

                $valid_bridges[] = $bridge;
            }
        }

        return $valid_bridges;
    }
}

WP_Addon::setup();
