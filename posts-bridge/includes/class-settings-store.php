<?php

namespace POSTS_BRIDGE;

use WPCT_PLUGIN\Settings_Store as Base_Settings_Store;
use HTTP_BRIDGE\Settings_Store as Http_Store;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Plugin settings.
 */
class Settings_Store extends Base_Settings_Store {

	/**
	 * Handles the plugin's settings rest controller class name.
	 *
	 * @var string REST Settings Controller class name.
	 */
	protected const rest_controller_class = '\POSTS_BRIDGE\REST_Settings_Controller';

	/**
	 * Inherits the parent constructor and sets up setting validation callbacks.
	 */
	protected function construct( ...$args ) {
		parent::construct( ...$args );

		self::register_setting(
			array(
				'name'       => 'general',
				'properties' => array(
					'synchronize' => array(
						'type'                 => 'object',
						'additionalProperties' => false,
						'properties'           => array(
							'enabled'    => array( 'type' => 'boolean' ),
							'recurrence' => array(
								'type' => 'string',
								'enum' => array(
									'minutly',
									'quarterly',
									'twicehourly',
									'hourly',
									'twicedaily',
									'daily',
									'weekly',
								),
							),
						),
						'required'             => array( 'enabled', 'recurrence' ),
					),
				),
				'required'   => array( 'synchronize' ),
				'default'    => array(
					'synchronize' => array(
						'enabled'    => false,
						'recurrence' => 'hourly',
					),
				),
			)
		);

		self::register_setting(
			array(
				'name'       => 'http',
				'properties' => array(),
				'default'    => array(),
			)
		);

		self::ready(
			function ( $store ) {
				$store::use_getter(
					'http',
					static function () {
						$setting = Http_Store::setting( 'general' );
						return $setting->data();
					}
				);

				$store::use_setter(
					'http',
					function ( $data ) {
						if (
							isset( $data['backends'] ) &&
							isset( $data['credentials'] )
						) {
							$setting = Http_Store::setting( 'general' );
							$setting->update( $data );
						}

						return array();
					},
					9
				);

				$store::use_cleaner(
					'general',
					static function () {
						$setting = Http_Store::setting( 'general' );
						$setting->update(
							array(
								'backends'    => array(),
								'credentials' => array(),
							)
						);
					}
				);
			}
		);
	}
}
