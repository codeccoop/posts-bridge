<?php
/**
 * WordPress addon hooks
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

add_filter(
	'posts_bridge_bridge_schema',
	function ( $schema, $addon ) {
		if ( 'wp' !== $addon ) {
			return $schema;
		}

		$schema['properties']['endpoint']['default']  = '/wp-json/wp/v2/posts';
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
		if ( 'wp' !== $addon ) {
			return $defaults;
		}

		return wpct_plugin_merge_object(
			array(
				'fields'     => array(
					array(
						'ref'      => '#credential',
						'name'     => 'name',
						'label'    => __( 'Name', 'posts-bridge' ),
						'type'     => 'text',
						'required' => true,
					),
					array(
						'ref'   => '#credential',
						'name'  => 'schema',
						'type'  => 'text',
						'value' => 'Basic',
					),
					array(
						'ref'         => '#credential',
						'name'        => 'client_id',
						'label'       => __( 'User login', 'posts-bridge' ),
						'description' => __(
							'User name or email',
							'posts-bridge'
						),
						'type'        => 'text',
						'required'    => true,
					),
					array(
						'ref'         => '#credential',
						'name'        => 'client_secret',
						'description' => __(
							'Application password',
							'posts-bridge'
						),
						'label'       => __( 'Password', 'posts-bridge' ),
						'type'        => 'text',
						'required'    => true,
					),
					array(
						'ref'     => '#backend',
						'name'    => 'name',
						'default' => 'WP',
					),
					array(
						'ref'   => '#bridge',
						'name'  => 'foreign_key',
						'value' => 'id',
					),
					array(
						'ref'   => '#bridge',
						'name'  => 'method',
						'label' => __( 'Method', 'posts-bridge' ),
						'type'  => 'text',
						'value' => 'GET',
					),
				),
				'bridge'     => array(
					'foreign_key' => 'id',
					'backend'     => 'WP',
					'endpoint'    => '',
					'method'      => 'GET',
				),
				'backend'    => array(
					'name'    => 'WP',
					'headers' => array(
						array(
							'name'  => 'Accept',
							'value' => 'application/json',
						),
					),
				),
				'credential' => array(
					'name'          => '',
					'schema'        => 'Basic',
					'client_id'     => '',
					'client_secret' => '',
				),
			),
			$defaults,
			$schema
		);
	},
	10,
	3
);
