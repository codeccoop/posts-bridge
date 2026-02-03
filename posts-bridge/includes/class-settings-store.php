<?php
/**
 * Class Settings_Store
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use HTTP_BRIDGE\Http_Setting;
use WPCT_PLUGIN\Settings_Store as Base_Settings_Store;

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
	public const REST_CONTROLLER = '\POSTS_BRIDGE\REST_Settings_Controller';

	/**
	 * Inherits the parent constructor and sets up setting validation callbacks.
	 *
	 * @param mixed[] ...$args Array of constructor arguments.
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

		Http_Setting::register( $this );
	}
}
