<?php

/**
 * Plugin Name:     Posts Bridge
 * Plugin URI:      https://git.coopdevs.org/codeccoop/wp/plugins/bridges/posts-bridge
 * Description:     Bridge backend data to WP posts collections
 * Author:          Còdec
 * Author URI:      https://www.codeccoop.org
 * Text Domain:     posts-bridge
 * Domain Path:     /languages
 * Version:         1.0.0
 */

namespace POSTS_BRIDGE;

use ValueError;
use WPCT_ABSTRACT\Plugin as BasePlugin;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Handle plugin version.
 *
 * @var string POSTS_BRIDGE_VERSION Current plugin version.
 */
define('POSTS_BRIDGE_VERSION', '1.0.0');

require_once 'abstracts/class-plugin.php';

require_once 'deps/http/http-bridge.php';
require_once 'deps/i18n/wpct-i18n.php';

require_once 'includes/class-http-client.php';
require_once 'includes/class-remote-cpt.php';
require_once 'includes/class-menu.php';
require_once 'includes/class-posts-synchronizer.php';
require_once 'includes/class-rest-remote-posts-controller.php';
require_once 'includes/class-remote-relation.php';

require_once 'includes/trait-cron.php';
require_once 'includes/trait-translations.php';

require_once 'custom-blocks/remote-field/remote-field.php';

/**
 * Posts Bridge plugin.
 */
class Posts_Bridge extends BasePlugin
{
    use Translations;
    use Cron;

    /**
     * Handle plugin menu class name.
     *
     * @var string $menu_class Plugin menu class name.
     */
    protected static $menu_class = '\POSTS_BRIDGE\Menu';

    /**
     * Handle plugin name.
     *
     * @var string $name Plugin name.
     */
    public static $name = 'Posts Bridge';

    /**
     * Handle plugin textdomain.
     *
     * @var string $textdomain Plugin text domain.
     */
    public static $textdomain = 'posts-bridge';

    /**
     * Handle Posts_Synchronizer instance.
     *
     * @var Posts_Synchronizer $synchronizer Posts_Synchronizer instance.
     */
    private $synchronizer = null;

    /**
     * Handle post types REST Controller instances
     *
     * @var array<REST_Controller> $rest_controllers Array of active REST_Controller instances
     */
    private $rest_controllers = [];

    /**
     * Schedule Posts_Synchronizer on plugin activation.
     */
    public static function activate()
    {
        Posts_Bridge::setup_default_thumbnail();
        (Posts_Synchronizer::get_instance())->schedule();
    }

    /**
     * Unschedule Posts_Synchronizer on plugin deactivation.
     */
    public static function deactivate()
    {
        Posts_Bridge::remove_default_thumbnail();
        self::unschedule();
    }

    /**
     * Public plugin starter method.
     */
    public static function start()
    {
        return self::get_instance();
    }

