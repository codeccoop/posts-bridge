<?php

namespace POSTS_BRIDGE;

use WP_REST_Server;
use WPCT_ABSTRACT\REST_Settings_Controller as Base_Controller;

use function WPCT_ABSTRACT\is_list;

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
    private static $_excluded_post_types = [
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
                return !in_array($post_type, self::$_excluded_post_types);
            })
        );
    }
}
