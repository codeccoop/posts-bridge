<?php

namespace POSTS_BRIDGE;

use Error;
use Exception;
use WP_Error;
use WP_REST_Server;
use WPCT_ABSTRACT\REST_Settings_Controller as Base_Controller;

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
        self::register_templates_route();
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

    /**
     * Registers templates API routes.
     */
    private static function register_templates_route()
    {
        $namespace = self::namespace();
        $version = self::version();

        register_rest_route(
            "{$namespace}/v{$version}",
            '/templates/(?P<name>[a-zA-Z0-9-]+)',
            [
                [
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => static function ($request) {
                        return self::get_template($request);
                    },
                    'permission_callback' => static function () {
                        return self::permission_callback();
                    },
                    'args' => [
                        'name' => [
                            'description' => __(
                                'Name of the template',
                                'posts-bridge'
                            ),
                            'type' => 'string',
                            'required' => true,
                        ],
                    ],
                ],
                [
                    'methods' => WP_REST_Server::CREATABLE,
                    'callback' => static function ($request) {
                        return self::post_template($request);
                    },
                    'permission_callback' => static function () {
                        return self::permission_callback();
                    },
                    'args' => [
                        'name' => [
                            'description' => __(
                                'Name of the template to use',
                                'posts-bridge'
                            ),
                            'type' => 'string',
                            'required' => true,
                        ],
                        'fields' => [
                            'description' => __(
                                'Template fields with user inputs',
                                'posts-bridge'
                            ),
                            'type' => 'array',
                            'required' => true,
                            'items' => [
                                'type' => 'object',
                                'properties' => [
                                    'ref' => [
                                        'description' => __(
                                            'Field ref that points to some template param',
                                            'posts-bridge'
                                        ),
                                        'type' => 'string',
                                        'required' => true,
                                    ],
                                    'name' => [
                                        'description' => __(
                                            'Name of the field',
                                            'posts-bridge'
                                        ),
                                        'type' => 'string',
                                        'required' => true,
                                    ],
                                    'value' => [
                                        'description' => __(
                                            'Field value',
                                            'posts-bridge'
                                        ),
                                        'type' => 'mixed',
                                        'required' => false,
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]
        );
    }

    /**
     * Callback for GET requests to the templates endpoint.
     *
     * @param REST_Request Request instance.
     *
     * @return array|WP_Error Template data.
     */
    private static function get_template($request)
    {
        $template_name = sanitize_title($request['name']);
        $template = Post_Bridge::get_template($template_name);

        if (!$template) {
            return new WP_Error(
                'not_found',
                __('Template not found', 'posts-bridge'),
                ['name' => $template_name]
            );
        }

        return $template->to_json();
    }

    /**
     * Callback for POST requests to the templates endpoint.
     *
     * @param REST_Request Request instance.
     *
     * @return array|WP_Error Template use result.
     */
    private static function post_template($request)
    {
        $name = isset($request['name'])
            ? sanitize_title($request['name'])
            : null;

        $fields =
            isset($request['fields']) && is_array($request['fields'])
                ? $request['fields']
                : null;

        if (!($name && $fields)) {
            return new WP_Error(
                'bad_request',
                __('Invalid use template params', 'posts-bridge')
            );
        }

        try {
            do_action('posts_bridge_use_template', [
                'name' => $name,
                'fields' => $fields,
            ]);

            return ['success' => true];
        } catch (Post_Bridge_Template_Exception $e) {
            // Use custom exception to catch custom error status
            return new WP_Error($e->getStringCode(), $e->getMessage());
        } catch (Error | Exception $e) {
            return new WP_Error('internal_server_error', $e->getMessage());
        }
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
}
