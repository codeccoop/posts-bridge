<?php
/**
 * Dolibarr addon hooks
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

add_filter(
	'posts_bridge_bridge_schema',
	function ( $schema, $addon ) {
		if ( 'dolibarr' !== $addon ) {
			return $schema;
		}

		$schema['properties']['endpoint']['default']  = '/api/index.php/products';
		$schema['properties']['foreign_key']['const'] = 'id';
		$schema['properties']['method']['const']      = 'GET';

		return $schema;
	},
	10,
	2
);

add_filter(
	'posts_bridge_template_defaults',
	function ( $defaults, $addon, $schema ) {
		if ( 'dolibar' !== $addon ) {
			return $defaults;
		}

		return wpct_plugin_merge_object(
			array(
				'fields'  => array(
					array(
						'ref'     => '#backend',
						'name'    => 'name',
						'default' => 'Dolibarr',
					),
					array(
						'ref'      => '#backend/headers[]',
						'name'     => 'DOLAPIKEY',
						'label'    => __( 'API key', 'posts-bridge' ),
						'type'     => 'text',
						'required' => true,
					),
					array(
						'ref'   => '#bridge',
						'name'  => 'method',
						'value' => 'GET',
					),
					array(
						'ref'   => '#bridge',
						'name'  => 'foreign_key',
						'value' => 'id',
					),
				),
				'backend' => array(
					'name'    => 'Dolibarr',
					'headers' => array(
						array(
							'name'  => 'Accept',
							'value' => 'application/json',
						),
					),
				),
			),
			$defaults,
			$schema
		);
	},
	10,
	3
);
