<?php
/**
 * Google Calendar addon hooks
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

add_filter(
	'posts_bridge_bridge_schema',
	function ( $schema, $addon ) {
		if ( 'gcalendar' !== $addon ) {
			return $schema;
		}

		$schema['properties']['foreign_key']['const']     = 'id';
		$schema['properties']['endpoint']['default']      = '/calendars/v3/calendar/{calendarId}/events';
		$schema['properties']['single_endpoint']['const'] = '/calendars/v3/calendar/{calendarId}/events/{id}';
		$schema['properties']['backend']['default']       = 'Google API';
		$schema['properties']['method']['const']          = 'GET';

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

add_filter(
	'option_posts-bridge_http',
	function ( $data ) {
		if ( ! is_array( $data ) ) {
			return $data;
		}

		if ( ! PBAPI::get_addon( 'gcalendar' ) ) {
			return $data;
		}

		$backends = $data['backends'] ?? array();

		$urls   = array_column( $backends, 'base_url' );
		$exists = array_search( 'https://www.googleapis.com', $urls, true );

		if ( false === $exists ) {
			$name  = 'Google API';
			$names = array_column( $backends, 'name' );

			if ( ! in_array( $name, $names, true ) ) {
				$backends[] = array(
					'name'       => $name,
					'base_url'   => 'https://www.googleapis.com',
					'credential' => 'Google OAuth Client',
					'headers'    => array(
						array(
							'name'  => 'Content-Type',
							'value' => 'application/json',
						),
					),
				);

				$data['backends'] = $backends;
			}
		}

		return $data;
	},
	20,
	1,
);

add_filter(
	'option_posts-bridge_http',
	function ( $data ) {
		if ( ! is_array( $data ) ) {
			return $data;
		}

		if ( ! PBAPI::get_addon( 'gcalendar' ) ) {
			return $data;
		}

		$credentials = $data['credentials'] ?? array();

		foreach ( $credentials as $candidate ) {
			if ( 'OAuth' === $candidate['schema'] ) {
				if ( 'https://accounts.google.com/o/oauth2/v2' === $candidate['oauth_url'] ) {
					$credential = $candidate;
				}
			}
		}

		if ( ! isset( $credential ) ) {
			$name  = 'Google OAuth Client';
			$names = array_column( $credentials, 'name' );

			if ( ! in_array( $name, $names, true ) ) {
				$credentials[] = array(
					'name'          => $name,
					'schema'        => 'OAuth',
					'client_id'     => 'your-google-client-id',
					'client_secret' => 'your-google-client-secret',
					'oauth_url'     => 'https://accounts.google.com/o/oauth2/v2',
					'scope'         => 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets',
					'access_token'  => '',
					'expires_at'    => 0,
				);

				$data['credentials'] = $credentials;
			}
		}

		return $data;
	},
	20,
	1
);
