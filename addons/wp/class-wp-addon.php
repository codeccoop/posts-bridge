<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-wp-post-bridge.php';

/**
 * WP Addon class.
 */
class WP_Addon extends Addon
{
    /**
     * Handles the addon name.
     */
    public const title = 'WP REST-API';

    /**
     * Handles the addon's API name.
     */
    public const name = 'wp';

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
}

WP_Addon::setup();
