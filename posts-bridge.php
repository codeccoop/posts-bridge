<?php

/**
 * Plugin Name:     Posts Bridge
 * Plugin URI:      https://git.coopdevs.org/codeccoop/wp/plugins/bridges/posts-bridge
 * Description:     Bridge backend data to WP posts collections
 * Author:          Còdec
 * Author URI:      https://www.codeccoop.org
 * Text Domain:     posts-bridge
 * Domain Path:     /languages
 * Version:         2.3.1
 */

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Plugin as BasePlugin;
use WPCT_ABSTRACT\Setting;

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
require_once 'includes/class-settings.php';
require_once 'includes/class-posts-synchronizer.php';
require_once 'includes/class-rest-remote-posts-controller.php';
require_once 'includes/class-remote-relation.php';
require_once 'includes/class-remote-featured-media.php';
require_once 'includes/class-json-finger.php';

require_once 'addons/abstract-addon.php';

require_once 'custom-blocks/remote-fields/remote-fields.php';

/**
 * Handle global Remote_CPT instances.
 *
 * @var Remote_CPT|null $remote_cpt Global Remote_CPT instance.
 */
$remote_cpt = null;

/**
 * Posts Bridge plugin.
 */
class Posts_Bridge extends BasePlugin
{
    /**
     * Handle plugin's settings store class name.
     *
     * @var string $settings_class Plugin's settings store class name.
     */
    protected static $settings_class = '\POSTS_BRIDGE\Settings';

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
    private $rest_controllers = [];

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
     * Callback to the wp init hook, register the shortcodes and remote cpt remote fields as meta.
     */
    public function init()
    {
        $this->register_shortcodes();
        $this->register_meta();
    }

    /**
     * Binds REST_Controllers to the rest_api_init hook, instantiate the Posts_Syncronizer
     * and binds plugin to wp hooks.
     */
    protected function construct(...$args)
    {
        parent::construct(...$args);

        $this->sync_http_settings();
        $this->wp_hooks();
        $this->rest_hooks();
        $this->custom_hooks();

        $addons = $this->addons();
        foreach ($addons as $addon => $enabled) {
            if ($enabled) {
                require_once plugin_dir_path(__FILE__) .
                    "addons/{$addon}/{$addon}.php";
            }
        }
    }

    /**
     * Synchronize plugin and http-bridge settings
     */
    private function sync_http_settings()
    {
        // Patch addons to the general setting default value
        add_filter(
            'wpct_setting_default',
            function ($default, $name) {
                if ($name !== $this->slug() . '_general') {
                    return $default;
                }

                return array_merge($default, ['addons' => $this->addons()]);
            },
            10,
            2
        );

        // Patch http bridge settings to plugin settings
        add_filter("option_{$this->slug()}_general", function ($value) {
            $http = Settings::get_setting('http-bridge', 'general');
            foreach (['backends', 'whitelist'] as $key) {
                $value[$key] = $http->data($key);
            }

            $value['addons'] = $this->addons();
            return $value;
        });

        // Syncronize plugin settings with http bridge settings
        add_action(
            'updated_option',
            static function ($option, $from, $to) {
                if ($option !== self::slug() . '_general') {
                    return;
                }

                $data = [];
                foreach (['backends', 'whitelist'] as $key) {
                    $data[$key] = $to[$key];
                }

                $http = Settings::get_setting('http-bridge', 'general');
                $http->update(array_merge($http->data(), $data));
            },
            10,
            3
        );
    }

    /**
     * Registers plugin's callbacks to wp hooks.
     */
    private function wp_hooks()
    {
        // Store global remote cpts
        add_action(
            'the_post',
            function ($post) {
                $this->the_post($post);
            },
            10,
            2
        );

        // Enqueue plugin admin client scripts
        add_action('admin_enqueue_scripts', function ($admin_page) {
            $this->admin_enqueue_scripts($admin_page);
        });
    }

