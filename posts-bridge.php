<?php

/**
 * Plugin Name:         Posts Bridge
 * Plugin URI:          https://git.coopdevs.org/codeccoop/wp/plugins/bridges/posts-bridge
 * Description:         Bridge backend data to WP posts collections
 * Author:              codeccoop
 * Author URI:          https://www.codeccoop.org
 * License:             GPLv2 or later
 * License URI:         http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         posts-bridge
 * Domain Path:         /languages
 * Version:             2.4.1
 * Requires PHP:        8.0
 * Requires at least:   6.7
 */

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Plugin as Base_Plugin;

use function WPCT_ABSTRACT\is_list;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'abstracts/class-plugin.php';

require_once 'deps/i18n/wpct-i18n.php';
require_once 'deps/http/http-bridge.php';

require_once 'includes/class-logger.php';
require_once 'includes/class-i18n.php';
require_once 'includes/class-remote-cpt.php';
require_once 'includes/class-menu.php';
require_once 'includes/class-settings-store.php';
require_once 'includes/class-posts-synchronizer.php';
require_once 'includes/class-rest-remote-posts-controller.php';
require_once 'includes/class-rest-settings-controller.php';
require_once 'includes/class-remote-relation.php';
require_once 'includes/class-remote-featured-media.php';
require_once 'includes/class-json-finger.php';

require_once 'addons/abstract-addon.php';

require_once 'custom-blocks/remote-fields/remote-fields.php';

/**
 * Handle global Remote_CPT instances.
 *
 * @var Remote_CPT|null
 */
$posts_bridge_remote_cpt = null;

/**
 * Posts Bridge plugin.
 */
class Posts_Bridge extends Base_Plugin
{
    /**
     * Handle plugin's settings store class name.
     *
     * @var string $settings_class Plugin's settings store class name.
     */
    protected static $settings_class = '\POSTS_BRIDGE\Settings_Store';

    /**
     * Handle plugin menu class name.
     *
     * @var string $menu_class Plugin menu class name.
     */
    protected static $menu_class = '\POSTS_BRIDGE\Menu';

    /**
     * Handle post types REST Controller instances
     *
     * @var array<REST_Controller> $rest_controllers Array of active REST_Controller instances
     */
    private static $rest_controllers = [];

    /**
     * Schedules Posts_Synchronizer on plugin activation and adds the plugin's default thumbnail
     * to the media store.
     */
    public static function activate()
    {
        Remote_Featured_Media::setup_default_thumbnail();
        Posts_Synchronizer::schedule();
    }

    /**
     * Unschedule Posts_Synchronizer on plugin deactivation and remove the plugin's default thumbnail
     * from the media store.
     */
    public static function deactivate()
    {
        Remote_Featured_Media::remove_default_thumbnail();
        Posts_Synchronizer::unschedule();
    }

    /**
     * Callback to the wp init hook, register the shortcodes and remote cpt remote fields
     * as meta.
     */
    public static function init()
    {
        self::register_shortcodes();
        self::register_meta();
    }

    /**
     * Initialized addons and setup plugin hooks.
     */
    protected function construct(...$args)
    {
        parent::construct(...$args);

        Addon::load();

        self::sync_http_settings();
        self::wp_hooks();
        self::rest_hooks();
        self::custom_hooks();
    }

    /**
     * Synchronize plugin and http-bridge settings
     */
    private static function sync_http_settings()
    {
        $slug = self::slug();

        // Patch http bridge default settings to plugin settings
        add_filter(
            'wpct_setting_default',
            static function ($default, $name) use ($slug) {
                if ($name !== $slug . '_general') {
                    return $default;
                }

                $http = \HTTP_BRIDGE\Settings_Store::setting('general');

                $data = [];
                foreach (['backends', 'whitelist'] as $key) {
                    $data[$key] = $http->$key;
                }

                return array_merge($default, $data);
            },
            10,
            2
        );

        // Patch http bridge settings to plugin settings
        add_filter("option_{$slug}_general", static function ($value) {
            $http = \HTTP_BRIDGE\Settings_Store::setting('general');

            $data = [];
            foreach (['backends', 'whitelist'] as $key) {
                $data[$key] = $http->$key;
            }

            return array_merge($value, $data);
        });

        // Syncronize plugin settings with http bridge settings
        add_filter(
            'wpct_validate_setting',
            static function ($data, $setting) use ($slug) {
                if ($setting->full_name() !== $slug . '_general') {
                    return $data;
                }

                $http_settings = [
                    'whitelist' => boolval($data['whitelist'] ?? false),
                    'backends' => \HTTP_BRIDGE\Settings_Store::validate_backends(
                        isset($data['backends']) && is_array($data['backends'])
                            ? $data['backends']
                            : []
                    ),
                ];

                $http = \HTTP_BRIDGE\Settings_Store::setting('general');
                $http->update(array_merge($http->data(), $http_settings));

                return $data;
            },
            10,
            2
        );
    }

