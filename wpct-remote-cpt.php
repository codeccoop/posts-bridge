<?php

/**
 * Plugin Name:     Wpct Remote CPT
 * Plugin URI:      https://git.coopdevs.org/coopdevs/website/wp/wp-plugins/wpct-remote-cpt
 * Description:     Custom Post Type with remote sourcing
 * Author:          Còdec
 * Author URI:      https://www.codeccoop.org
 * Text Domain:     wpct-rcpt
 * Domain Path:     /languages
 * Version:         2.0.1
 *
 * @package         Wpct_Remote_Cpt
 */

namespace WPCT_RCPT;

use ValueError;

require_once 'abstracts/class-singleton.php';
require_once 'abstracts/class-plugin.php';

require_once 'wpct-http-bridge/wpct-http-bridge.php';
require_once 'wpct-i18n/wpct-i18n.php';

require_once 'includes/class-api-client.php';
require_once 'includes/class-model.php';
// require_once 'includes/class-patterns.php';
// require_once 'includes/class-templates.php';
require_once 'includes/class-rest-controller.php';
require_once 'includes/class-menu.php';
require_once 'includes/class-settings.php';

require_once 'includes/trait-cron.php';
require_once 'includes/trait-translations.php';

require_once 'custom-blocks/remote-field/remote-field.php';


if (!defined('WPCT_RCPT_ENV')) {
    define('WPCT_RCPT_ENV', 'production');
}

class Wpct_Remote_Cpt extends \WPCT_ABSTRACT\Plugin
{
    use Translations;
    use Cron;

    protected static $menu_class = '\WPCT_RCPT\Menu';

    public static $name = 'Wpct Remote CPT';
    public static $textdomain = 'wpct-rcpt';

    public static function activate()
    {
    }

    public static function deactivate()
    {
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
    }

    public function init()
    {
        add_filter('option_wpct-http-bridge_general', function () {
            return Settings::get_setting('wpct-rcpt', 'general');
        });
        // if (!wp_is_block_theme()) {
        //     return;
        // }

        // $plugin_path = plugin_dir_path(__FILE__);
        // Patterns::register_block_patterns($plugin_path);

        // foreach ($this->post_types as $post_type) {
        //     Templates::register_block_templates($post_type);
        //     Model::register($post_type);
        // }
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
            $remote_cpt = new Model($post);
        }
    }

    public function __get($attr)
    {
        if ($attr === 'post_types') {
            $setting = Settings::get_setting('wpct-rcpt', 'general');
            return apply_filters('wpct_rcpt_post_types', $setting['post_types']);
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
            self::detach('\WPCT_RCPT\_wpct_rcpt_do_translations', $post_id);
        }
    }
}

function _wpct_rcpt_do_translations($post_id)
{
    Wpct_Remote_Cpt::do_translations($post_id);
}

add_action('plugins_loaded', function () {
    $plugin = Wpct_Remote_Cpt::get_instance();
});


add_action(Wpct_Remote_Cpt::$schedule_hook, function () {
    Wpct_Remote_Cpt::do_schedule();
});

$remote_cpt = null;
