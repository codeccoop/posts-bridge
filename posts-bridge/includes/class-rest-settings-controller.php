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
		self::register_post_type_route();
		self::register_schema_route();
		self::register_template_routes();
		self::register_backend_routes();
	}

	/**
	 * Registers post type API routes.
	 */
	private static function register_post_type_route() {
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
				'permission_callback' => static function () {
					return self::permission_callback();
				},
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
					'permission_callback' => static function () {
						return self::permission_callback();
					},
					'args'                => array(
						'name' => array(
							'description' => __(
								'Custom post type key',
								'posts-bridge'
							),
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
					'permission_callback' => static function () {
						return self::permission_callback();
					},
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => static function ( $request ) {
						return self::post_post_type( $request );
					},
					'permission_callback' => static function () {
						return self::permission_callback();
					},
					'args'                => array(
						'name' => array(
							'description' => __(
								'Custom post type key',
								'posts-bridge'
							),
							'type'        => 'string',
							'required'    => true,
						),
						'args' => Custom_Post_Type::schema(),
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
	 * Registers templates REST API routes.
	 */
	private static function register_template_routes() {
		foreach ( Addon::addons() as $addon ) {
			if ( ! $addon->enabled ) {
				continue;
			}

			$addon = $addon::NAME;

			$schema = Post_Bridge_Template::schema( $addon );
			$args   = array();

			foreach ( $schema['properties'] as $name => $prop_schema ) {
				$args[ $name ]             = $prop_schema;
				$args[ $name ]['required'] = in_array(
					$name,
					$schema['required'],
					true
				);
			}

			register_rest_route(
				'posts-bridge/v1',
				"/{$addon}/templates/(?P<name>[a-zA-Z0-9-_]+)",
				array(
					array(
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => static function ( $request ) use ( $addon ) {
							return self::get_template( $addon, $request );
						},
						'permission_callback' => array(
							self::class,
							'permission_callback',
						),
						'args'                => array(
							'name' => $args['name'],
						),
					),
				)
			);

			register_rest_route(
				'posts-bridge/v1',
				"/{$addon}/templates/(?P<name>[a-zA-Z0-9-_]+)/use",
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => static function ( $request ) use ( $addon ) {
						return self::use_template( $addon, $request );
					},
					'permission_callback' => array(
						self::class,
						'permission_callback',
					),
					'args'                => array(
						'name'   => $args['name'],
						'fields' => $args['fields'],
					),
				)
			);

			register_rest_route(
				'posts-bridge/v1',
				"/{$addon}/templates/(?P<name>[a-zA-Z0-9-_]+)/options",
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => static function ( $request ) use ( $addon ) {
						return self::get_template_options( $addon, $request );
					},
					'permission_callback' => array(
						self::class,
						'permission_callback',
					),
					'args'                => array(
						'name'       => $args['name'],
						'backend'    => PBAPI::get_backend_schema(),
						'credential' => PBAPI::get_credential_schema(),
					),
				)
			);
		}
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
						'permission_callback' => array(
							self::class,
							'permission_callback',
						),
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
							'backend' => FBAPI::get_backend_schema(),
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
						'permission_callback' => array(
							self::class,
							'permission_callback',
						),
						'args'                => array(
							'backend'  => PBAPI::get_backend_schema(),
							'endpoint' => array(
								'description' => __(
									'Target endpoint name',
									'posts-bridge'
								),
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
	 * Callback for POST requests to the post types endpoint.
	 *
	 * @param REST_Request $request Request instance.
	 *
	 * @return array|WP_Error Template use result.
	 */
	private static function post_post_type( $request ) {
		$key = sanitize_key( $request['name'] );

		$data         = $request->get_json_params();
		$data['name'] = $key;

		$success = Custom_Post_Type::register( $data );

		if ( ! $success ) {
			return new WP_Error(
				'register_error',
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
	 * @return array|WP_Error Template use result.
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
		$handler = self::prepare_addon_backend_request_handler(
			$addon,
			$request
		);

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
		$handler = self::prepare_addon_backend_request_handler(
			$addon,
			$request
		);
		if ( is_wp_error( $handler ) ) {
			return $handler;
		}

		[$addon, $backend] = $handler;

		$schema = $addon->get_endpoint_schema( $request['endpoint'], $backend );

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

	/**
	 * Callback for GET requests to the templates endpoint.
	 *
	 * @param string          $addon Addon name.
	 * @param WP_REST_Request $request REST request object.
	 *
	 * @return array|WP_Error Template data.
	 */
	private static function get_template( $addon, $request ) {
		$template = PBAPI::get_template( $request['name'], $addon );
		if ( empty( $template ) ) {
			return self::not_found(
				__( 'Template is unknown', 'posts-bridge' ),
				array(
					'name'  => $request['name'],
					'addon' => $addon,
				)
			);
		}

		return $template->data();
	}

	/**
	 * Callback for POST requests to the templates endpoint.
	 *
	 * @param string       $addon Name of the owner addon of the template.
	 * @param REST_Request $request REST request object.
	 *
	 * @return array|WP_Error Template use result.
	 */
	private static function use_template( $addon, $request ) {
		$name   = $request['name'];
		$fields = $request['fields'];

		$template = PBAPI::get_template( $name, $addon );
		if ( empty( $template ) ) {
			return self::not_found();
		}

		$result = $template->use( $fields );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return array( 'success' => true === $result );
	}

	/**
	 * Callback to the fetch template options endpoint. It searches for template
	 * fields with dynamic options and fetch its values from the backend.
	 *
	 * @param Addon           $addon Addon instance.
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return array|WP_Error
	 */
	private static function get_template_options( $addon, $request ) {
		$handler = self::prepare_addon_backend_request_handler(
			$addon,
			$request
		);

		if ( is_wp_error( $handler ) ) {
			return $handler;
		}

		[$addon, $backend] = $handler;

		$template = PBAPI::get_template( $request['name'], $addon::name );
		if ( ! $template ) {
			Logger::log( 'Template not found', Logger::ERROR );
			return self::not_found();
		}

		if ( ! $template->is_valid ) {
			Logger::log( 'Invalid template', Logger::ERROR );
			return self::bad_request();
		}

		$field_options = array();
		$fields        = $template->fields;
		foreach ( $fields as $field ) {
			$endpoint = $field['options']['endpoint'] ?? null;
			if ( $endpoint ) {
				if ( is_string( $field['options']['finger'] ) ) {
					$finger = array(
						'value' => $field['options']['finger'],
					);
				} else {
					$finger = $field['options']['finger'];
				}

				$value_pointer = $finger['value'];

				if ( ! JSON_Finger::validate( $value_pointer ) ) {
					Logger::log( 'Fetch template options error: Invalid value json pointer', Logger::ERROR );
					return self::internal_server_error();
				}

				$label_pointer = $finger['label'] ?? $finger['value'];

				if ( ! JSON_Finger::validate( $label_pointer ) ) {
					Logger::log( 'Fetch template options error: Invalid label json pointer', Logger::ERROR );
					return self::internal_server_error();
				}

				$response = $addon->fetch( $endpoint, $backend );

				if ( is_wp_error( $response ) ) {
					$error = self::internal_server_error();
					$error->add(
						$response->get_error_code(),
						$response->get_error_message(),
						$response->get_error_data()
					);

					Logger::log( 'Fetch template options error response', Logger::ERROR );
					Logger::log( $error, Logger::ERROR );

					return $error;
				}

				$options = array();
				$data    = $response['data'];

				$json_finger = new JSON_Finger( $data );

				$values = $json_finger->get( $value_pointer );

				if ( ! wp_is_numeric_array( $values ) ) {
					Logger::log( 'Not found template options error response', Logger::ERROR );
					Logger::log( $response, Logger::ERROR );
					return self::not_found();
				}

				foreach ( $values as $value ) {
					$options[] = array(
						'value' => $value,
						'label' => $value,
					);
				}

				$labels = $json_finger->get( $label_pointer );
				if (
					wp_is_numeric_array( $labels ) &&
					count( $labels ) === count( $values )
				) {
					$l = count( $labels );
					for ( $i = 0; $i < $l; $i++ ) {
						$options[ $i ]['label'] = $labels[ $i ];
					}
				}

				$field_options[] = array(
					'ref'     => $field['ref'],
					'name'    => $field['name'],
					'options' => $options,
				);
			}
		}

		return $field_options;
	}
}
