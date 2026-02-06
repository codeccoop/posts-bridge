<?php
/**
 * Class REST_Settings_Controller
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use PBAPI;
use WP_Error;
use WP_REST_Server;
use WPCT_PLUGIN\REST_Settings_Controller as Base_Controller;
use HTTP_BRIDGE\Backend;
use HTTP_BRIDGE\Credential;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Plugin REST API controller. Handles routes registration, permissions
 * and request callbacks.
 */
class REST_Settings_Controller extends Base_Controller {

	/**
	 * Inherits the parent initialized and register the post types route
	 */
	protected static function init() {
		parent::init();
		self::register_post_type_routes();
		self::register_schema_route();
		self::register_backend_routes();
	}

	/**
	 * Registers post type API routes.
	 */
	private static function register_post_type_routes() {
		$namespace = self::namespace();
		$version   = self::version();

		register_rest_route(
			"{$namespace}/v{$version}",
			'/post_types',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => static function () {
					return self::get_post_types();
				},
				'permission_callback' => array( self::class, 'permission_callback' ),
			)
		);

		register_rest_route(
			"{$namespace}/v{$version}",
			'/post_types/(?P<name>[a-zA-Z0-9-_]+)',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => static function ( $request ) {
						return self::get_post_type( $request );
					},
					'permission_callback' => array( self::class, 'permission_callback' ),
					'args'                => array(
						'name' => array(
							'description' => __( 'Custom post type key', 'posts-bridge' ),
							'type'        => 'string',
							'required'    => true,
						),
					),
				),
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => static function ( $request ) {
						return self::delete_post_type( $request );
					},
					'permission_callback' => array( self::class, 'permission_callback' ),
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => static function ( $request ) {
						return self::post_post_type( $request );
					},
					'permission_callback' => array( self::class, 'permission_callback' ),
					'args'                => array(
						'name' => array(
							'description' => __( 'Custom post type key', 'posts-bridge' ),
							'type'        => 'string',
							'required'    => true,
						),
						'args' => Custom_Post_Type::schema(),
					),
				),
			)
		);

		register_rest_route(
			"{$namespace}/v{$version}",
			'/post_types/(?P<name>[a-zA-Z0-9-_]+)/meta',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => static function ( $request ) {
						return self::get_post_type_meta( $request );
					},
					'permission_callback' => array( self::class, 'permission_callback' ),
					'args'                => array(
						'name' => array(
							'description' => __( 'Custom post type key', 'posts-bridge' ),
							'type'        => 'string',
							'required'    => true,
						),
					),
				),
			)
		);
	}

	/**
	 * Registers json schemas REST API routes.
	 */
	private static function register_schema_route() {
		foreach ( Addon::addons() as $addon ) {
			if ( ! $addon->enabled ) {
				continue;
			}

			$addon = $addon::NAME;
			register_rest_route(
				'posts-bridge/v1',
				"/{$addon}/schemas",
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => static function () use ( $addon ) {
						return self::addon_schemas( $addon );
					},
					'permission_callback' => array( self::class, 'permission_callback' ),
				)
			);
		}

		register_rest_route(
			'posts-bridge/v1',
			'/http/schemas',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => static function () {
					return self::http_schemas();
				},
				'permission_callback' => array( self::class, 'permission_callback' ),
			)
		);
	}

	/**
	 * Registers http backends REST API routes.
	 */
	private static function register_backend_routes() {
		foreach ( Addon::addons() as $addon ) {
			if ( ! $addon->enabled ) {
				continue;
			}

			$addon = $addon::NAME;

			register_rest_route(
				'posts-bridge/v1',
				"/{$addon}/backend/ping",
				array(
					array(
						'methods'             => WP_REST_Server::CREATABLE,
						'callback'            => static function ( $request ) use ( $addon ) {
							return self::ping_backend( $addon, $request );
						},
						'permission_callback' => array( self::class, 'permission_callback' ),
						'args'                => array(
							'backend'    => PBAPI::get_backend_schema(),
							'credential' => PBAPI::get_credential_schema(),
						),
					),
				)
			);

			register_rest_route(
				'posts-bridge/v1',
				"/{$addon}/backend/endpoints",
				array(
					array(
						'methods'             => WP_REST_Server::CREATABLE,
						'callback'            => static function ( $request ) use ( $addon ) {
							return self::get_backend_endpoints( $addon, $request );
						},
						'permission_callback' => array( self::class, 'permission_callback' ),
						'args'                => array(
							'backend' => PBAPI::get_backend_schema(),
							'method'  => array(
								'description' => __( 'HTTP method used to filter the list of endpoints', 'posts-bridge' ),
								'type'        => 'string',
							),
						),
					),
				),
			);

			register_rest_route(
				'posts-bridge/v1',
				"/{$addon}/backend/endpoint/schema",
				array(
					array(
						'methods'             => WP_REST_Server::CREATABLE,
						'callback'            => static function ( $request ) use ( $addon ) {
							return self::get_endpoint_schema( $addon, $request );
						},
						'permission_callback' => array( self::class, 'permission_callback' ),
						'args'                => array(
							'backend'  => PBAPI::get_backend_schema(),
							'endpoint' => array(
								'description' => __( 'Target endpoint name', 'posts-bridge' ),
								'type'        => 'string',
								'required'    => true,
							),
							'method'   => array(
								'description' => __( 'HTTP method', 'posts-bridge' ),
								'type'        => 'string',
							),
						),
					),
				)
			);
		}
	}

	/**
	 * Callback for GET requests to the post_types endpoint.
	 *
	 * @return array|WP_Error Post type data.
	 */
	private static function get_post_types() {
		return array_keys( PBAPI::get_custom_post_types() );
	}

	/**
	 * Callback for GET requests to the post_types endpoint.
	 *
	 * @param REST_Request $request Request instance.
	 *
	 * @return array|WP_Error Post type data.
	 */
	private static function get_post_type( $request ) {
		$key  = sanitize_key( $request['name'] );
		$data = PBAPI::get_custom_post_type( $key );

		if ( ! $data ) {
			return new WP_Error(
				'not_found',
				__( 'Custom post type is unkown', 'posts-bridge' ),
				array( 'post_type' => $key )
			);
		}

		$data['name'] = $key;
		return $data;
	}

	/**
	 * Callback for the GET request to the post meta endpoint.
	 *
	 * @param REST_Request $request Request object.
	 *
	 * @return array|WP_Error
	 */
	private static function get_post_type_meta( $request ) {
		$key = sanitize_key( $request['name'] );

		global $wp_meta_keys;
		$meta = $wp_meta_keys['post'][ $key ] ?? null;

		if ( ! $meta ) {
			return array();
		}

		$custom_fields = array();
		foreach ( $meta as $name => $defn ) {
			$custom_fields[] = array(
				'name'   => $name,
				'schema' => array(
					'type'    => $defn['type'],
					'default' => $defn['default'] ?? '',
				),
			);
		}

		return $custom_fields;
	}

	/**
	 * Callback for POST requests to the post types endpoint.
	 *
	 * @param REST_Request $request Request instance.
	 *
	 * @return array|WP_Error Registration result.
	 */
	private static function post_post_type( $request ) {
		$key = sanitize_key( $request['name'] );

		$data         = $request->get_json_params();
		$data['name'] = $key;

		$success = Custom_Post_Type::register( $data );

		if ( ! $success ) {
			return new WP_Error(
				'internal_server_error',
				__(
					'Posts Bridge can\'t register the post type',
					'posts-bridge'
				),
				array( 'args' => $data )
			);
		}

		flush_rewrite_rules();

		$data         = PBAPI::get_custom_post_type( $key );
		$data['name'] = $key;

		return $data;
	}

	/**
	 * Callback for DELETE requests to the post types endpoint.
	 *
	 * @param REST_Request $request Request instance.
	 *
	 * @return array|WP_Error Removal result.
	 */
	private static function delete_post_type( $request ) {
		$key     = sanitize_key( $request['name'] );
		$success = Custom_Post_Type::unregister( $key );

		if ( ! $success ) {
			return new WP_Error(
				'internal_server_error',
				__(
					'Posts Bridge can\'t unregister the post type',
					'posts-bridge'
				),
				array( 'post_type' => $key )
			);
		}

		return array( 'success' => true );
	}

	/**
	 * Performs a request validation and sanitization
	 *
	 * @param string          $addon Target addon name.
	 * @param WP_REST_Request $request Request instance.
	 *
	 * @return [Addon, string, string|null]|WP_Error
	 */
	private static function prepare_addon_backend_request_handler(
		$addon,
		$request
	) {
		$backend = wpct_plugin_sanitize_with_schema(
			$request['backend'],
			PBAPI::get_backend_schema()
		);

		if ( is_wp_error( $backend ) ) {
			return self::bad_request();
		}

		$credential = $request['credential'];
		if ( ! empty( $credential ) ) {
			$credential = wpct_plugin_sanitize_with_schema(
				$credential,
				PBAPI::get_credential_schema( $addon )
			);

			if ( is_wp_error( $credential ) ) {
				return self::bad_request();
			}

			$backend['credential'] = $credential['name'];
		}

		$addon = PBAPI::get_addon( $addon );
		if ( ! $addon ) {
			return self::bad_request();
		}

		Backend::temp_registration( $backend );
		Credential::temp_registration( $credential );

		return array( $addon, $backend['name'], $credential['name'] ?? null );
	}

	/**
	 * Callback to the backend ping endpoint.
	 *
	 * @param string          $addon Addon name.
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return array|WP_Error
	 */
	private static function ping_backend( $addon, $request ) {
		$handler = self::prepare_addon_backend_request_handler( $addon, $request );

		if ( is_wp_error( $handler ) ) {
			return $handler;
		}

		[$addon, $backend] = $handler;

		$result = $addon->ping( $backend );

		if ( is_wp_error( $result ) ) {
			$error = self::bad_request();
			$error->add(
				$result->get_error_code(),
				$result->get_error_message(),
				$result->get_error_data()
			);

			return $error;
		}

		return array( 'success' => $result );
	}

	/**
	 * Backend endpoints route callback.
	 *
	 * @param string          $addon Addon name.
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return array|WP_Error
	 */
	private static function get_backend_endpoints( $addon, $request ) {
		$handler = self::prepare_addon_backend_request_handler( $addon, $request );

		if ( is_wp_error( $handler ) ) {
			return $handler;
		}

		[$addon, $backend] = $handler;

		$endpoints = $addon->get_endpoints( $backend, $request['method'] );

		if ( is_wp_error( $endpoints ) ) {
			$error = self::internal_server_error();
			$error->add(
				$endpoints->get_error_code(),
				$endpoints->get_error_message(),
				$endpoints->get_error_data()
			);

			return $error;
		}

		return $endpoints;
	}

	/**
	 * Backend endpoint schema route callback.
	 *
	 * @param string          $addon Addon name.
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return array|WP_Error
	 */
	private static function get_endpoint_schema( $addon, $request ) {
		$handler = self::prepare_addon_backend_request_handler( $addon, $request );

		if ( is_wp_error( $handler ) ) {
			return $handler;
		}

		[$addon, $backend] = $handler;

		$schema = $addon->get_endpoint_schema( $request['endpoint'], $backend, $request['method'] );

		if ( is_wp_error( $schema ) ) {
			$error = self::internal_server_error();
			$error->add(
				$schema->get_error_code(),
				$schema->get_error_message(),
				$schema->get_error_data()
			);

			return $error;
		}

		return $schema;
	}

	/**
	 * Callback of the addon schemas endpoint.
	 *
	 * @param string $name Addon name.
	 *
	 * @return array
	 */
	private static function addon_schemas( $name ) {
		$bridge = PBAPI::get_bridge_schema( $name );
		return array( 'bridge' => $bridge );
	}

	/**
	 * Callback of the http schemas endpoint.
	 *
	 * @return array
	 */
	private static function http_schemas() {
		$backend    = PBAPI::get_backend_schema();
		$credential = PBAPI::get_credential_schema();
		return array(
			'backend'    => $backend,
			'credential' => $credential,
		);
	}
}
