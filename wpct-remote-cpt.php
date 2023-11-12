<?php

/**
 * Plugin Name:     WPCT Remote CPT
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

define('WPCT_REMOTE_CPT_PLUGIN_PATH', plugin_dir_path(__FILE__));

require_once 'env.php';
require_once 'includes/model.php';
require_once 'includes/api.php';
require_once 'includes/templates.php';

// Plugin dependencies
add_filter('wpct_dependencies_check', function ($dependencies) {
    $dependencies['Wpct Odoo Connect'] = '<a href="https://git.coopdevs.org/coopdevs/website/wp/wp-plugins/wpct-odoo-connect">Wpct Odoo Connect</a>';
    return $dependencies;
});

function wpct_remote_cpt_activate()
{
    wpct_remote_cpt_register_post_type();
    flush_rewrite_rules();

    wpct_remote_cpt_register_templates();
}

function wpct_remote_cpt_deactivate()
{
    unregister_post_type(WPCT_REMOTE_CPT_POST_TYPE);
    flush_rewrite_rules();

    wpct_remote_cpt_unregister_templates();
}

register_activation_hook(__FILE__, 'wpct_remote_cpt_activate'); // 'wpct_remote_cpt_register_templates');
register_deactivation_hook(__FILE__, 'wpct_remote_cpt_deactivate'); // 'wpct_remote_cpt_unregister_templates');
