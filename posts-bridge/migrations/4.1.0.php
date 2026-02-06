<?php
/**
 * Migration 4.1.0
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Migration 4.1.0.
 *
 * - Renames HTTP setting option on the database.
 */
function posts_bridge_migration_410() {
	$http = get_option( 'http-bridge_general', array() ) ?: array();
	update_option( 'posts-bridge_http', $http );
}

posts_bridge_migration_410();
