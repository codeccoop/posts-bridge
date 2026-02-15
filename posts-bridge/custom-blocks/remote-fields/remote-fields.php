<?php
/**
 * Remote Field custom block registration.
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

add_action( 'init', 'posts_bridge_remote_fields_block_init' );
function posts_bridge_remote_fields_block_init() {
	register_block_type( __DIR__ . '/build' );
}
