<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Settings as BaseSettings;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-rest-settings-controller.php';

/**
 * Plugin settings.
 */
class Settings extends BaseSettings
{
    /**
     * Handle REST Settings Controller class name.
     *
     * @var string $rest_controller_class REST Settings Controller class name.
     */
    protected static $rest_controller_class = '\POSTS_BRIDGE\REST_Settings_Controller';

    /**
     * Plugin handled post types getter.
     *
	 * @param string|null $proto Filter post types by API protocol.
	 *
     * @return array<string> Handled post type slugs.
     */
    public static function get_post_types($proto = null)
    {
        $relations = self::get_relations($proto);
        return array_values(array_unique(array_map(function ($rel) {
            return $rel->get_post_type();
        }, $relations)));
    }

    /**
     * Plugin's remote relations getter.
     *
	 * @param string|null $proto Filter post types by API protocol.
	 *
     * @return array<Remote_Relation> Remote relations.
     */
    public static function get_relations($proto = null)
    {
        $rest_rels = Settings::get_setting('posts-bridge', 'rest-api', 'relations');
        $rpc_rels = Settings::get_setting('posts-bridge', 'rpc-api', 'relations');
        $relations = array_map(function ($rel) {
            return new Remote_Relation($rel);
        }, array_merge($rest_rels, $rpc_rels));

		if ($proto) {
			$relations = array_filter($relations, function ($rel) use ($proto) {
				return $rel->get_proto() === $proto;
			});
		}

		return $relations;
    }

    /**
     * Register plugin settings.
     */
    public function register()
    {
        $host = parse_url(get_bloginfo('url'))['host'];

        // Register general settings
        $this->register_setting(
            'general',
            [
                'whitelist' => ['type' => 'boolean'],
                'backends' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'name' => ['type' => 'string'],
                            'base_url' => ['type' => 'string'],
                            'headers' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'name' => ['type' => 'string'],
                                        'value' => ['type' => 'string'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                'synchronize' => [
                    'type' => 'object',
                    'properties' => [
                        'enabled' => ['type' => 'boolean'],
                        'recurrence' => [
                            'type' => 'string',
                            'enum' => [
                                'minutly',
                                'twicehourly',
                                'hourly',
                                'twicedaily',
                                'daily',
                                'weekly',
                            ],
                        ],
                    ],
                ],
            ],
            [
                'whitelist' => false,
                'backends' => [
                    [
                        'name' => 'ERP',
                        'base_url' => 'https://erp.' . $host,
                        'headers' => [
                            [
                                'name' => 'Authorization',
                                'value' => 'Bearer <erp-api-token>'
                            ]
                        ],
                    ],
                ],
                'synchronize' => [
                    'enabled' => false,
                    'recurrence' => 'hourly',
                ],
            ],
        );

        // Register REST API settings
        $this->register_setting(
            'rest-api',
            [
                'relations' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'post_type' => ['type' => 'string'],
                            'endpoint' => ['type' => 'string'],
                            'foreign_key' => ['type' => 'string'],
                            'backend' => ['type' => 'string'],
                            'fields' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'meta' => ['type' => 'string'],
                                        'foreign' => ['type' => 'string'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            [
                'relations' => [
                    [
                        'post_type' => 'post',
                        'endpoint' => '/api/posts',
                        'foreign_key' => 'id',
                        'backend' => 'ERP',
                        'fields' => [],
                    ],
                ],
            ],
        );

        // Register RPC API settings
        $this->register_setting(
            'rpc-api',
            [
                'endpoint' => ['type' => 'string'],
                'user' => ['type' => 'string'],
                'password' => ['type' => 'string'],
                'database' => ['type' => 'string'],
                'relations' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'post_type' => ['type' => 'string'],
                            'model' => ['type' => 'string'],
                            'backend' => ['type' => 'string'],
                            'fields' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'meta' => ['type' => 'string'],
                                        'foreign' => ['type' => 'string'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            [
                'endpoint' => '/jsonrpc',
                'user' => 'admin',
                'password' => 'admin',
                'database' => 'erp',
                'relations' => [
                    [
                        'post_type' => 'post',
                        'model' => 'blog.post',
                        'backend' => 'ERP',
                        'fields' => [],
                    ],
                ],
            ],
        );
    }
}
