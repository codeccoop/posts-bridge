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
	 * Holds the Dolibarr's REST API swagger.json endpoint.
	 *
	 * @var string
	 */
	public const SWAGGER_ENDPOINT = '/api/index.php/explorer/swagger.json';

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
				'method'   => 'GET',
				'endpoint' => '/api/index.php/status',
				'backend'  => $backend,
			)
		);

		$response = $bridge->fetch();
		if ( is_wp_error( $response ) ) {
			Logger::log( 'Dolibarr backend ping error response', Logger::ERROR );
			Logger::log( $response, Logger::ERROR );
			return false;
		}

		$code = $response['data']['success']['code'] ?? null;

		if ( 200 !== $code ) {
			Logger::log( 'Dolibarr backend ping error response', Logger::ERROR );
			Logger::log( $response, Logger::ERROR );
			return false;
		}

		return true;
	}

	/**
	 * Performs an introspection of the backend endpoint and returns API fields
	 * and accepted content type.
	 *
	 * @param string      $endpoint API endpoint.
	 * @param string      $backend Backend name.
	 * @param string|null $method HTTP method.
	 *
	 * @return array
	 */
	public function get_endpoint_schema( $endpoint, $backend, $method = null ) {
		$bridge = new Dolibarr_Post_Bridge(
			array(
				'endpoint' => self::SWAGGER_ENDPOINT,
				'backend'  => $backend,
				'method'   => 'GET',
			)
		);

		$response = $bridge->fetch();

		if ( is_wp_error( $response ) ) {
			return array();
		}

		$version = $response['data']['swagger'] ?? null;
		if ( ! $version ) {
			return array();
		}

		$oa_explorer = new OpenAPI( $response['data'] );

		$path   = preg_replace( '/.*\/api\/index.php/', '', $endpoint );
		$method = strtolower( $method ?? 'post' );
		$params = $oa_explorer->params( $path, $method );
		if ( empty( $params ) ) {
			return array();
		}

		$response = $bridge->patch( array( 'endpoint' => $endpoint ) )
			->fetch( array( 'limit' => 1 ) );

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

	/**
	 * Performs an introspection of the backend API and returns a list of available endpoints.
	 *
	 * @param string      $backend Backend name.
	 * @param string|null $method HTTP method.
	 *
	 * @return array|WP_Error
	 */
	public function get_endpoints( $backend, $method = null ) {
		$bridge = new Dolibarr_Post_Bridge(
			array(
				'endpoint' => self::SWAGGER_ENDPOINT,
				'backend'  => $backend,
				'method'   => 'GET',
			)
		);

		$response = $bridge->fetch();

		if ( is_wp_error( $response ) ) {
			return array();
		}

		$version = $response['data']['swagger'] ?? null;
		if ( ! $version ) {
			return array();
		}

		$oa_explorer = new OpenAPI( $response['data'] );

		$paths = $oa_explorer->paths();

		if ( $method ) {
			$method       = strtolower( $method );
			$method_paths = array();

			foreach ( $paths as $path ) {
				$path_obj = $oa_explorer->path_obj( $path );

				if ( $path_obj && isset( $path_obj[ $method ] ) ) {
					$method_paths[] = $path;
				}
			}

			$paths = $method_paths;
		}

		return array_map(
			function ( $path ) {
				return '/api/index.php' . $path;
			},
			$paths,
		);
	}
}

Dolibarr_Addon::setup();
