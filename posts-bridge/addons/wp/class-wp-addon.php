<?php
/**
 * Class WP_Addon
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

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
		$bridge = new WP_Post_Bridge(
			array(
				'method'   => 'GET',
				'endpoint' => '/wp-json/wp/v2/posts',
				'backend'  => $backend,
			)
		);

		$response = $bridge->fetch( array( 'context' => 'edit' ) );
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
		return array(
			array(
				'name'   => 'id',
				'schema' => array( 'type' => 'integer' ),
			),
			array(
				'name'   => 'type',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'link',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'date',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'date_gmt',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'modified',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'modified_gmt',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'guid',
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'rendered' => array( 'type' => 'string' ),
						'raw'      => array( 'type' => 'string' ),
					),
				),
			),
			array(
				'name'   => 'slug',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'status',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'password',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'title',
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'rendered' => array( 'type' => 'string' ),
						'raw'      => array( 'type' => 'string' ),
					),
				),
			),
			array(
				'name'   => 'content',
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'rendered' => array( 'type' => 'string' ),
						'raw'      => array( 'type' => 'string' ),
					),
				),
			),
			array(
				'name'   => 'author',
				'schema' => array( 'type' => 'integer' ),
			),
			array(
				'name'   => 'excerpt',
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'rendered' => array( 'type' => 'string' ),
						'raw'      => array( 'type' => 'string' ),
					),
				),
			),
			array(
				'name'   => 'featured_media',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'comment_status',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'ping_status',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'format',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'meta',
				'schema' => array(
					'type'                  => 'object',
					'properties'            => array(),
					'additionalProperities' => true,
				),
			),
			array(
				'name'   => 'sticky',
				'schema' => array( 'type' => 'boolean' ),
			),
			array(
				'name'   => 'template',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'categories',
				'schema' => array(
					'type'  => 'array',
					'items' => array( 'type' => 'integer' ),
				),
			),
			array(
				'name'   => 'tags',
				'schema' => array(
					'type'  => 'array',
					'items' => array( 'type' => 'integer' ),
				),
			),
			array(
				'name'   => 'class_list',
				'schema' => array(
					'type'  => 'array',
					'items' => array( 'type' => 'string' ),
				),
			),
			array(
				'name'   => 'permalink_template',
				'schema' => array( 'type' => 'string' ),
			),
			array(
				'name'   => 'generated_slug',
				'schema' => array( 'type' => 'string' ),
			),
		);
	}
}

WP_Addon::setup();
