<?php

namespace POSTS_BRIDGE;

use Error;
use PBAPI;
use WP_Error;
use WP_REST_Posts_Controller;
use WP_REST_Post_Meta_Fields;
use WP_REST_Server;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * REST API Controller for remote posts.
 */
class REST_Remote_Posts_Controller extends WP_REST_Posts_Controller {

	/**
	 * Handle alias for id field on rest payloads that prevents collisions with WP schema.
	 *
	 * @var string $rest_id_alias Alias name.
	 */
	private const REST_ALIAS_PREFIX = '_posts_bridge_rest_';

	/**
	 * Handle the controlled post type.
	 *
	 * @var string $post_type Post type slug.
	 */
	protected $post_type;

	/**
	 * Handle the controller WP_REST_Post_Meta_Fields instance.
	 *
	 * @var WP_REST_Post_Meta_Fields $meta WP_REST_Post_Meta_Fields instance.
	 */
	protected $meta;

	/**
	 * Handle the controller endpoint base path.
	 *
	 * @var string $rest_base Controller's endpoint base path.
	 */
	protected $rest_base;

	/**
	 * Handle the controller endpoints namespace.
	 *
	 * @var string $namespace REST API namespace.
	 */
	protected $namespace = 'posts-bridge/v1';

	/**
	 * Binds the controlled post type, setup the rest_base, registers the
	 * WP_REST_Post_Meta_Fields controller and registers the REST API routes.
	 *
	 * @param string $post_type Post type to be handled.
	 */
	public function __construct( $post_type ) {
		$this->post_type = $post_type;
		$this->rest_base = get_post_type_object( $post_type )->rest_base ?? $post_type;
		$this->meta      = new WP_REST_Post_Meta_Fields( $this->post_type );
		$this->register_routes();
		$this->register_custom_routes();

		add_filter(
			"rest_pre_insert_{$post_type}",
			function ( $prepared_post, $request ) {
				return $this->filter_prepared_post( $prepared_post, $request );
			},
			10,
			2
		);

		add_action(
			"rest_insert_{$post_type}",
			function ( $post, $request, $is_new ) {
				$this->on_rest_insert( $post, $request, $is_new );
			},
			10,
			3
		);

		add_filter(
			'rest_pre_dispatch',
			function ( $result, $server, $request ) {
				return $this->rest_pre_dispatch( $result, $server, $request );
			},
			10,
			3
		);
	}

