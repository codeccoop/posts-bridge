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
 * @package         wpct_remote_cpt
 */

require_once 'abstract/class-singleton.php';
require_once 'abstract/class-plugin.php';

require_once 'includes/class-model.php';
require_once 'includes/class-api-client.php';
require_once 'includes/class-patterns.php';
require_once 'includes/class-templates.php';
require_once 'includes/class-rest-controller.php';


if (!defined('WPCT_REMOTE_CPT_ENV')) {
    define('WPCT_REMOTE_CPT_ENV', 'development');
}

class Wpct_Remote_Cpt extends Abstract\Plugin
{
    protected $name = 'Wpct Remote CPT';
    protected $textdomain = 'wpct-remote-cpt';

    private $post_types = ['remote-cpt'];

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

        $this->post_types = apply_filters('wpct_remote_cpt_post_type', $this->post_types);

        add_action('rest_api_init', function () {
            (new REST_Controller($this->post_types))->register_routes();
        });

        add_action('the_post', [$this, 'the_post'], 10, 2);
        add_action('wp', [$this, 'set_global'], 10);
        add_action('wp', [$this, 'register_shortcode'], 20);
    }

    public function init()
    {
        if (!wp_is_block_theme()) {
            return;
        }

        $api_client = ApiClient::get_instance('/api/private/crm-lead', $this->post_types);

        $plugin_dir = plugin_dir_path(__FILE__);
        Patterns::register_block_patterns($plugin_dir, $this->post_types);
        Templates::register_block_templates($plugin_dir, $this->post_types);

        Model::$api_client = $api_client;
        Model::register($this->post_types);
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

        add_shortcode('remote_field', function ($atts, $content) use ($remote_cpt) {
            $field = isset($atts['field']) ? $atts['field'] : null;
            if (!$field) {
                return;
            }

            $data = $remote_cpt->get_data();
            if (!isset($data[$field])) {
                return  '';
            }

            if (empty($content)) {
                return $data[$field];
            }

            return sprintf($content, $data[$field]);
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
        if (empty($post) || !in_array($post->post_types, $this->post_types)) {
            $remote_cpt = null;
        } else {
            $remote_cpt = new Model($post);
        }
    }
}

add_action('plugins_loaded', function () {
    $plugin = Wpct_Remote_Cpt::get_instance();
    $plugin->load();
});

$remote_cpt = null;
