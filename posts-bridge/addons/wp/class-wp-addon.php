<?php
/**
 * Class WP_Addon
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use PBAPI;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

require_once 'class-wp-post-bridge.php';
require_once 'hooks.php';

/**
 * WP Addon class.
 */
class WP_Addon extends Addon {

	/**
	 * Handles the addon name.
	 */
	public const TITLE = 'WP';

	/**
	 * Handles the addon's API name.
	 */
	public const NAME = 'wp';

	/**
	 * Handles the addon's custom bridge class.
	 */
	public const BRIDGE = '\POSTS_BRIDGE\WP_Post_Bridge';

	/**
	 * Performs a request against the backend to check the connexion status.
	 *
	 * @param string $backend Target backend name.
	 *
	 * @return boolean
	 */
	public function ping( $backend ) {
		$backend = PBAPI::get_backend( $backend );
		if ( ! $backend ) {
			Logger::log( 'WordPress bridge ping error: Backend is unknown', Logger::ERROR );
			return false;
		}

		$response = $backend->get( '/wp-json/wp-site-health/v1/tests/https-status' );
		if ( is_wp_error( $response ) ) {
			Logger::log( 'WordPress bridge ping error: Error response', Logger::ERROR );
			Logger::log( $response, Logger::ERROR );
			return false;
		}

		return true;
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
		$defaults = array( '/wp-json/wp/v2/posts', '/wp-json/wp/v2/pages' );

		$backend = PBAPI::get_backend( $backend );
		if ( ! $backend ) {
			Logger::log( 'WordPress bridge get endpoints error: Backend is unknown', Logger::ERROR );
			return $defaults;
		}

		$response = $backend->get( '/wp-json/wp/v2/types' );
		if ( is_wp_error( $response ) ) {
			Logger::log( 'WordPress bridge get endpoints error: Error response', Logger::ERROR );
			Logger::log( $response, Logger::ERROR );
			return $defaults;
		}

		$endpoints = array();
		foreach ( $response['data'] as $type => $schema ) {
			if ( in_array( $type, Custom_Post_Type::INTERNAL_TYPES, true ) ) {
				continue;
			}

			$endpoints[] = '/wp-json/' . $schema['rest_namespace'] . '/' . $schema['rest_base'];
		}

		return $endpoints;
	}

	/**
	 * Performs an introspection of the backend endpoint and returns API fields
	 * and accepted content type.
	 *
	 * @param string $endpoint API endpoint.
	 * @param string $backend Backend name.
	 * @param string $method HTTP method.
	 *
	 * @return array
	 */
	public function get_endpoint_schema( $endpoint, $backend, $method = 'GET' ) {
		$chunks = array_slice( explode( '/', $endpoint ), 2 );
		if ( 2 >= count( $chunks ) ) {
			return array();
		}

		$endpoint  = rtrim( $endpoint, '/' );
		$endpoints = $this->get_endpoints( $backend );

		if ( ! in_array( $endpoint, $endpoints, true ) ) {
			return array();
		}

		$namespace = implode( '/', array_slice( $chunks, 0, 2 ) );

		$backend = PBAPI::get_backend( $backend );
		if ( ! $backend ) {
			return array();
		}

		$response = $backend->get( '/wp-json/' . $namespace );
		if ( is_wp_error( $response ) ) {
			return array();
		}

		$fields = array();
		foreach ( $response['data']['routes'] as $route => $schema ) {
			if ( ! preg_match( '#^/wp-json' . $route . '$#', $endpoint ) ) {
				continue;
			}

			$method_is_allowed = false;

			foreach ( $schema['endpoints'] as $candidate ) {
				if ( ! $method_is_allowed && in_array( 'GET', $candidate['methods'], true ) ) {
					$method_is_allowed = true;
				}

				if ( ! isset( $endpoint_schema ) && in_array( 'POST', $candidate['methods'], true ) ) {
					$endpoint_schema = $candidate;
				}

				if ( $method_is_allowed && isset( $endpoint_schema ) ) {
					break;
				}
			}

			if ( ! $method_is_allowed ) {
				continue;
			}

			if ( isset( $endpoint_schema ) ) {
				foreach ( $endpoint_schema['args'] as $name => $arg_schema ) {
					$fields[] = array(
						'name'   => $name,
						'schema' => $arg_schema,
					);
				}
				break;
			}
		}

		return $fields;
	}
}

WP_Addon::setup();
