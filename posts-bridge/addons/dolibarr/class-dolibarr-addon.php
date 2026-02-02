<?php
/**
 * Class Dolibarr_Addon
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

require_once 'class-dolibarr-post-bridge.php';
require_once 'hooks.php';

/**
 * Dolibarr Addon class.
 */
class Dolibarr_Addon extends Addon {

	/**
	 * Handles the addon name.
	 *
	 * @var string
	 */
	public const TITLE = 'Dolibarr';

	/**
	 * Handles the addon's API name.
	 *
	 * @var string
	 */
	public const NAME = 'dolibarr';

	/**
	 * Handles the addom's custom relation class.
	 *
	 * @var string
	 */
	public const BRIDGE = '\POSTS_BRIDGE\Dolibarr_Post_Bridge';

	/**
	 * Performs a request against the backend to check the connexion status.
	 *
	 * @param string $backend Target backend name.
	 *
	 * @return boolean
	 */
	public function ping( $backend ) {
		$bridge = new Dolibarr_Post_Bridge(
			array(
				'post_type'   => '_',
				'foreign_key' => 'id',
				'method'      => 'GET',
				'endpoint'    => '/api/index.php/status',
				'backend'     => $backend,
			)
		);

		$response = $bridge->fetch();
		return ! is_wp_error( $response );
	}

	/**
	 * Performs an introspection of the backend endpoint and returns API fields
	 * and accepted content type.
	 *
	 * @param string $endpoint API endpoint.
	 * @param string $backend Backend name.
	 *
	 * @return array
	 */
	public function get_endpoint_schema( $endpoint, $backend ) {
		$bridge = new Dolibarr_Post_Bridge(
			array(
				'endpoint' => $endpoint,
				'backend'  => $backend,
				'method'   => 'GET',
			)
		);

		$response = $bridge->fetch( array( 'limit' => 1 ) );

		if ( is_wp_error( $response ) ) {
			return array();
		}

		$entry = $response['data'][0] ?? null;
		if ( ! $entry ) {
			return array();
		}

		$fields = array();
		foreach ( $entry as $field => $value ) {
			if ( wp_is_numeric_array( $value ) ) {
				$type = 'array';
			} elseif ( is_array( $value ) ) {
				$type = 'object';
			} elseif ( is_double( $value ) ) {
				$type = 'number';
			} elseif ( is_int( $value ) ) {
				$type = 'integer';
			} else {
				$type = 'string';
			}

			$fields[] = array(
				'name'   => $field,
				'schema' => array( 'type' => $type ),
			);
		}

		return $fields;
	}
}

Dolibarr_Addon::setup();
