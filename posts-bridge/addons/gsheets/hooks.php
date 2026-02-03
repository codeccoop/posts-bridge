<?php
/**
 * Google Sheets addon hooks
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

add_filter(
	'posts_bridge_bridge_schema',
	function ( $schema, $addon ) {
		if ( 'gsheets' !== $addon ) {
			return $schema;
		}

		$schema['properties']['endpoint']['default']        = '/v4/spreadsheets/{spreadsheet_id}';
		$schema['properties']['single_endpoint']['title']   = _x( 'Tab', 'Google spreadsheets', 'posts-bridge' );
		$schema['properties']['single_endpoint']['default'] = 'Sheet1';

		$schema['properties']['backend']['default'] = 'Sheets API';
		$schema['properties']['method']['const']    = 'GET';

		return $schema;
	},
	10,
	2
);

add_filter(
	'http_bridge_oauth_url',
	function ( $url, $verb ) {
		if ( false === strpos( $url, 'accounts.google.com' ) ) {
			return $url;
		}

		if ( 'auth' === $verb ) {
			return $url;
		}

		return "https://oauth2.googleapis.com/{$verb}";
	},
	10,
	2
);
