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
 * Plugin REST API controller
 */
class REST_Settings_Controller extends Base_Controller
{
    /**
     * Handle internat WP post types excluded from relations.
     *
     * @var array<string> Post type slugs.
     */
    private const _excluded_post_types = [
        'attachment',
        'revision',
        'nav_menu_item',
        'custom_css',
        'customize_changeset',
        'oembed_cache',
        'user_request',
        'wp_block',
        'wp_template',
        'wp_template_part',
        'wp_global_styles',
        'wp_navigation',
        'wp_font_family',
        'wp_font_face',
    ];

    /**
     * Inherits the parent initialized and register the post types route
     *
     * @param string $group Plugin settings group name.
     */
    protected static function init()
    {
        parent::init();
        self::register_post_types_route();
        self::register_templates_route();
    }

    /**
     * Registers the post types REST API route.
     */
    private static function register_post_types_route()
    {
        $namespace = self::namespace();
        $version = self::version();
        register_rest_route("{$namespace}/v{$version}", '/types/', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => static function () {
                return self::get_post_types();
            },
            'permission_callback' => static function () {
                return self::permission_callback();
            },
        ]);
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
                                        'required' => true,
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
     * Get available post types on the WP instance excluding WP internal posts.
     *
     * @return array Array of post type slugs.
     */
    private static function get_post_types()
    {
        return array_values(
            array_filter(array_values(get_post_types()), static function (
                $post_type
            ) {
                return !in_array($post_type, self::_excluded_post_types);
            })
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
        $template_name = $request['name'];
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
            ? sanitize_text_field($request['name'])
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
}