    /**
     * Register the plugin default thumbnail as a WP_Attachment on plugin activations.
     */
    private static function setup_default_thumbnail()
    {
        $attachment_id = get_option('posts_bridge_thumbnail');
        if ($attachment_id) {
            $attachment = get_post($attachment_id);
            if ($attachment) {
                return;
            }
        }

        $static_path = apply_filters('posts_bridge_default_thumbnail', plugin_dir_path(__FILE__) . 'assets/posts-bridge-thumbnail.webp');

        $filename = basename($static_path);

        $upload_dir = wp_upload_dir();
        if (wp_mkdir_p($upload_dir['path'])) {
            $filepath = $upload_dir['path'] . '/' . $filename;
        } else {
            $filepath = $upload_dir['basedir'] . '/' . $filename;
        }

        if (file_exists($filepath)) {
            $ext = pathinfo($filepath)['extension'];
            $filepath = dirname($filepath) . '/' . time() . '.' . $ext;
        }

        file_put_contents($filepath, file_get_contents($static_path));

        $filetype = wp_check_filetype($filename, null);
        if (!$filetype['type']) {
            $filetype['type'] = mime_content_type($filepath);
        }

        $attachment_id = wp_insert_attachment([
            'post_mime_type' => $filetype['type'],
            'post_title' => 'posts-bridge-thumbnail',
            'post_content' => '',
            'post_status' => 'inherit',
        ], $filepath);

        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attachment_id, $filepath);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        add_option('posts_bridge_thumbnail', $attachment_id);
    }

    /**
     * Removes the default thumbnail attchment on plugin deactivations.
     */
    private static function remove_default_thumbnail()
    {
        $attachment_id = get_option('posts_bridge_thumbnail');
        if ($attachment_id) {
            $query = new WP_Query([
                'meta_key' => '_thumbnail_id',
                'meta_value' => $attachment_id,
            ]);
            if (!$query->found_posts) {
                wp_delete_attachment($attachment_id, true);
                delete_option('posts_bridge_thumbnail');
            }
        }
    }

    /**
     * Callback to the wp init hook, register the shortcodes.
     */
    public function init()
    {
        $this->register_shortcodes();
    }

    /**
     * Binds REST_Controllers to the rest_api_init hook, instantiate the Posts_Syncronizer
     * and binds plugin to wp hooks.
     */
    public function __construct()
    {
        parent::__construct();

        add_action('rest_api_init', function () {
            foreach (Settings::get_post_types() as $post_type) {
                $this->rest_controllers[$post_type] = new REST_Remote_Posts_Controller($post_type);
            }
        });

        $this->synchronizer = Posts_Synchronizer::get_instance();
        $this->sync_http_settings();
        $this->wp_hooks();
        $this->custom_hooks();
    }

    /**
     * Synchronize plugin and http-bridge settings
     */
    private function sync_http_settings()
    {
        // Patch http bridge settings to erp forms settings
        add_filter('option_posts-bridge_general', function ($value) {
            $http_setting = Settings::get_setting('http-bridge', 'general');
            foreach (['backends', 'whitelist'] as $key) {
                $value[$key] = $http_setting[$key];
            }

            return $value;
        });

        // Syncronize erp form settings with http bridge settings
        add_action('updated_option', function ($option, $from, $to) {
            if ($option !== 'posts-bridge_general') {
                return;
            }

            $http_setting = Settings::get_setting('http-bridge', 'general');
            foreach (['backends', 'whitelist'] as $key) {
                $http_setting[$key] = $to[$key];
            }

            update_option('http-bridge_general', $http_setting);
        }, 10, 3);
    }

    /**
     * Bind plugin to wp hooks.
     */
    private function wp_hooks()
    {
        // Add link to submenu page on plugins page
        add_filter(
            'plugin_action_links',
            function ($links, $file) {
                if ($file !== plugin_basename(__FILE__)) {
                    return $links;
                }

                $url = admin_url('options-general.php?page=posts-bridge');
                $label = __('Settings');
                $link = "<a href='{$url}'>{$label}</a>";
                array_unshift($links, $link);
                return $links;
            },
            5,
            2
        );

        // Store global remote cpts
        add_action('the_post', function ($post) {
            $this->the_post($post);
        }, 10, 2);

        // Translate remote cpts on updates
        add_action('wp_insert_post', function ($post_id, $post, $update) {
            $this->translate_post($post_id, $post, $update);
        }, 90, 3);

        // Hide remote cpts from admin menu
        add_action('admin_menu', function () {
            foreach (Settings::get_post_types() as $post_type) {
                $hide = apply_filters('posts_bridge_hide_menu', true, $post_type);
                if ($hide) {
                    remove_menu_page('edit.php?post_type=' . $post_type);
                }
            }
        });

        // Enqueue plugin admin client scripts
        add_action('admin_enqueue_scripts', function ($admin_page) {
            $this->admin_enqueue_scripts($admin_page);
        });

        // Register custom schedules
        add_filter('cron_schedules', function ($schedules) {
            return $this->register_custom_schedules($schedules);
        });
    }

    /**
     * Add plugin custom filters.
     */
    private function custom_hooks()
    {
        add_filter('posts_bridge_remote_cpts', function ($default, $proto = null) {
            return Settings::get_post_types($proto);
        }, 10, 2);

        add_filter('posts_bridge_is_remote', function () {
            global $remote_cpt;
            return !empty($remote_cpt);
        });

        add_filter('posts_bridge_relation', function ($default, $post_type) {
            $relations = Settings::get_relations();
            foreach ($relations as $rel) {
                if ($rel->get_post_type() === $post_type) {
                    return $rel;
                }
            }

            return null;
        }, 10, 2);

        add_filter('posts_bridge_relations', function ($default, $proto = null) {
            return Settings::get_relations($proto);
        }, 10, 2);

        add_filter('posts_bridge_backend', function ($default, $name) {
            return apply_filters('http_bridge_backend', $default, $name);
        }, 10, 2);

        add_filter('posts_bridge_backends', function () {
            return apply_filters('http_bridge_backends');
        });
    }

    /**
     * Enqueue admin client scripts
     *
     * @param string $admin_page Current admin page.
     */
    private function admin_enqueue_scripts($admin_page)
    {
        if ('settings_page_posts-bridge' !== $admin_page) {
            return;
        }

        wp_enqueue_script(
            $this->get_textdomain(),
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
            POSTS_BRIDGE_VERSION,
            ['in_footer' => true]
        );

        wp_set_script_translations(
            $this->get_textdomain(),
            $this->get_textdomain(),
            plugin_dir_path(__FILE__) . 'languages'
        );

        wp_localize_script(
            $this->get_textdomain(),
            '_postsBridgeAjax',
            [
                'url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('posts-bridge-ajax-sync'),
                'action' => 'posts_bridge_sync',
            ],
        );

        wp_enqueue_style('wp-components');
    }

    /**
     * Register `remote_field` shortcode to render remote fields on the frontend
     */
    private function register_shortcodes()
    {
        if (is_admin()) {
            return;
        }

        // Single field shortcode as proxy to the plural shortcode
        add_shortcode('remote_field', function ($atts, $content) {
            if (!isset($atts['field'])) {
                return '';
            }
            $atts['fields'] = $atts['field'];
            unset($atts['field']);
            return $this->do_shortcode($atts, $content);
        });

        // Multi field shortcode
        add_shortcode('remote_fields', function ($atts, $content) {
            return $this->do_shortcode($atts, $content);
        });

        // Callback shortcode, allow execution of arbitrary global functions
        // as shortcode callback, passing as arguments the remote post instance.
        add_shortcode('remote_callback', function ($atts) {
            global $remote_cpt;
            if (empty($remote_cpt)) {
                return '';
            }

            $callback = isset($atts['fn']) ? $atts['fn'] : null;

            if (empty($callback)) {
                return '';
            } else {
                unset($atts['fn']);
            }

            if (!function_exists($callback)) {
                return '';
            }

            return $callback($remote_cpt, $atts);
        });
    }

    /**
     * Do the `remote_field` shortcode fetching remote data of the current Remote CPT
     *
     * @param array $atts Shortcode attributes.
     * @param string $content Shortcode content.
     * @return string $html Rendered output.
     */
    private function do_shortcode($atts, $content)
    {
        global $remote_cpt;

        // Exit if global post is not Remote CPT
        if (empty($remote_cpt)) {
            return '';
        }

        $fields = isset($atts['fields']) ? $atts['fields'] : null;

        // Exit if no fields is defined
        if (empty($fields)) {
            return  '';
        } else {
            $fields = array_map(function ($field) {
                return trim($field);
            }, explode(',', $fields));
        }

        $is_empty = array_reduce($fields, function ($handle, $field) use ($remote_cpt) {
            return $handle || $remote_cpt->get($field) === null;
        }, false);

        // Exit if no field values
        if ($is_empty) {
            return '';
        }

        // Get remote field values
        $values = array_map(function ($field) use ($remote_cpt) {
            return $remote_cpt->get($field, '');
        }, $fields);

        try {
            // Replace anchors on the shortcode content with values
            for ($i = 0; $i < count($fields); $i++) {
                $field = $fields[$i];
                $value = $values[$i];
                $content = preg_replace('/_' . preg_quote($field, '/') . '_/', $value, $content);
            }

            return $content;
        } catch (ValueError $e) {
            return $e->getMessage();
        }
    }

    /**
     * Callback to the_post hook to populate the global $remote_cpt variable with
     * the current post wrapped as a Remote CPT.
     *
     * @param WP_Post $post Global WP post.
     */
    private function the_post($post)
    {
        global $remote_cpt;
        if (empty($post) || !$post->ID || !in_array($post->post_type, Settings::get_post_types())) {
            $remote_cpt = null;
        } else {
            $remote_cpt = new Remote_CPT($post);
        }
    }

    /**
     * Handle post translations on data updates.
     *
     * @param integer $post_id ID of the updated post.
     * @param WP_Post $post Instance of the opdated post.
     * @param boolean $update True if is a write operation of an existing post.
     */
    private function translate_post($post_id, $post, $update)
    {
        // Exit if is not a remote cpt
        if (!in_array($post->post_type, Settings::get_post_types())) {
            return;
        }

        // Exit if post is in translation process
        if ($post->post_status === 'translating') {
            return;
        }

        // If new status is trash, remove post translations
        if ($post->post_status === 'trash') {
            self::drop_translations($post_id);
            wp_delete_post($post_id, true);
            return;
        }

        // Exit if the post is a translation
        if (apply_filters('wpct_i18n_is_translation', false, $post_id)) {
            return;
        }

        // If post is published, then translate it
        if ($post->post_status === 'publish') {
            self::detach('\POSTS_BRIDGE\_posts_bridge_do_translations', $post_id);
        }
    }
}

// Public proxy to private Posts_Bridge::do_translation to allow hooks
function _posts_bridge_do_translations($post_id)
{
    Posts_Bridge::do_translations($post_id);
}

register_activation_hook(__FILE__, function () {
    Posts_Bridge::activate();
});

//
register_deactivation_hook(__FILE__, function () {
    Posts_Bridge::deactivate();
});

// Start the plugin on plugins loaded event
add_action('plugins_loaded', function () {
    Posts_Bridge::start();
});


// Bind detached hook to detached tasks
add_action(Posts_Bridge::$detach_hook, function () {
    Posts_Bridge::do_detacheds();
});

// Use schedule hook to trigger synchronizer subroutines
add_action(Posts_Bridge::$schedule_hook, function () {
    $synchronizer = Posts_Synchronizer::get_instance();
    $synchronizer->sync();
});

/**
* Handle global Remote_CPT instances.
 *
 * @var Remote_CPT|null $remote_cpt Global Remote_CPT instance.
 */
$remote_cpt = null;
