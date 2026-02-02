<?php

namespace POSTS_BRIDGE;

use WP_Error;
use PBAPI;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

require_once 'class-gsheets-post-bridge.php';
require_once 'hooks.php';

class GSheets_Addon extends Addon {

	/**
	 * Handles the addon name.
	 *
	 * @var string
	 */
	public const title = 'Google Sheets';

	/**
	 * Handles the addon's API name.
	 *
	 * @var string
	 */
	public const name = 'gsheets';

	/**
	 * Handles the addom's custom relation class.
	 *
	 * @var string
	 */
	public const bridge_class = '\POSTS_BRIDGE\GSheets_Post_Bridge';

	/**
	 * Performs a request against the backend to check the connexion status.
	 *
	 * @param string $backend Backend name.
	 *
	 * @return boolean
	 */
	public function ping( $backend ) {
		$bridge = new GSheets_Post_Bridge(
			array(
				'backend'  => $backend,
				'endpoint' => '/',
				'method'   => 'GET',
				'tab'      => 'foo',
			)
		);

		$backend = $bridge->backend;
		if ( ! $backend ) {
			return false;
		}

		$credential = $backend->credential;
		if ( ! $credential ) {
			return false;
		}

		$parsed = wp_parse_url( $backend->base_url );
		$host   = $parsed['host'] ?? '';

		if ( $host !== 'sheets.googleapis.com' ) {
			return false;
		}

		$access_token = $credential->get_access_token();
		return (bool) $access_token;
	}

	/**
	 * Performs a GET request against the backend endpoint and retrive the response data.
	 *
	 * @param string $endpoint Concatenation of spreadsheet ID and tab name.
	 * @param string $backend Backend name.
	 *
	 * @return array|WP_Error
	 */
	public function fetch( $endpoint, $backend ) {
		$backend = PBAPI::get_backend( $backend );
		if ( ! $backend ) {
			return new WP_Error( 'invalid_backend' );
		}

		$credential = $backend->credential;
		if ( ! $credential ) {
			return new WP_Error( 'invalid_credential' );
		}

		$access_token = $credential->get_access_token();
		if ( ! $access_token ) {
			return new WP_Error( 'invalid_credential' );
		}

		$response = http_bridge_get(
			'https://www.googleapis.com/drive/v3/files',
			array( 'q' => "mimeType = 'application/vnd.google-apps.spreadsheet'" ),
			array(
				'Authorization' => "Bearer {$access_token}",
				'Accept'        => 'application/json',
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return $response;
	}

	/**
	 * Performs an introspection of the backend endpoint and returns API fields
	 * and accepted content type.
	 *
	 * @param string $endpoint Concatenation of spreadsheet ID and tab name.
	 * @param string $backend Backend name.
	 *
	 * @return array List of fields and content type of the endpoint.
	 */
	public function get_endpoint_schema( $endpoint, $backend ) {
		$bridges = PBAPI::get_addon_bridges( self::name );
		foreach ( $bridges as $candidate ) {
			$data = $candidate->data();
			if ( ! $data ) {
				continue;
			}

			if (
				$data['endpoint'] === $endpoint &&
				$data['backend'] === $backend
			) {
				$bridge = $candidate;
			}
		}

		if ( ! isset( $bridge ) ) {
			return array();
		}

		$headers = $bridge->get_headers();

		if ( is_wp_error( $headers ) ) {
			return array();
		}

		$fields = array();
		foreach ( $headers as $header ) {
			$fields[] = array(
				'name'   => $header,
				'schema' => array( 'type' => 'string' ),
			);
		}

		return $fields;
	}
}

GSheets_Addon::setup();