    /**
     * Registers plugin's callbacks to wp hooks.
     */
    private static function wp_hooks()
    {
        // Store global remote cpts
        add_action(
            'the_post',
            static function ($post) {
                self::the_post($post);
            },
            10,
            2
        );

        // Enqueue plugin admin client scripts
        add_action('admin_enqueue_scripts', static function ($admin_page) {
            self::admin_enqueue_scripts($admin_page);
        });
    }

    /**
     * Registers plugin's custom hooks.
     */
    private static function custom_hooks()
    {
        add_filter(
            'posts_bridge_post_types',
            static function ($remote_cpts, $api = null) {
                if (!is_list($remote_cpts)) {
                    $remote_cpts = [];
                }

                return array_merge($remote_cpts, Remote_CPT::post_types($api));
            },
            5,
            2
        );

        add_filter('posts_bridge_is_remote', static function () {
            global $posts_bridge_remote_cpt;
            return !empty($posts_bridge_remote_cpt);
        });

        add_filter(
            'posts_bridge_relations',
            static function ($relations) {
                if (!is_list($relations)) {
                    $relations = [];
                }

                return array_merge($relations, Remote_Relation::relations());
            },
            5,
            1
        );

        add_filter(
            'posts_bridge_relation',
            static function ($relation, $post_type) {
                $relations = apply_filters('posts_bridge_relations', []);
                foreach ($relations as $relation) {
                    if ($relation->post_type === $post_type) {
                        return $relation;
                    }
                }
            },
            10,
            2
        );
    }

    /**
     * Registers callbacks to wp rest hooks.
     */
    private static function rest_hooks()
    {
        // Initalize REST controllers on API init
        add_action('rest_api_init', static function () {
            foreach (Remote_CPT::post_types() as $post_type) {
                self::$rest_controllers[
                    $post_type
                ] = new REST_Remote_Posts_Controller($post_type);
            }
        });

        // Filter REST Requests before dispatch
        add_filter(
            'rest_pre_dispatch',
            static function ($result, $server, $request) {
                foreach (array_values(self::$rest_controllers) as $controller) {
                    $result = $controller->rest_pre_dispatch(
                        $result,
                        $server,
                        $request
                    );
                    if (is_wp_error($result)) {
                        return $result;
                    }
                }
            },
            10,
            3
        );
    }

    /**
     * Enqueue admin client scripts
     *
     * @param string $admin_page Current admin page.
     */
    private static function admin_enqueue_scripts($admin_page)
    {
        $slug = self::slug();
        $version = self::version();
        if ('settings_page_' . $slug !== $admin_page) {
            return;
        }

        $dependencies = apply_filters('posts_bridge_admin_script_deps', [
            'react',
            'react-jsx-runtime',
            'wp-api-fetch',
            'wp-components',
            'wp-dom-ready',
            'wp-element',
            'wp-i18n',
            'wp-api',
        ]);

        wp_enqueue_script(
            $slug,
            plugins_url('assets/wppb.js', __FILE__),
            [],
            $version,
            ['in_footer' => false]
        );

        wp_enqueue_script(
            $slug . '-admin',
            plugins_url('assets/plugin.bundle.js', __FILE__),
            $dependencies,
            $version,
            ['in_footer' => true]
        );

        wp_set_script_translations(
            $slug . '-admin',
            $slug,
            plugin_dir_path(__FILE__) . 'languages'
        );

        wp_enqueue_style('wp-components');
    }

    /**
     * Register plugin's shortcodes. Skips registrations on admin requests.
     */
    private static function register_shortcodes()
    {
        if (is_admin()) {
            return;
        }

        add_shortcode('posts_bridge_remote_fields', static function (
            $atts,
            $content = ''
        ) {
            return Remote_CPT::do_shortcode($content);
        });

        add_shortcode('posts_bridge_remote_callback', static function (
            $atts,
            $content = ''
        ) {
            return Remote_CPT::do_remote_callback($atts, $content);
        });
    }

    /**
     * Registers remote cpts remote fields as post meta to make it visibles
     * on the REST API.
     */
    private static function register_meta()
    {
        $relations = apply_filters('posts_bridge_relations', []);
        foreach ($relations as $rel) {
            $rel->register_meta();
        }
    }

    /**
     * Callback to `the_post` hook to populate the global $posts_bridge_remote_cpt variable with
     * the current post wrapped as a Remote CPT.
     *
     * @param WP_Post $post Global WP post.
     */
    private static function the_post($post)
    {
        global $posts_bridge_remote_cpt;
        if (
            empty($post) ||
            !$post->ID ||
            !in_array($post->post_type, Remote_CPT::post_types())
        ) {
            $posts_bridge_remote_cpt = null;
        } else {
            $posts_bridge_remote_cpt = new Remote_CPT($post);
        }
    }
}

// Start the plugin
Posts_Bridge::setup();
