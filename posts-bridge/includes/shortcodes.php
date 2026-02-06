<?php
/**
 * Plugin shortcodes
 *
 * @package postsbridge
 */

use Posts_Bridge\Logger;

add_action(
	'init',
	function () {
		// Skip registration if on admin.
		if ( is_admin() ) {
			return;
		}

		add_shortcode( 'posts_bridge_remote_fields', 'posts_bridge_remote_fields' );
		add_shortcode( 'posts_bridge_remote_callback', 'posts_bridge_remote_callback' );
	},
	10,
	0
);

/**
 * Do the `posts_bridge_remote_fields` shortcode fetching remote data of the current Remote CPT
 *
 * @param array  $atts Shortcode attributes.
 * @param string $content Shortcode content.
 *
 * @return string $html Rendered output.
 */
function posts_bridge_remote_fields( $atts, $content = '' ) {
	global $posts_bridge_remote_cpt;

	// Exit if global post is not Remote CPT.
	if ( empty( $posts_bridge_remote_cpt ) ) {
		Logger::log( 'Skip remote fields render for non remote post types', Logger::DEBUG );
		return $content;
	}

	// Gets replacement marks and exit if not found.
	preg_match_all( '/{{([^}]+)}}/', $content, $matches );
	if ( empty( $matches ) ) {
		Logger::log( 'No replace marks found on remote fields shortcode content', Logger::DEBUG );
		return $content;
	}

	// Filters empty replace marks and trim its content.
	$fields = array();
	foreach ( $matches[1] as $match ) {
		$field = trim( $match );
		if ( $field ) {
			$fields[] = $field;
		}
	}

	// Exit if no fields is defined.
	if ( empty( $fields ) ) {
		Logger::log( 'Replace marks not matches any remote field', Logger::DEBUG );
		return $content;
	}

	// Checks if there are values for the fields and exits if it isn't.
	$values = array();
	foreach ( $fields as $field ) {
		$value = $posts_bridge_remote_cpt->get( $field );
		if ( null !== $value ) {
			$values[] = $value;
		}
	}

	if ( empty( $values ) ) {
		return $content;
	}

	try {
		// Replace anchors on the shortcode content with values.
		$l = count( $fields );
		for ( $i = 0; $i < $l; $i++ ) {
			$field   = $fields[ $i ];
			$value   = (string) $values[ $i ];
			$content = preg_replace( '/{{' . preg_quote( $field, '/' ) . '}}/', $value, $content );
		}

		return wp_kses_post( $content );
	} catch ( ValueError $e ) {
		Logger::log( 'Remote fields render error: ' . $e->getMessage(), Logger::ERROR );
		return $e->getMessage();
	}
}

/**
 * Do the `posts_bridge_remote_callback` shortcode ussing the current remote cpt as the first param.
 * This shortcode pass control of the fetch process to the user's function.
 *
 * @param array  $atts Shortcode's attributes.
 * @param string $content Shortcode's content.
 *
 * @return string $html Rendered output.
 */
function posts_bridge_remote_callback( $atts, $content = '' ) {
	global $posts_bridge_remote_cpt;

	// Exit if global post is not Remote CPT.
	if ( empty( $posts_bridge_remote_cpt ) ) {
		Logger::log( 'Skip remote callback for non remote post types', Logger::DEBUG );
		return $content;
	} else {
		$rcpt = $posts_bridge_remote_cpt;
	}

	$callback = $atts['fn'] ?? null;

	if ( empty( $callback ) ) {
		return $content;
	} else {
		unset( $atts['fn'] );
	}

	if ( ! function_exists( $callback ) ) {
		Logger::log( "Remote callback {$callback} does not exists", Logger::DEBUG );
		return $content;
	}

	$render = $callback( $rcpt, $atts, $content );

	if ( empty( $render ) ) {
		Logger::log( 'Remote callback returns an empty rendered content', Logger::DEBUG );
		return $content;
	}

	return wp_kses_post( $render );
}
