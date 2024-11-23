<?php

/**
 * Plugin Name:     Posts Bridge
 * Plugin URI:      https://git.coopdevs.org/coopdevs/website/wp/wp-plugins/bridges/posts-bridge
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

require_once 'abstracts/class-singleton.php';
require_once 'abstracts/class-plugin.php';

require_once 'deps/http/http-bridge.php';
require_once 'deps/i18n/wpct-i18n.php';

require_once 'includes/class-api-client.php';
require_once 'includes/class-model.php';
require_once 'includes/class-rest-controller.php';
require_once 'includes/class-menu.php';
require_once 'includes/class-settings.php';
require_once 'includes/class-synchronizer.php';

require_once 'includes/trait-cron.php';
require_once 'includes/trait-translations.php';

require_once 'custom-blocks/remote-field/remote-field.php';

class Posts_Bridge extends BasePlugin
{
    use Translations;
    use Cron;

    protected static $menu_class = '\POSTS_BRIDGE\Menu';

    public static $name = 'Posts Bridge';
    public static $textdomain = 'posts-bridge';

    private $synchronizer = null;

    public static function activate()
    {
        (Synchronizer::get_instance())->schedule();
    }

    public static function deactivate()
    {
        self::unschedule();
    }

    public function __construct()
    {
        parent::__construct();

        add_action('rest_api_init', function () {
            foreach ($this->post_types as $post_type) {
                (new REST_Controller($post_type))->register_routes();
            }
        });

        add_action('the_post', function ($post) {
            $this->the_post($post);
        }, 10, 2);

        add_action('wp', function () {
            $this->set_global();
        }, 10);

        add_action('wp', function () {
            return $this->register_shortcode();
        }, 20);

        add_action('wp_insert_post', function ($post_id, $post, $update) {
            $this->on_insert_post($post_id, $post, $update);
        }, 90, 3);

        add_action('admin_menu', function () {
            foreach ($this->post_types as $post_type) {
                $hide = apply_filters('posts_bridge_hide_menu', true, $post_type);
                if ($hide) {
                    remove_menu_page('edit.php?post_type=' . $post_type);
                }
            }
        });

        $this->synchronizer = Synchronizer::get_instance();
    }

    public function init()
    {
        add_filter('option_posts-bridge_general', function ($value) {
            $http_setting = Settings::get_setting('http-bridge', 'general');
            foreach ($http_setting as $key => $val) {
                $value[$key] = $val;
            }

            return $value;
        });

        add_action('updated_option', function ($option, $from, $to) {
            if ($option !== 'posts-bridge_general') {
                return;
            }

            $http_setting = Settings::get_setting('http-bridge', 'general');
            foreach (array_keys($http_setting) as $key) {
                $http_setting[$key] = $to[$key];
            }

            update_option('http-bridge_general', $http_setting);
        }, 10, 3);
    }

    private function register_shortcode()
    {
        if (is_admin()) {
            return;
        }

        add_shortcode('remote_field', function ($atts, $content) {
            if (!isset($atts['field'])) {
                return '';
            }
            $atts['fields'] = $atts['field'];
            unset($atts['field']);
            return $this->do_shortcode($atts, $content);
        });

        add_shortcode('remote_fields', function ($atts, $content) {
            return $this->do_shortcode($atts, $content);
        });

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

    private function do_shortcode($atts, $content)
    {
        global $remote_cpt;
        if (empty($remote_cpt)) {
            return '';
        }

        $fields = isset($atts['fields']) ? $atts['fields'] : null;
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
        if ($is_empty) {
            return '';
        }

        $values = array_map(function ($field) use ($remote_cpt) {
            return $remote_cpt->get($field, '');
        }, $fields);

        try {
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

    private function set_global()
    {
        global $post;
        $this->the_post($post);
    }

    private function the_post($post)
    {
        global $remote_cpt;
        if (empty($post) || !in_array($post->post_type, $this->post_types)) {
            $remote_cpt = null;
        } else {
            $remote_cpt = new Remote_CPT($post);
        }
    }

    public function __get($attr)
    {
        if ($attr === 'post_types') {
            $relations = array_merge(
                Settings::get_setting('posts-bridge', 'rest-api', 'relations'),
                Settings::get_setting('posts-bridge', 'rpc-api', 'relations'),
            );
            return array_unique(array_map(function ($rel) {
                return trim($rel['post_type']);
            }, $relations));
        }

        return null;
    }

    private function on_insert_post($post_id, $post, $update)
    {
        if (!in_array($post->post_type, $this->post_types)) {
            return;
        }

        if ($post->post_status === 'trash') {
            self::drop_translations($post_id);
            wp_delete_post($post_id, true);
            return;
        }

        if ($post->post_status === 'translating') {
            return;
        }

        if (apply_filters('wpct_i18n_is_translation', $post_id)) {
            return;
        }

        if ($post->post_status === 'publish') {
            self::detach('\POSTS_BRIDGE\_posts_bridge_do_translations', $post_id);
        }
    }
}

function _posts_bridge_do_translations($post_id)
{
    Posts_Bridge::do_translations($post_id);
}

add_action('plugins_loaded', function () {
    Posts_Bridge::start();
});


add_action(Posts_Bridge::$detach_hook, function () {
    Posts_Bridge::do_detacheds();
});

add_action(Posts_Bridge::$schedule_hook, function ($post_types) {
    $synchronizer = Synchronizer::get_instance();
    $synchronizer->sync('rest', $post_types);
    $synchronizer->sync('rpc', $post_types);
});

$remote_cpt = null;
