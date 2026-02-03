<?php
/**
 * Class Odoo_Addon
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

require_once 'class-odoo-post-bridge.php';
require_once 'hooks.php';

/**
 * Odoo Addon class.
 */
class Odoo_Addon extends Addon {

	/**
	 * Handles the addon name.
	 *
	 * @var string
	 */
	public const TITLE = 'Odoo';

	/**
	 * Handles the addon's API name.
	 *
	 * @var string
	 */
	public const NAME = 'odoo';

	/**
	 * Handles the addom's custom relation class.
	 *
	 * @var string
	 */
	public const BRIDGE = '\POSTS_BRIDGE\Odoo_Post_Bridge';

	/**
	 * Performs a request against the backend to check the connexion status.
	 *
	 * @param string $backend Target backend name.
	 *
	 * @return boolean
	 */
	public function ping( $backend ) {
		$bridge = new Odoo_Post_Bridge(
			array(
				'method'   => 'search',
				'endpoint' => 'res.users',
				'backend'  => $backend,
			)
		);

		$response = $bridge->fetch();

		if ( is_wp_error( $response ) ) {
			Logger::log( 'Odoo backend ping error response', Logger::ERROR );
			Logger::log( $response, Logger::ERROR );
			return false;
		}

		return true;
	}

	/**
	 * Performs a GET request against the backend model and retrive the response data.
	 *
	 * @param string $endpoint Target model name.
	 * @param string $backend Target backend name.
	 *
	 * @return array|WP_Error
	 */
	public function fetch( $endpoint, $backend ) {
		$bridge = new Odoo_Post_Bridge(
			array(
				'method'        => 'search_read',
				'endpoint'      => $endpoint,
				'backend'       => $backend,
				'field_mappers' => array(
					array(
						'name'    => 'id',
						'foreign' => 'id',
					),
					array(
						'name'    => 'name',
						'foreign' => 'name',
					),
				),
			)
		);

		return $bridge->request( $bridge->endpoint );
	}

	/**
	 * Fetch available models from the backend
	 *
	 * @param string      $backend Backend name.
	 * @param string|null $method RPC method.
	 *
	 * @return array
	 *
	 * @todo Implementar el endpoint de consulta de endpoints disponibles.
	 */
	public function get_endpoints( $backend, $method = null ) {
		$bridge = new Odoo_Post_Bridge(
			array(
				'method'        => 'search_read',
				'endpoint'      => 'ir.model',
				'backend'       => $backend,
				'field_mappers' => array(
					array(
						'name'    => 'model',
						'foreign' => 'model',
					),
					array(
						'name'    => 'name',
						'foreign' => 'name',
					),
				),
			)
		);

		$response = $bridge->request( $bridge->endpoint );

		if ( is_wp_error( $response ) ) {
			return array();
		}

		return array_map(
			function ( $model ) {
				return $model['model'];
			},
			$response['data']['result']
		);
	}

	/**
	 * Performs an introspection of the backend model and returns API fields
	 * and accepted content type.
	 *
	 * @param string $model Target model name.
	 * @param string $backend Target backend name.
	 * @param null   $method Ignored.
	 *
	 * @return array List of fields and content type of the model.
	 */
	public function get_endpoint_schema( $model, $backend, $method = null ) {
		$bridge = new Odoo_Post_Bridge(
			array(
				'method'   => 'fields_get',
				'endpoint' => $model,
				'backend'  => $backend,
			)
		);

		$response = $bridge->request( $model );

		if ( is_wp_error( $response ) ) {
			return array();
		}

		$fields = array();
		foreach ( $response['data']['result'] as $name => $spec ) {
			if ( $spec['readonly'] ) {
				continue;
			}

			if ( 'char' === $spec['type'] || 'html' === $spec['type'] ) {
				$schema = array( 'type' => 'string' );
			} elseif ( 'float' === $spec['type'] ) {
				$schema = array( 'type' => 'number' );
			} elseif (
				in_array(
					$spec['type'],
					array( 'one2many', 'many2one', 'many2many' ),
					true
				)
			) {
				$schema = array(
					'type'            => 'array',
					'items'           => array( array( 'type' => 'integer' ), array( 'type' => 'string' ) ),
					'additionalItems' => false,
				);
			} else {
				$schema = array( 'type' => $spec['type'] );
			}

			$schema['required'] = $spec['required'];

			$fields[] = array(
				'name'   => $name,
				'schema' => $schema,
			);
		}

		return $fields;
	}
}

Odoo_Addon::setup();
