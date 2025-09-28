<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-wp-post-bridge.php';
require_once 'hooks.php';

/**
 * WP Addon class.
 */
class WP_Addon extends Addon
{
    /**
     * Handles the addon name.
     */
    public const title = 'WP';

    /**
     * Handles the addon's API name.
     */
    public const name = 'wp';

    /**
     * Handles the addon's custom bridge class.
     */
    public const bridge_class = '\POSTS_BRIDGE\WP_Post_Bridge';

    /**
     * Performs a request against the backend to check the connexion status.
     *
     * @param string $backend Target backend name.
     *
     * @return boolean
     */
    public function ping($backend)
    {
        $bridge = new WP_Post_Bridge([
            'method' => 'GET',
            'endpoint' => '/wp-json/wp/v2/posts',
            'backend' => $backend,
        ]);

        $response = $bridge->fetch(['context' => 'edit']);
        return !is_wp_error($response);
    }

    /**
     * Performs an introspection of the backend endpoint and returns API fields
     * and accepted content type.
     *
     * @param string $endpoint API endpoint.
     * @param string $backend Backend name.
     *
     * @return array
     */
    public function get_endpoint_schema($endpoint, $backend)
    {
        return [
            [
                'name' => 'id',
                'schema' => ['type' => 'integer'],
            ],
            [
                'name' => 'type',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'link',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'date',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'date_gmt',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'modified',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'modified_gmt',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'guid',
                'schema' => [
                    'type' => 'object',
                    'properties' => [
                        'rendered' => ['type' => 'string'],
                        'raw' => ['type' => 'string'],
                    ],
                ],
            ],
            [
                'name' => 'slug',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'status',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'password',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'title',
                'schema' => [
                    'type' => 'object',
                    'properties' => [
                        'rendered' => ['type' => 'string'],
                        'raw' => ['type' => 'string'],
                    ],
                ],
            ],
            [
                'name' => 'content',
                'schema' => [
                    'type' => 'object',
                    'properties' => [
                        'rendered' => ['type' => 'string'],
                        'raw' => ['type' => 'string'],
                    ],
                ],
            ],
            [
                'name' => 'author',
                'schema' => ['type' => 'integer'],
            ],
            [
                'name' => 'excerpt',
                'schema' => [
                    'type' => 'object',
                    'properties' => [
                        'rendered' => ['type' => 'string'],
                        'raw' => ['type' => 'string'],
                    ],
                ],
            ],
            [
                'name' => 'featured_media',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'comment_status',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'ping_status',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'format',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'meta',
                'schema' => [
                    'type' => 'object',
                    'properties' => [],
                    'additionalProperities' => true,
                ],
            ],
            [
                'name' => 'sticky',
                'schema' => ['type' => 'boolean'],
            ],
            [
                'name' => 'template',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'categories',
                'schema' => [
                    'type' => 'array',
                    'items' => ['type' => 'integer'],
                ],
            ],
            [
                'name' => 'tags',
                'schema' => [
                    'type' => 'array',
                    'items' => ['type' => 'integer'],
                ],
            ],
            [
                'name' => 'class_list',
                'schema' => [
                    'type' => 'array',
                    'items' => ['type' => 'string'],
                ],
            ],
            [
                'name' => 'permalink_template',
                'schema' => ['type' => 'string'],
            ],
            [
                'name' => 'generated_slug',
                'schema' => ['type' => 'string'],
            ],
        ];
    }
}

WP_Addon::setup();
