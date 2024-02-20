<?php

namespace WPCT_RCPT;

/**
 * Plugin Name:     Wpct Remote CPT
 * Plugin URI:      https://git.coopdevs.org/coopdevs/website/wp/wp-plugins/wpct-remote-cpt
 * Description:     Custom Post Type with remote sourcing
 * Author:          Còdec Cooperativa
 * Author URI:      https://www.codeccoop.org
 * Text Domain:     wpct-remote-cpt
 * Domain Path:     /languages
 * Version:         0.0.1
 *
 * @package         Wpct_Remote_Cpt
 */

require_once 'abstract/class-singleton.php';
require_once 'abstract/class-plugin.php';

require_once 'includes/class-api-client.php';
require_once 'includes/class-model.php';
// require_once 'includes/class-patterns.php';
// require_once 'includes/class-templates.php';
require_once 'includes/class-rest-controller.php';

require_once 'includes/trait-cron.php';
require_once 'includes/trait-translations.php';


if (!defined('WPCT_RCPT_ENV')) {
    define('WPCT_RCPT_ENV', 'development');
}

class Wpct_Remote_Cpt extends Abstract\Plugin
{
    use Translations;
    use Cron;

    protected $name = 'Wpct Remote CPT';
    protected $textdomain = 'wpct-remote-cpt';

    private $_post_types = ['remote-cpt'];

    protected $dependencies = [
        'Wpct Http Backend' => '<a href="https://git.coopdevs.org/codeccoop/wp/wpct-http-backend/">Wpct Http Backend</a>',
        'Wpct i18n' => '<a href="https://git.coopdevs.org/codeccoop/wp/wpct-i18n/">Wpct i18n</a>'
    ];

    public static function activate()
    {
    }

    public static function deactivate()
    {
    }

    public function load()
    {
        parent::__construct();

        add_action('rest_api_init', function () {
            foreach ($this->post_types as $post_type) {
                (new REST_Controller($post_type))->register_routes();
            }
        });

        add_action('the_post', [$this, 'the_post'], 10, 2);
        add_action('wp', [$this, 'set_global'], 10);
        add_action('wp', [$this, 'register_shortcode'], 20);
        add_action('wp_insert_post', [$this, 'on_insert_post'], 90, 3);
    }

    public function init()
    {
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

    public function register_shortcode()
    {
        if (is_admin()) {
            return;
        }

        global $remote_cpt;
        if (empty($remote_cpt)) {
            return;
        }

        add_shortcode('remote_field', function ($atts, $content) {
            global $remote_cpt;
            if (empty($remote_cpt)) {
                return '';
            }

            $field = isset($atts['field']) ? $atts['field'] : null;

            if (empty($field)) {
                return '';
            }

            $value = $remote_cpt->get($field);
            if (empty($value)) {
                return  '';
            }

            if (empty($content)) {
                return $value;
            }

            return sprintf($content, $value);
        });

        add_shortcode('remote_fields', function ($atts, $content) {
            global $remote_cpt;
            if (empty($remote_cpt)) {
                return '';
            }

            $fields = isset($atts['fields']) ? $atts['fields'] : null;
            if (empty($fields)) {
                return  '';
            }

            $values = array_map(function ($field) use ($remote_cpt) {
                $field = trim($field);
                return $remote_cpt->get($field, '');
            }, explode(',', $fields));


            return sprintf($content, ...$values);
        });

        add_shortcode('remote_callback', function ($atts) {
            global $remote_cpt;
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

    public function set_global()
    {
        global $post;
        $this->the_post($post);
    }

    public function the_post($post)
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
            return apply_filters('wpct_rcpt_post_types', $this->_post_types);
        }

        return null;
    }

    public function on_insert_post($post_id, $post, $update)
    {
        if (!($update && in_array($post->post_type, $this->post_types))) {
            return;
        }

        if ($post->post_status === 'trash') {
            Translations::drop_translations($post_id);
            return;
        }

        if ($post->post_status === 'translating') {
            return;
        }

        if (apply_filters('wpct_i18n_is_translation', $post_id)) {
            return;
        }

        self::detach(function ($post_id) {
            self::do_translations($post_id);
        }, $post_id);
    }
}

add_action('plugins_loaded', function () {
    $plugin = Wpct_Remote_Cpt::get_instance();
    $plugin->load();
});

$remote_cpt = null;
