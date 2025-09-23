<?php

namespace POSTS_BRIDGE;

use PBAPI;
use WP_Error;
use WP_REST_Server;
use WPCT_PLUGIN\REST_Settings_Controller as Base_Controller;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Plugin REST API controller. Handles routes registration, permissions
 * and request callbacks.
 */
class REST_Settings_Controller extends Base_Controller
{
    /**
     * Inherits the parent initialized and register the post types route
     *
     * @param string $group Plugin settings group name.
     */
    protected static function init()
    {
        parent::init();
        self::register_post_type_route();
        self::register_schema_route();
    }

    /**
     * Registers post type API routes.
     */
    private static function register_post_type_route()
    {
        $namespace = self::namespace();
        $version = self::version();

        register_rest_route("{$namespace}/v{$version}", '/post_types', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => static function () {
                return self::get_post_types();
            },
            'permission_callback' => static function () {
                return self::permission_callback();
            },
        ]);

        register_rest_route(
            "{$namespace}/v{$version}",
            '/post_types/(?P<name>[a-zA-Z0-9-_]+)',
            [
                [
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => static function ($request) {
                        return self::get_post_type($request);
                    },
                    'permission_callback' => static function () {
                        return self::permission_callback();
                    },
                    'args' => [
                        'name' => [
                            'description' => __(
                                'Custom post type key',
                                'posts-bridge'
                            ),
                            'type' => 'string',
                            'required' => true,
                        ],
                    ],
                ],
                [
                    'methods' => WP_REST_Server::DELETABLE,
                    'callback' => static function ($request) {
                        return self::delete_post_type($request);
                    },
                    'permission_callback' => static function () {
                        return self::permission_callback();
                    },
                ],
                [
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => static function ($request) {
                        return self::post_post_type($request);
                    },
                    'permission_callback' => static function () {
                        return self::permission_callback();
                    },
                    'args' => [
                        'name' => [
                            'description' => __(
                                'Custom post type key',
                                'posts-bridge'
                            ),
                            'type' => 'string',
                            'required' => true,
                        ],
                        'args' => Custom_Post_Type::schema(),
                    ],
                ],
            ]
        );
    }

    private static function register_schema_route()
    {
        foreach (Addon::addons() as $addon) {
            if (!$addon->enabled) {
                continue;
            }

            $addon = $addon::name;
            register_rest_route('posts-bridge/v1', "/{$addon}/schemas", [
                'methods' => WP_REST_Server::READABLE,
                'callback' => static function () use ($addon) {
                    return self::addon_schemas($addon);
                },
                'permission_callback' => [self::class, 'permission_callback'],
            ]);
        }

        register_rest_route('posts-bridge/v1', '/http/schemas', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => static function () {
                return self::http_schemas();
            },
            'permission_callback' => [self::class, 'permission_callback'],
        ]);
    }

    /**
     * Callback for GET requests to the post_types endpoint.
     *
     * @param REST_Request Request instance.
     *
     * @return array|WP_Error Post type data.
     */
    private static function get_post_types()
    {
        $custom_post_types = apply_filters(
            'posts_bridge_custom_post_types',
            []
        );
        return array_keys($custom_post_types);
    }

    /**
     * Callback for GET requests to the post_types endpoint.
     *
     * @param REST_Request Request instance.
     *
     * @return array|WP_Error Post type data.
     */
    private static function get_post_type($request)
    {
        $key = sanitize_key($request['name']);
        $data = apply_filters('posts_bridge_custom_post_type', null, $key);

        if (!$data) {
            return new WP_Error(
                'not_found',
                __('Custom post type is unkown', 'posts-bridge'),
                ['post_type' => $key]
            );
        }

        $data['name'] = $key;
        return $data;
    }

    /**
     * Callback for POST requests to the post types endpoint.
     *
     * @param REST_Request Request instance.
     *
     * @return array|WP_Error Template use result.
     */
    private static function post_post_type($request)
    {
        $key = sanitize_key($request['name']);

        $data = $request->get_json_params();
        $data['name'] = $key;

        $success = Custom_Post_Type::register($data);

        if (!$success) {
            return new WP_Error(
                'register_error',
                __(
                    'Posts Bridge can\'t register the post type',
                    'posts-bridge'
                ),
                ['args' => $data]
            );
        }

        flush_rewrite_rules();

        $data = apply_filters('posts_bridge_custom_post_type', [], $key);
        $data['name'] = $key;

        return $data;
    }

    private static function delete_post_type($request)
    {
        $key = sanitize_key($request['name']);
        $success = Custom_Post_Type::unregister($key);

        if (!$success) {
            return new WP_Error(
                'internal_server_errro',
                __(
                    'Posts Bridge can\'t unregister the post type',
                    'posts-bridge'
                ),
                ['post_type' => $key]
            );
        }

        return ['success' => true];
    }

    private static function addon_schemas($name)
    {
        $bridge = PBAPI::get_bridge_schema($name);
        return ['bridge' => $bridge];
    }

    private static function http_schemas()
    {
        $backend = PBAPI::get_backend_schema();
        $credential = PBAPI::get_credential_schema();
        return ['backend' => $backend, 'credential' => $credential];
    }
}
