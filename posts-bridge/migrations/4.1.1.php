<?php
/**
 * Migration 4.1.1
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
function posts_bridge_migration_411() {
	$general = get_option( 'posts-bridge_general', array() ) ?: array();

	if ( ! isset( $general['synchronization']['recurrence'] ) ) {
		return;
	}

	switch ( $general['synchronization']['recurrence'] ) {
		case 'minutly':
			$general['synchronization']['recurrence'] = 'every_minute';
			break;
		case 'quarterly':
			$general['synchronization']['recurrence'] = 'pb-quarterly';
			break;
		case 'twicehourly':
			$general['synchronization']['recurrence'] = 'pb-twicehourly';
			break;
		case 'twicedaily':
			$general['synchronization']['recurrence'] = 'pb-twicedaily';
			break;
	}

	update_option( 'posts-bridge_general', $general, false );

	$queue_map      = get_option( '_posts_bridge_detach_queue', array() ) ?: array();
	$detached_queue = array();
	foreach ( $queue_map as $post_type => $foreign_ids ) {
		$detached_queue[] = array(
			'post_type'   => $post_type,
			'foreign_ids' => $foreign_ids,
		);
	}

	update_option( '_posts_bridge_detach_queue', $detached_queue, false );
}

posts_bridge_migration_411();
