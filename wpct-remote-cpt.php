<?php

namespace WPCT_REMOTE_CPT;

use Exception;

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

require_once 'includes/class-model.php';
require_once 'includes/class-bridge.php';
require_once 'includes/class-patterns.php';
require_once 'includes/class-templates.php';
require_once 'includes/class-rest-controller.php';

add_action('init', function () {
    if (!wp_is_block_theme()) return;

    $post_type = apply_filters('wpct_remote_cpt_post_type', 'remote-cpt');
    $remote_fields = apply_filters('wpct_remote_cpt_fields', []);

    $bridge = new Bridge('/api/private/crm-lead', $post_type);

    $plugin_dir = plugin_dir_path(__FILE__);
    Patterns::register_block_patterns($plugin_dir, $post_type);
    Templates::register_block_templates($plugin_dir, $post_type);

    Model::$bridge = $bridge;
    Model::init($post_type);

    global $post;
    if (empty($post) || $post->post_type !== $post_type) return;

    $model = new Model($post);
    foreach ($remote_fields as $field) {
        add_shortcode('remote_field_' . $field, function () use ($model, $field) {
            $data = $model->get_data();
            if (!isset($data[$field])) return  '';
            return $data[$field];
        });
    }
});

add_action('rest_api_init', function () {
    $post_type = apply_filters('wpct_remote_cpt_post_type', 'remote-cpt');
    (new REST_Controller($post_type))->register_routes();
});

add_filter('wpct_dependencies_check', function ($dependencies) {
    $dependencies['Wpct Http Backend'] = '<a href="https://git.coopdevs.org/codeccoop/wp/wpct-http-backend/">Wpct Http Backend</a>';
    $dependencies['Wpct String Translation'] = '<a href="https://git.coopdevs.org/codeccoop/wp/wpct-string-translation/">Wpct String Translation</a>';
    return $dependencies;
});

add_action('plugins_loaded', function () {

    load_plugin_textdomain(
        'wpct-remote-cpt',
        false,
        dirname(plugin_dir_path(__FILE__)) . '/languages'
    );
}, 90);
