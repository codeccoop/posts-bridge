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

		$schema['properties']['endpoint']['default'] =
			'/v4/spreadsheets/{spreadsheet_id}';
		$schema['properties']['backend']['default']  = 'Sheets API';
		$schema['properties']['method']['const']     = 'GET';

		$schema['properties']['tab'] = array(
			'description' => __( 'Name of the spreadsheet tab', 'posts-bridge' ),
			'type'        => 'string',
			'minLength'   => 1,
			'required'    => true,
			'default'     => 'Sheet1',
		);

		return $schema;
	},
	10,
	2
);

add_filter(
	'posts_bridge_template_defaults',
	function ( $defaults, $addon, $schema ) {
		if ( 'gsheets' !== $addon ) {
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
						'value' => 'Bearer',
					),
					array(
						'ref'   => '#credential',
						'name'  => 'oauth_url',
						'label' => __( 'Authorization URL', 'posts-bridge' ),
						'type'  => 'text',
						'value' => 'https://accounts.google.com/o/oauth2/v2',
					),
					array(
						'ref'      => '#credential',
						'name'     => 'client_id',
						'label'    => __( 'Client ID', 'posts-bridge' ),
						'type'     => 'text',
						'required' => true,
					),
					array(
						'ref'      => '#credential',
						'name'     => 'client_secret',
						'label'    => __( 'Client secret', 'posts-bridge' ),
						'type'     => 'text',
						'required' => true,
					),
					array(
						'ref'      => '#credential',
						'name'     => 'scope',
						'label'    => __( 'Scope', 'posts-bridge' ),
						'type'     => 'text',
						'value'    => 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets',
						'required' => true,
					),
					array(
						'ref'      => '#bridge',
						'name'     => 'endpoint',
						'label'    => __( 'Spreadsheet', 'posts-bridge' ),
						'type'     => 'select',
						'options'  => array(
							'endpoint' => '/drive/v3/files',
							'finger'   => array(
								'value' => 'files[].id',
								'label' => 'files[].name',
							),
						),
						'required' => true,
					),
					array(
						'ref'   => '#bridge',
						'name'  => 'method',
						'value' => 'POST',
					),
					array(
						'ref'     => '#bridge',
						'name'    => 'tab',
						'label'   => __( 'Tab', 'posts-bridge' ),
						'type'    => 'text',
						'default' => '',
					),
					array(
						'ref'     => '#backend',
						'name'    => 'name',
						'default' => 'Sheets API',
					),
					array(
						'ref'   => '#backend',
						'name'  => 'base_url',
						'value' => 'https://sheets.googleapis.com',
					),
				),
				'backend'    => array(
					'name'     => 'Sheets API',
					'base_url' => 'https://sheets.googleapis.com',
					'headers'  => array(
						array(
							'name'  => 'Accept',
							'value' => 'application/json',
						),
					),
				),
				'bridge'     => array(
					'backend'  => 'Sheets API',
					'endpoint' => '',
					'tab'      => '',
				),
				'credential' => array(
					'name'          => '',
					'schema'        => 'Bearer',
					'oauth_url'     => 'https://accounts.google.com/o/oauth2/v2',
					'scope'         => 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets',
					'client_id'     => '',
					'client_secret' => '',
					'access_token'  => '',
					'expires_at'    => 0,
					'refresh_token' => '',
				),
			),
			$defaults,
			$schema
		);
	},
	10,
	3
);

add_filter(
	'posts_bridge_template_data',
	function ( $data, $template_id ) {
		if ( 0 !== strpos( $template_id, 'gsheets-' ) ) {
			return $data;
		}

		$data['bridge']['endpoint'] = '/v4/spreadsheets/' . $data['bridge']['endpoint'];
		return $data;
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
