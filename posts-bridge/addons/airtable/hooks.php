<?php
/**
 * Airtable addon hooks
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

add_filter(
	'posts_bridge_bridge_schema',
	function ( $schema, $addon ) {
		if ( 'airtable' !== $addon ) {
			return $schema;
		}

		$schema['properties']['foreign_key']['const']     = 'id';
		$schema['properties']['endpoint']['default']      = '/v0/{baseId}/{tableName}/records';
		$schema['properties']['single_endpoint']['const'] = '/v0/{baseId}/{tableName}/records';
		$schema['properties']['backend']['default']       = 'Airtable API';
		$schema['properties']['method']['const']          = 'GET';

		return $schema;
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

		if ( ! PBAPI::get_addon( 'airtable' ) ) {
			return $data;
		}

		$backends = $data['backends'] ?? array();

		$urls   = array_column( $backends, 'base_url' );
		$exists = array_search( 'https://api.airtable.com', $urls, true );

		if ( false === $exists ) {
			$name  = 'Airtable API';
			$names = array_column( $backends, 'base_url' );

			if ( ! in_array( $name, $names, true ) ) {
				$backends[] = array(
					'name'       => $name,
					'base_url'   => 'https://api.airtable.com',
					'credential' => 'Airtable Token',
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

		if ( ! PBAPI::get_addon( 'airtable' ) ) {
			return $data;
		}

		$credentials = $data['credentials'] ?? array();

		$schemas = array_column( $credentials, 'schema' );
		$exists  = array_search( 'Bearer', $schemas, true );

		if ( false === $exists ) {
			$name  = 'Airtable Token';
			$names = array_column( $credentials, 'Airtable Token' );

			if ( ! in_array( $name, $names, true ) ) {
				$credentials[] = array(
					'name'         => $name,
					'schema'       => 'Bearer',
					'access_token' => 'your-api-key',
					'expires_at'   => time() + 60 * 60 * 24 * 365 * 100,
				);

				$data['credentials'] = $credentials;
			}
		}

		return $data;
	},
	20,
	1
);
