<?php

/**
 * Plugin Name:         Posts Bridge
 * Plugin URI:          https://postsbridge.codeccoop.org
 * Description:         Bridge your posts collections with your backend over HTTP APIs, enabling remote and automated web content management
 * Author:              codeccoop
 * Author URI:          https://www.codeccoop.org
 * License:             GPLv2 or later
 * License URI:         http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         posts-bridge
 * Domain Path:         /languages
 * Version:             4.0.1
 * Requires PHP:        8.0
 * Requires at least:   6.7
 */

namespace POSTS_BRIDGE;

use PBAPI;
use WPCT_PLUGIN\Plugin as Base_Plugin;

if (!defined('ABSPATH')) {
    exit();
}

define('POSTS_BRIDGE_INDEX', __FILE__);
define('POSTS_BRIDGE_DIR', dirname(__FILE__));
define('POSTS_BRIDGE_ADDONS_DIR', POSTS_BRIDGE_DIR . '/addons');

// Commons
require_once 'common/class-plugin.php';

// Deps
require_once 'deps/i18n/wpct-i18n.php';
require_once 'deps/http/http-bridge.php';

// Classes
require_once 'includes/class-api.php';
require_once 'includes/class-custom-post-type.php';
require_once 'includes/class-json-finger.php';
require_once 'includes/class-settings-store.php';
require_once 'includes/class-logger.php';
require_once 'includes/class-menu.php';
require_once 'includes/class-post-bridge.php';
require_once 'includes/class-post-bridge-template.php';
require_once 'includes/class-posts-synchronizer.php';
require_once 'includes/class-remote-cpt.php';
require_once 'includes/class-remote-featured-media.php';
require_once 'includes/class-rest-remote-posts-controller.php';
require_once 'includes/class-rest-settings-controller.php';
require_once 'includes/class-addon.php';

// Shortcodes
require_once 'includes/shortcodes.php';

// Custom blocks
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
    protected const store_class = '\POSTS_BRIDGE\Settings_Store';

    /**
     * Handle plugin menu class name.
     *
     * @var string $menu_class Plugin menu class name.
     */
    protected const menu_class = '\POSTS_BRIDGE\Menu';

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
        if (!self::upload_dir()) {
            wp_die(
                esc_html(
                    __(
                        'Posts Bridge requires the uploads directory to be writable',
                        'posts-bridge'
                    )
                )
            );
        }

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

        Custom_Post_Type::load_custom_post_types();
        Addon::load_addons();

        // Store global remote cpts
        add_action(
            'the_post',
            static function ($post) {
                self::the_post($post);
            },
            9,
            2
        );

        // Initalize REST controllers on API init
        add_action('rest_api_init', static function () {
            $post_types = apply_filters('posts_bridge_remote_cpts', []);
            foreach ($post_types as $post_type) {
                self::$rest_controllers[
                    $post_type
                ] = new REST_Remote_Posts_Controller($post_type);
            }
        });

        add_action('admin_enqueue_scripts', static function ($admin_page) {
            if ('settings_page_posts-bridge' === $admin_page) {
                self::admin_enqueue_scripts();
            }
        });

        add_action(
            'in_plugin_update_message-posts-bridge/posts-bridge.php',
            function ($plugin_data, $response) {
                if ($response->slug !== 'posts-bridge') {
                    return;
                }

                if (
                    !preg_match(
                        '/^(\d+)\.\d+\.\d+$/',
                        $response->new_version,
                        $matches
                    )
                ) {
                    return;
                }

                $new_version = $matches[1];
                $db_version = get_option(self::db_version, '1.0.0');

                if (!preg_match('/^(\d+)\.\d+\.\d+$/', $db_version, $matches)) {
                    return;
                }

                $from_version = $matches[1];

                if ($new_version > $from_version) {
                    echo '<br /><b>' .
                        '&nbsp' .
                        __(
                            'This is a major release and while tested thoroughly you might experience conflicts or lost data. We recommend you back up your data before updating and check your configuration after updating.',
                            'posts-bridge'
                        ) .
                        '</b>';
                }
            },
            10,
            2
        );
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
     * Enqueue admin client scripts
     */
    private static function admin_enqueue_scripts()
    {
        $version = self::version();

        wp_enqueue_script(
            'posts-bridge',
            plugins_url('assets/plugin.bundle.js', __FILE__),
            [
                'react',
                'react-jsx-runtime',
                'wp-api-fetch',
                'wp-components',
                'wp-dom-ready',
                'wp-element',
                'wp-i18n',
                'wp-api',
            ],
            $version,
            ['in_footer' => true]
        );

        wp_set_script_translations(
            'posts-bridge',
            'posts-bridge',
            self::path() . 'languages'
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
            $post_types = PBAPI::get_remote_cpts();

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

            if (
                $as_int($version) > $as_int($from) &&
                $as_int($version) <= $as_int($to)
            ) {
                $migrations[] = $migration;
            }
        }

        sort($migrations);
        foreach ($migrations as $migration) {
            include $migrations_path . '/' . $migration;
        }

        update_option(self::db_version, $to);
    }

    /**
     * Returns the plugin's uploads directory. If the directory does not
     * exists, it creates it on the fly.
     *
     * @return string|null Full path to the directory. Null if upload dir is not writable.
     */
    public static function upload_dir()
    {
        $dir = wp_upload_dir()['basedir'] . '/posts-bridge';

        if (!is_dir($dir)) {
            if (!wp_mkdir_p($dir)) {
                return;
            }
        }

        return $dir;
    }
}

// Start the plugin
Posts_Bridge::setup();
