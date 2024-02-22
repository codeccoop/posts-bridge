<?php
/**
 * Plugin Name:       Wpct RCPT Remote Field
 * Description:       Remote field custom block
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Còdec Cooperativa
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wpct-rcpt
 *
 * @package           wpct-rcpt-remote-field
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
add_action( 'init', 'wpct_ce_remote_field_block_init' );
function wpct_ce_remote_field_block_init() {
	register_block_type( __DIR__ . '/build' );
}