    /**
     * Registers plugin's custom hooks.
     */
    private function custom_hooks()
    {
        add_filter(
            'posts_bridge_post_types',
            static function ($remote_cpts, $proto = null) {
                if (!is_list($remote_cpts)) {
                    $remote_cpts = [];
                }

                return array_merge(
                    $remote_cpts,
                    Remote_CPT::post_types($proto)
                );
            },
            5,
            2
        );

        add_filter(
            'posts_bridge_is_remote',
            function () {
                global $remote_cpt;
                return !empty($remote_cpt);
            },
            1,
            5
        );

        add_filter(
            'posts_bridge_relation',
            static function ($relation, $post_type) {
                if ($relation instanceof Remote_Relation) {
                    return $relation;
                }

                $relations = Remote_Relation::relations();
                foreach ($relations as $rel) {
                    if ($rel->post_type === $post_type) {
                        return $rel;
                    }
                }
            },
            5,
            2
        );

        add_filter(
            'posts_bridge_relations',
            static function ($relations, $api = null) {
                if (!is_list($relations)) {
                    $relations = [];
                }

                if ($api && $api !== 'rest') {
                    return $relations;
                }

                return array_merge($relations, Remote_Relation::relations());
            },
            5,
            2
        );

        add_filter(
            'posts_bridge_setting',
            static function ($setting, $name) {
                if ($setting instanceof Setting) {
                    return $setting;
                }

                return Settings::get_setting(self::slug(), $name);
            },
            5,
            2
        );
    }

    /**
     * Registers callbacks to wp rest hooks.
     */
    private function rest_hooks()
    {
        // Initalize REST controllers on API init
        add_action('rest_api_init', function () {
            foreach (Remote_CPT::post_types() as $post_type) {
                $this->rest_controllers[
                    $post_type
                ] = new REST_Remote_Posts_Controller($post_type);
            }
        });

        // Filter REST Requests before dispatch
        add_filter(
            'rest_pre_dispatch',
            function ($result, $server, $request) {
                foreach (array_values($this->rest_controllers) as $controller) {
                    $controller->rest_pre_dispatch($result, $server, $request);
                }
            },
            10,
            3
        );
    }

    /**
     * Gets plugin's available addons at its activation state.
     *
     * @return array $addons Array with addons name and its activation state.
     */
    private function addons()
    {
        $addons_dir = plugin_dir_path(__FILE__) . 'addons';
        $enableds = "{$addons_dir}/enabled";
        $addons = scandir($addons_dir);
        $registry = [];

        foreach ($addons as $addon) {
            if (in_array($addon, ['.', '..'])) {
                continue;
            }

            $addon_dir = "{$addons_dir}/{$addon}";
            $index = "{$addon_dir}/{$addon}.php";
            if (is_file($index)) {
                $registry[$addon] = is_file("{$enableds}/{$addon}");
            }
        }

        return $registry;
    }

    /**
     * Enqueue admin client scripts
     *
     * @param string $admin_page Current admin page.
     */
    private function admin_enqueue_scripts($admin_page)
    {
        if ('settings_page_' . $this->slug() !== $admin_page) {
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
            $this->slug(),
            plugins_url('assets/wppb.js', __FILE__),
            [],
            $this->version(),
            ['in_footer' => false]
        );

        wp_enqueue_script(
            $this->slug() . '-admin',
            plugins_url('assets/plugin.bundle.js', __FILE__),
            $dependencies,
            $this->version(),
            ['in_footer' => true]
        );

        wp_set_script_translations(
            $this->slug() . '-admin',
            $this->slug(),
            plugin_dir_path(__FILE__) . 'languages'
        );

        wp_enqueue_style('wp-components');
    }

    /**
     * Register plugin's shortcodes. Skips registrations on admin requests.
     */
    private function register_shortcodes()
    {
        if (is_admin()) {
            return;
        }

        add_shortcode('remote_fields', function ($atts, $content = '') {
            return Remote_CPT::do_shortcode($content);
        });

        add_shortcode('remote_callback', function ($atts, $content = '') {
            return Remote_CPT::do_remote_callback($atts, $content);
        });
    }

    /**
     * Registers remote cpts remote fields as post meta to make it visibles
     * on the REST API.
     */
    private function register_meta()
    {
        $relations = Remote_Relation::relations();
        foreach ($relations as $rel) {
            $rel->register_meta();
        }
    }

    /**
     * Callback to `the_post` hook to populate the global $remote_cpt variable with
     * the current post wrapped as a Remote CPT.
     *
     * @param WP_Post $post Global WP post.
     */
    private function the_post($post)
    {
        global $remote_cpt;
        if (
            empty($post) ||
            !$post->ID ||
            !in_array($post->post_type, Remote_CPT::post_types())
        ) {
            $remote_cpt = null;
        } else {
            $remote_cpt = new Remote_CPT($post);
        }
    }
}

Posts_Bridge::setup();
