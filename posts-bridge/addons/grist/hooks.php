<?php
/**
 * Grist addon hooks
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

add_filter(
	'posts_bridge_bridge_schema',
	function ( $schema, $addon ) {
		if ( 'grist' !== $addon ) {
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
	'http_bridge_backends',
	function ( $backends ) {
		if ( PBAPI::get_addon( 'grist' ) ) {
			$urls   = array_column( $backends, 'base_url' );
			$exists = array_search( 'https://docs.getgrist.com', $urls, true );

			if ( false === $exists ) {
				$backends[] = array(
					'name'       => 'Grist API',
					'base_url'   => 'https://docs.getgrist.com',
					'credential' => 'Grist API key',
					'headers'    => array(
						array(
							'name'  => 'Content-Type',
							'value' => 'application/json',
						),
					),
				);
			}
		}

		return $backends;
	},
	20,
	1,
);

add_filter(
	'http_bridge_credentials',
	function ( $credentials ) {
		if ( PBAPI::get_addon( 'grist' ) ) {
			$schemas = array_column( $credentials, 'schema' );
			$exists  = array_search( 'Bearer', $schemas, true );

			if ( false === $exists ) {
				$credentials[] = array(
					'name'         => 'Grist API key',
					'schema'       => 'Bearer',
					'access_token' => 'your-api-key',
					'expires_at'   => time() + 60 * 60 * 24 * 365 * 100,
				);
			}
		}

		return $credentials;
	},
	20,
	1
);
