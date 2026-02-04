<?php
/**
 * Holded addon hooks
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

add_filter(
	'posts_bridge_bridge_schema',
	function ( $schema, $addon ) {
		if ( 'holded' !== $addon ) {
			return $schema;
		}

		$schema['properties']['endpoint']['default']      = '/api/invoicing/v1/contacts';
		$schema['properties']['single_endpoint']['const'] = '/api/invoicing/v1/contacts/{id}';
		$schema['properties']['foreign_key']['const']     = 'id';
		$schema['properties']['backend']['default']       = 'Holded API';
		$schema['properties']['method']['const']          = 'GET';

		return $schema;
	},
	10,
	2
);

add_filter(
	'http_bridge_backends',
	function ( $backends ) {
		if ( PBAPI::get_addon( 'holded' ) ) {
			$urls   = array_column( $backends, 'base_url' );
			$exists = array_search( 'https://api.holded.com', $urls, true );

			if ( false === $exists ) {
				$name  = 'Holded API';
				$names = array_column( $backends, 'name' );

				if ( ! in_array( $name, $names, true ) ) {
					$backends[] = array(
						'name'     => $name,
						'base_url' => 'https://api.holded.com',
						'headers'  => array(
							array(
								'name'  => 'Content-Type',
								'value' => 'application/json',
							),
							array(
								'name'  => 'key',
								'value' => 'your-holded-api-key',
							),
						),
					);
				}
			}
		}

		return $backends;
	},
	20,
	1
);
