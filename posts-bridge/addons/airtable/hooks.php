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
	'http_bridge_backends',
	function ( $backends ) {
		if ( PBAPI::get_addon( 'airtable' ) ) {
			$urls   = array_column( $backends, 'base_url' );
			$exists = array_search( 'https://api.airtable.com', $urls, true );

			if ( false === $exists ) {
				$backends[] = array(
					'name'     => 'Airtable API',
					'base_url' => 'https://api.airtable.com',
					'headers'  => array(
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
