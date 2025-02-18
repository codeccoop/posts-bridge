<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-rest-post-bridge.php';
require_once 'class-rest-post-bridge-template.php';

/**
 * REST API Addon class.
 */
class Rest_Addon extends Addon
{
    /**
     * Handles the addon name.
     *
     * @var string
     */
    protected static $name = 'REST API';

    /**
     * Handles the addon's API name.
     *
     * @var string
     */
    protected static $api = 'rest-api';

    /**
     * Handles the addom's custom bridge class.
     *
     * @var string
     */
    protected static $bridge_class = '\POSTS_BRIDGE\Rest_Post_Bridge';

    /**
     * Registers the setting and its fields.
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
                            'name' => ['type' => 'string'],
                            'backend' => ['type' => 'string'],
                            'post_type' => ['type' => 'string'],
                            'endpoint' => ['type' => 'string'],
                            'pipes' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'additionalProperties' => false,
                                    'properties' => [
                                        'from' => ['type' => 'string'],
                                        'to' => ['type' => 'string'],
                                        'cast' => [
                                            'type' => 'string',
                                            'enum' => [
                                                'boolean',
                                                'string',
                                                'integer',
                                                'float',
                                                'json',
                                                'csv',
                                                'concat',
                                                'null',
                                            ],
                                        ],
                                    ],
                                    'required' => ['from', 'to', 'cast'],
                                ],
                            ],
                            'template' => ['type' => 'string'],
                        ],
                        'required' => [
                            'name',
                            'backend',
                            'post_type',
                            'endpoint',
                            'pipes',
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

        $post_types = array_values(get_post_types());

        $templates = array_map(function ($template) {
            return $template['name'];
        }, apply_filters('posts_bridge_templates', [], 'rest-api'));

        $valid_bridges = [];
        for ($i = 0; $i < count($bridges); $i++) {
            $bridge = $bridges[$i];

            // Valid only if backend, post_type and template exists
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
                $valid_bridges[] = $bridge;
            }
        }

        return $valid_bridges;
    }
}

Rest_Addon::setup();
