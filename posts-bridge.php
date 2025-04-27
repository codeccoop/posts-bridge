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
 * Version:             3.0.6
 * Requires PHP:        8.0
 * Requires at least:   6.7
 */

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Plugin as Base_Plugin;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'abstracts/class-plugin.php';

require_once 'deps/i18n/wpct-i18n.php';
require_once 'deps/http/http-bridge.php';

require_once 'includes/class-custom-post-type.php';
require_once 'includes/class-i18n.php';
require_once 'includes/class-json-finger.php';
require_once 'includes/class-logger.php';
require_once 'includes/class-menu.php';
require_once 'includes/class-post-bridge-template.php';
require_once 'includes/class-post-bridge.php';
require_once 'includes/class-posts-synchronizer.php';
require_once 'includes/class-remote-cpt.php';
require_once 'includes/class-remote-featured-media.php';
require_once 'includes/class-rest-remote-posts-controller.php';
require_once 'includes/class-rest-settings-controller.php';
require_once 'includes/class-settings-store.php';

require_once 'includes/shortcodes.php';

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
     * Handles the plugin db version option name.
     *
     * @var string
     */
    private const db_version = 'posts-bridge-version';

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
     * Schedules Posts_Synchronizer on plugin activation, adds the plugin's default thumbnail
     * to the media store, and initialize the db version option.
     */
    public static function activate()
    {
        Remote_Featured_Media::setup_default_thumbnail();
        Posts_Synchronizer::schedule();

        $version = get_option(self::db_version);
        if ($version === false) {
            update_option(self::db_version, self::version(), true);
        }
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
     * Initialized addons, sets up plugin hooks and run db migrations if db version mismatches
     * the plugin version.
     */
    protected function construct(...$args)
    {
        parent::construct(...$args);

        Custom_Post_Type::load();
        Addon::load();

        self::wp_hooks();
        self::rest_hooks();
        self::http_hooks();
    }

    /**
     * Init hook callabck. Checks if comes from an upgrade and run db migrations.
     */
    protected static function init()
    {
        $db_version = get_option(self::db_version);
        if ($db_version !== self::version()) {
            self::do_migrations();
        }
    }

    /**
     * Aliases to the http bride filters API.
     */
    private static function http_hooks()
    {
        add_filter(
            'posts_bridge_backends',
            static function ($backends) {
                return apply_filters('http_bridge_backends', $backends);
            },
            10,
            1
        );

        add_filter(
            'posts_bridge_backend',
            static function ($backend, $name) {
                return apply_filters('http_bridge_backend', $backend, $name);
            },
            10,
            2
        );

        add_filter(
            'http_bridge_backend_headers',
            static function ($headers, $backend) {
                return apply_filters(
                    'posts_bridge_backend_headers',
                    $headers,
                    $backend
                );
            },
            99,
            2
        );

        add_filter(
            'http_bridge_backend_url',
            static function ($url, $backend) {
                return apply_filters(
                    'posts_bridge_backend_url',
                    $url,
                    $backend
                );
            },
            99,
            2
        );

        add_filter(
            'http_bridge_response',
            static function ($response, $request) {
                return apply_filters(
                    'posts_bridge_http_response',
                    $response,
                    $request
                );
            },
            99,
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
            9,
            2
        );

        // Enqueue plugin admin client scripts
        add_action('admin_enqueue_scripts', static function ($admin_page) {
            self::admin_enqueue_scripts($admin_page);
        });
    }

    /**
     * Registers callbacks to wp rest hooks.
     */
    private static function rest_hooks()
    {
        // Initalize REST controllers on API init
        add_action('rest_api_init', static function () {
            $post_types = apply_filters('posts_bridge_remote_cpts', []);
            foreach ($post_types as $post_type) {
                self::$rest_controllers[
                    $post_type
                ] = new REST_Remote_Posts_Controller($post_type);
            }
        });
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
     * Callback to `the_post` hook to populate the global $posts_bridge_remote_cpt variable with
     * the current post wrapped as a Remote CPT.
     *
     * @param WP_Post $post Global WP post.
     */
    private static function the_post($post)
    {
        global $posts_bridge_remote_cpt;

        if (!empty($post) && !empty($post->ID)) {
            $post_types = apply_filters('posts_bridge_remote_cpts', []);
            if (in_array($post->post_type, $post_types, true)) {
                $posts_bridge_remote_cpt = new Remote_CPT($post);
            }
        } else {
            $posts_bridge_remote_cpt = null;
        }
    }

    /**
     * Apply db migrations on plugin upgrades.
     */
    private static function do_migrations()
    {
        $from = get_option(self::db_version, '1.0.0');

        if (!preg_match('/^\d+\.\d+\.\d+$/', $from)) {
            Logger::log('Invalid db plugin version', Logger::ERROR);
            return;
        }

        $to = self::version();

        $migrations = [];
        $migrations_path = self::path() . 'migrations';

        $as_int = fn($version) => (int) str_replace('.', '', $version);

        foreach (
            array_diff(scandir($migrations_path), ['.', '..'])
            as $migration
        ) {
            $version = pathinfo($migrations_path . '/' . $migration)[
                'filename'
            ];

            if ($as_int($version) > $as_int($to)) {
                break;
            }

            if (!empty($migrations)) {
                $migrations[] = $migration;
                continue;
            }

            if ($as_int($version) >= $as_int($from)) {
                $migrations[] = $migration;
            }
        }

        sort($migrations);
        foreach ($migrations as $migration) {
            include $migrations_path . '/' . $migration;
        }

        update_option(self::db_version, $to);
    }
}

// Start the plugin
Posts_Bridge::setup();