	/**
	 * Post type REST API custom routes registration.
	 */
	private function register_custom_routes() {
		register_rest_route(
			'posts-bridge/v1',
			"/rcpt/{$this->post_type}/(?P<id>\d+)",
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => function ( $request ) {
						return $this->fetch_remotes( $request );
					},
					'permission_callback' => array( '\FORMS_BRIDGE\REST_Settings_Controller', 'permission_callback' ),
					'args'                => array(
						'id' => array(
							'description' => __( 'Post ID', 'posts-bridge' ),
							'type'        => 'integer',
							'required'    => true,
						),
					),
				),
			),
		);
	}

	/**
	 * Remote CPT fetch proxy method as callback to the RCPT API custom endpoint.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return array|WP_Error
	 */
	private function fetch_remotes( $request ) {
		$id = $request['id'];

		$post = get_post( $id );
		if ( ! $post ) {
			return new WP_Error( 'not_found', 'Post not found', array( 'status' => 404 ) );
		}

		$rcpt = new Remote_CPT( $post );
		$data = $rcpt->fetch();

		if ( ! is_array( $data ) ) {
			return array();
		}

		$fields = $this->data_to_fields( $data );
		return OpenAPI::expand_fields_schema( $fields );
	}

	/**
	 * Format RCPT fetch response data to a list of json schema fields.
	 *
	 * @param mixed  $data Loaded data.
	 * @param string $prefix Prefix for field names.
	 *
	 * @return array
	 */
	private function data_to_fields( $data, $prefix = '' ) {
		if ( ! $data ) {
			return array();
		}

		if ( wp_is_numeric_array( $data ) ) {
			$fields = $this->data_to_fields( $data[0], '[0].' );

			if ( ! $fields ) {
				return $fields;
			}

			$schema = array(
				'type'  => 'array',
				'items' => array(
					'type'       => 'object',
					'properties' => array(),
				),
			);

			foreach ( $fields as $field ) {
				$schema['items']['properties'][ $prefix . $field['name'] ] = $field['schema'];
			}

			$field = array(
				'name'   => '[0]',
				'schema' => $schema,
			);

			array_unshift( $field, $fields );
			return $fields;
		} elseif ( is_array( $data ) ) {
			foreach ( $data as $key => $val ) {
				$fields[] = array(
					'name'   => $prefix . $key,
					'schema' => $this->value_to_schema( $val ),
				);
			}
		} else {
			$fields[] = array(
				'name'   => $prefix,
				'schema' => $this->value_to_schema( $data ),
			);
		}

		return $fields;
	}

	/**
	 * Returns the json schema of a given value.
	 *
	 * @param mixed $val Target value.
	 *
	 * @return array
	 */
	private function value_to_schema( $val ) {
		// phpcs:disable Universal.Operators.StrictComparisons
		if ( intval( $val ) == $val ) {
			return array( 'type' => 'integer' );
		} elseif ( floatval( $val ) == $val ) {
			return array( 'type' => 'number' );
		} elseif ( is_string( $val ) ) {
			return array( 'type' => 'string' );
		} elseif ( is_bool( $val ) ) {
			return array( 'type' => 'boolean' );
		} elseif ( wp_is_numeric_array( $val ) ) {
			$fields = $this->data_to_fields( $val );
		} elseif ( is_array( $val ) || is_object( $val ) ) {
			$fields = $this->data_to_fields( (array) $val );
			$props  = array();
			foreach ( $fields as $field ) {
				$props[ $field['name'] ] = $field['schema'];
			}

			return array(
				'type'       => 'object',
				'properties' => $props,
			);
		}
		// phpcs:enable

		return array( 'type' => 'string' );
	}

	/**
	 * Checks if the requests falls into the controller API namespace.
	 *
	 * @param WP_REST_Request $request Request instance.
	 *
	 * @return boolean True if the request is owned.
	 */
	private function is_own_route( $request ) {
		$ns = $this->namespace . '/' . $this->rest_base . '/' . $this->post_type;
		return strstr( $request->get_route(), $ns ) !== false;
	}

	/**
	 * Filters the rest insert prepared post with the bridge fields.
	 *
	 * @param object          $prepared_post Prepared post data before inserts.
	 * @param WP_REST_Request $request Current request.
	 *
	 * @return object Prepared post data with mapped remote fields.
	 */
	private function filter_prepared_post( $prepared_post, $request ) {
		if ( ! $this->is_own_route( $request ) ) {
			return $prepared_post;
		}

		$bridge  = PBAPI::get_bridge( $this->post_type );
		$payload = $request->get_json_params();
		foreach ( $payload as $field => $value ) {
			if ( $this->is_alias( $field ) ) {
				unset( $payload[ $field ] );
				$payload[ $this->unalias( $field ) ] = $value;
			}
		}

		$prepared_data = wp_slash( $bridge->apply_mappers( $payload ) );
		$prepared_post = array_merge( (array) $prepared_post, $prepared_data );

		Logger::log( "Remote CPT({$this->post_type}) REST API prepared post" );
		Logger::log( $prepared_post );

		return (object) $prepared_post;
	}

	/**
	 * Updates post custom fields after REST API inserts based on bridge custom fields and
	 * maps featured_media custom fields to the request params.
	 *
	 * @param WP_Post         $post Writed post.
	 * @param WP_REST_Request $request Current request.
	 * @param boolean         $is_new True if is a newly created post.
	 */
	private function on_rest_insert( $post, $request, $is_new ) {
		if ( ! $this->is_own_route( $request ) ) {
			return;
		}

		$bridge = PBAPI::get_bridge( $this->post_type );

		// Map custom featured media to the request before media handler execution.
		foreach ( $bridge->remote_post_fields() as $foreign => $name ) {
			if ( 'featured_media' === $name ) {
				try {
					$keys = JSON_Finger::parse( $foreign );
				} catch ( Error ) {
					$keys = array();
				}

				// Checks if foreign is a json finger.
				if ( count( $keys ) > 1 ) {
					$key   = $keys[0];
					$alias = $this->alias( $key );
					// Checks if foreing field is aliased.
					if ( isset( $request[ $alias ] ) ) {
						// fix foreign key.
						$foreign = str_replace( $key, $alias, $foreign );
					}
				} else {
					// Checks if foreing field is aliased.
					$alias = $this->alias( $foreign );
					if ( isset( $request[ $alias ] ) ) {
						// Overwrite foreig with alias.
						$foreign = $alias;
					}
				}

				$value = ( new JSON_Finger( $request->get_params() ) )->get( $foreign );
				$request->set_param( 'featured_media', $value );
				break;
			}
		}

		// Set default featured if empty.
		if ( empty( $request['featured_media'] ) ) {
			$request['featured_media'] = Remote_Featured_Media::default_thumbnail_id();
		}

		$foreign_key = $bridge->foreign_key;

		// Unalias foreign key on the request.
		$schema_properties = $this->get_item_schema()['properties'];
		if ( isset( $schema_properties[ $foreign_key ] ) ) {
			$foreign_key = $this->alias( $foreign_key );
		}

		update_post_meta( $post->ID, Remote_CPT::FOREIGN_KEY_HANDLE, $request[ $foreign_key ] );
	}

	/**
	 * Sanitize and validates request params before rest dispatches to prevent schema conflicts and uncompleted
	 * payloads.
	 *
	 * @param mixed           $result Response to replace the requested version with.
	 * @param WP_REST_Server  $server Server instance.
	 * @param WP_REST_Request $request Request instance.
	 *
	 * @return mixed Unaltered result.
	 */
	public function rest_pre_dispatch( $result, $server, $request ) {
		if ( is_wp_error( $result ) ) {
			return $result;
		}

		// Exits if request is not for the own remote cpt.
		if ( ! $this->is_own_route( $request ) ) {
			return $result;
		}

		// Exits on read requests.
		if ( ! strstr( $server::EDITABLE, $request->get_method() ) ) {
			return $result;
		}

		// check schema conflict ressolutions.
		$schema_properties = array_keys( $this->get_item_schema()['properties'] );
		$is_processed      = array_reduce(
			$schema_properties,
			function ( $is_processed, $property ) use ( $request ) {
				return $is_processed || ! empty( $request[ $this->alias( $property ) ] );
			},
			false
		);

		// Exits if request has been processed.
		if ( $is_processed ) {
			return $result;
		}

		$bridge = PBAPI::get_bridge( $this->post_type );

		// Use json fingers to get foreign key value from the request.
		$foreign_key = $bridge->foreign_key;
		$foreign_id  = ( new JSON_Finger( $request->get_params() ) )->get( $foreign_key );

		// Exits if no foreign key on the payload.
		if ( empty( $foreign_id ) ) {
			return new WP_Error(
				'required_foreign_key',
				__( 'Remote CPT foreign key is unkown', 'posts-bridge' )
			);
		}

		// Resolve schema conflicts.
		foreach ( $schema_properties as $property ) {
			if ( ! empty( $request[ $property ] ) ) {
				$value = $request[ $property ];
				$request->set_param( $this->alias( $property ), $value );
				unset( $request[ $property ] );
			}
		}

		// Restore request id if comes from the URL.
		if ( preg_match( '/\d+$/', $request->get_route(), $matches ) ) {
			$wp_id = $matches[0];
			$request->set_param( 'id', (int) $wp_id );
		}

		Logger::log( "Dispatch REST request for {$this->post_type} bridge" );
		Logger::log( $request );
	}

	/**
	 * Aliases a field name.
	 *
	 * @param string $name Original field name.
	 *
	 * @return string Aliased field name.
	 */
	private function alias( $name ) {
		return self::REST_ALIAS_PREFIX . $name;
	}

	/**
	 * Reverses field name alias.
	 *
	 * @param string $alias Aliased field name.
	 *
	 * @return string Original field name.
	 */
	private function unalias( $alias ) {
		return str_replace( self::REST_ALIAS_PREFIX, '', $alias );
	}

	/**
	 * Checks if field name aliased.
	 *
	 * @param string $name Name of the field.
	 *
	 * return boolean True if name is an alias.
	 */
	private function is_alias( $name ) {
		return (bool) strstr( $name, self::REST_ALIAS_PREFIX );
	}

	/**
	 * Overwrite parent's featured media handler to download URL images and
	 * store them as WP attachments.
	 *
	 * @param string|int $featured_media Featured media source. Could be an ID or a URL.
	 * @param int        $post_id Target post ID.
	 */
	protected function handle_featured_media( $featured_media, $post_id ) {
		$featured_media = Remote_Featured_Media::handle( $featured_media );
		parent::handle_featured_media( $featured_media, $post_id );
	}

	/**
	 * Overwrite post's default schema to allow URL featured media values.
	 *
	 * @return array Item schema data.
	 */
	public function get_item_schema() {
		$schema = parent::get_item_schema();

		$schema['properties']['featured_media'] = array( 'integer', 'string' );
		return $schema;
	}
}
