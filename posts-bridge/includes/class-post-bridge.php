<?php
/**
 * Class Post_Bridge
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use PBAPI;
use WP_Error;
use HTTP_BRIDGE\Http_Backend;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Post bridge object.
 */
class Post_Bridge {

	/**
	 * Handles WP_Post model fields.
	 *
	 * @var string[]
	 */
	public const POST_MODEL = array(
		'post_title',
		'post_name',
		'post_excerpt',
		'post_content',
		'post_content_filtered',
		'post_status',
		'post_mime_type',
		'post_date',
		'post_date_gmt',
		'post_modified',
		'post_modified_gmt',
		'post_parent',
		'post_password',
		'post_parent',
		'comment_status',
		'post_author',
		'pinged',
		'menu_order',
		'post_mime_type',
		'guid',
		'import_id',
		'post_category',
		'tags_input',
		'tax_input',
		'meta_input',
		'page_template',
		/* custom */
		'featured_media',
	);

	/**
	 * Bridge data common schema.
	 *
	 * @param string|null $addon Addon name.
	 *
	 * @return array
	 */
	public static function schema( $addon = null ) {
		$schema = array(
			'$schema'              => 'http://json-schema.org/draft-04/schema#',
			'title'                => 'post-bridge',
			'type'                 => 'object',
			'properties'           => array(
				'post_type'       => array(
					'title'       => _x( 'Post type', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'Post type of the bridge', 'posts-bridge' ),
					'type'        => 'string',
					'minLength'   => 1,
					'default'     => 'post',
				),
				'foreign_key'     => array(
					'title'       => _x( 'Foreign key', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'Name of the primary key of the remote objects', 'posts-bridge' ),
					'type'        => 'string',
					'default'     => 'id',
				),
				'backend'         => array(
					'title'       => _x( 'Backend', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'Backend name', 'posts-bridge' ),
					'type'        => 'string',
					'default'     => '',
				),
				'endpoint'        => array(
					'title'       => _x( 'Endpoint', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'HTTP API endpoint', 'posts-bridge' ),
					'type'        => 'string',
					'default'     => '/',
				),
				'single_endpoint' => array(
					'title'       => _x( 'Single endpoint pattern', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'Pattern of the endpoint to fetch a single record', 'posts-bridge' ),
					'type'        => 'string',
					'default'     => '/{id}',
				),
				'method'          => array(
					'title'       => _x( 'Method', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'HTTP method', 'posts-bridge' ),
					'type'        => 'string',
					'enum'        => array( 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ),
					'default'     => 'GET',
				),
				'tax_mappers'     => array(
					'description' => __( 'Array of bridge\'s remote taxonomy mappings', 'posts-bridge' ),
					'type'        => 'array',
					'items'       => array(
						'type'                 => 'object',
						'properties'           => array(
							'name'    => array(
								'type'      => 'string',
								'minLength' => 1,
							),
							'foreign' => array(
								'type'              => 'string',
								'minLength'         => 1,
								'validate_callback' => '\POSTS_BRIDGE\JSON_Finger::validate',
							),
						),
						'additionalProperties' => false,
						'required'             => array( 'name', 'foreign' ),
					),
					'default'     => array(),
				),
				'field_mappers'   => array(
					'description' => __( 'Array of bridge\'s remote field mappings', 'posts-bridge' ),
					'type'        => 'array',
					'items'       => array(
						'type'                 => 'object',
						'properties'           => array(
							'name'    => array(
								'type'      => 'string',
								'minLength' => 1,
							),
							'foreign' => array(
								'type'              => 'string',
								'minLength'         => 1,
								'validate_callback' => '\POSTS_BRIDGE\JSON_Finger::validate',
							),
						),
						'additionalProperties' => false,
						'required'             => array( 'name', 'foreign' ),
					),
					'default'     => array(),
				),
				'is_valid'        => array(
					'description' => __( 'Validation result of the bridge setting', 'posts-bridge' ),
					'type'        => 'boolean',
					'default'     => true,
				),
				'enabled'         => array(
					'description' => __( 'Boolean flag to enable/disable a bridge', 'posts-bridge' ),
					'type'        => 'boolean',
					'default'     => true,
				),
			),
			'required'             => array(
				'post_type',
				'foreign_key',
				'backend',
				'method',
				'endpoint',
				'single_endpoint',
				'tax_mappers',
				'field_mappers',
				'is_valid',
				'enabled',
			),
			'additionalProperties' => false,
		);

		if ( ! $addon ) {
			return $schema;
		}

		return apply_filters( 'posts_bridge_bridge_schema', $schema, $addon );
	}

	/**
	 * Handles bridge's data.
	 *
	 * @var array $data Settings data of the bridge.
	 */
	protected $data;

	/**
	 * Handles the post bridge identifier string.
	 *
	 * @var string
	 */
	protected $id;

	/** Handles post bridge's addon slug.
	 *
	 * @var string
	 */
	protected $addon;

	/**
	 * Stores the post bridge's data as a private attribute.
	 *
	 * @param array  $data Bridge data.
	 * @param string $addon Addon name.
	 */
	public function __construct( $data, $addon ) {
		$this->addon = $addon;
		$this->data  = wpct_plugin_sanitize_with_schema( $data, static::schema( $addon ) );

		if ( $this->is_valid ) {
			$this->id = $addon . '-' . $this->data['post_type'];
		}
	}

	/**
	 * Bridge data getter.
	 *
	 * @return array|null
	 */
	public function data() {
		if ( ! $this->is_valid ) {
			return;
		}

		return array_merge(
			$this->data,
			array(
				'id'    => $this->id,
				'name'  => $this->name,
				'addon' => $this->addon,
			)
		);
	}

	/**
	 * Magic method to proxy public attributes to method getters.
	 *
	 * @param string $name Attribute name.
	 *
	 * @return mixed Attribute value or null.
	 */
	public function __get( $name ) {
		switch ( $name ) {
			case 'id':
				return $this->id;
			case 'addon':
				return $this->addon;
			case 'backend':
				return $this->backend();
			case 'content_type':
				return $this->content_type();
			case 'is_valid':
				return ! is_wp_error( $this->data ) &&
					$this->data['is_valid'] &&
					Addon::addon( $this->addon ) !== null;
			default:
				if ( ! $this->is_valid ) {
					return;
				}

				return $this->data[ $name ] ?? null;
		}
	}

	/**
	 * Retrives the bridge's backend instance.
	 *
	 * @return Http_Backend|null
	 */
	protected function backend() {
		if ( ! $this->is_valid ) {
			return;
		}

		return PBAPI::get_backend( $this->data['backend'] );
	}

	/**
	 * Gets bridge's default body encoding schema.
	 *
	 * @return string|null
	 */
	protected function content_type() {
		if ( ! $this->is_valid ) {
			return;
		}

		$backend = PBAPI::get_backend( $this->data['backend'] );
		if ( ! $backend ) {
			return;
		}

		return $backend->content_type;
	}

	/**
	 * Performs a request to an endpoint using the bridge backend and HTTP method.
	 *
	 * @param string $endpoint Foreig key value.
	 * @param array  $params Request params.
	 * @param array  $headers HTTP headers.
	 *
	 * @return array|WP_Error Backend HTTP response.
	 */
	public function request( $endpoint, $params = array(), $headers = array() ) {
		if ( ! $this->is_valid ) {
			return new WP_Error( 'invalid_bridge', 'Bridge is invalid', (array) $this->data );
		}

		$schema = self::schema( $this->addon );

		$allowed_methods = $schema['properties']['method']['enum'] ?? array( $this->method );
		if ( ! in_array( $this->method, $allowed_methods, true ) ) {
			return new WP_Error(
				'method_not_allowed',
				sprintf(
					/* translators: %s: method name */
					__( 'HTTP method %s is not allowed', 'posts-bridge' ),
					sanitize_text_field( $this->method )
				),
				array( 'method' => $this->method )
			);
		}

		$backend = $this->backend();
		$method  = $this->method;

		return $backend->$method( $endpoint, $params, $headers );
	}

	/**
	 * Performs a request to the bridge single_endpoint using the bridge backend and HTTP method.
	 *
	 * @param string|int $foreign_id ID of the remote object.
	 * @param array      $params Request params.
	 * @param array      $headers HTTP headers.
	 *
	 * @return array|WP_Error Backend entry data.
	 */
	public function fetch_one( $foreign_id, $params = array(), $headers = array() ) {
		if ( ! $this->is_valid ) {
			return new WP_Error( 'invalid_bridge', 'Bridge is invalid', (array) $this->data );
		}

		$endpoint = $this->endpoint( $foreign_id );
		$response = $this->request( $endpoint, $params, $headers );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return $response['data'] ?? array();
	}

	/**
	 * Performs a request to the bridge endpoint using the bridge backend and HTTP method.
	 *
	 * @param array $params Request params.
	 * @param array $headers HTTP headers.
	 *
	 * @return array|WP_Error Backend entries data.
	 */
	public function fetch_all( $params = array(), $headers = array() ) {
		if ( ! $this->is_valid ) {
			return new WP_Error( 'invalid_bridge', 'Bridge is invalid', (array) $this->data );
		}

		$endpoint = $this->endpoint();
		$response = $this->request( $endpoint, $params, $headers );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return $response['data'] ?? array();
	}

	/**
	 * Gets the formatted bridge endpoint.
	 *
	 * @param string|int|null $foreign_id ID of the remote object, optional.
	 *
	 * @return string
	 */
	protected function endpoint( $foreign_id = null ) {
		if ( null === $foreign_id ) {
			return $this->data['endpoint'];
		}

		$endpoint = $this->data['single_endpoint'] ?? $this->data['endpoint'] ?? '/';
		$parsed   = wp_parse_url( $endpoint );
		$endpoint = $parsed['path'] ?? '/';

		if ( preg_match( '/{+id}+|%s|%d/i', $endpoint, $matches ) ) {
			$endpoint = str_replace( $matches[0], $foreign_id, $endpoint );
		} else {
			$endpoint = preg_replace( '/\/+$/', '', $endpoint ) . '/' . $foreign_id;
		}

		if ( isset( $parsed['query'] ) ) {
			$endpoint .= '?' . $parsed['query'];
		}

		return $endpoint;
	}

	/**
	 * Looks up for the list of remote foreign ids.
	 *
	 * @return string[]
	 */
	public function foreign_ids() {
		$items = $this->fetch_all();

		if ( is_wp_error( $items ) ) {
			Logger::log( "Index fetch response error on the {$this->post_type} bridge", Logger::ERROR );
			Logger::log( $items, Logger::ERROR );
			return array();
		}

		$items = apply_filters( 'posts_bridge_remote_items', $items, $this );

		Logger::log(
			sprintf(
				'Found %s foreign items for the %s bridge',
				count( $items ),
				$this->post_type
			),
			Logger::DEBUG
		);

		$ids = array();
		foreach ( $items as $item ) {
			if ( ! is_array( $item ) ) {
				continue;
			}

			$finger = new JSON_Finger( $item );

			$id = $finger->get( $this->foreign_key );
			if ( $id ) {
				$ids[] = (string) $id;
			}
		}

		Logger::log(
			sprintf(
				'Found %s foreign ids for the %s bridge',
				count( $ids ),
				$this->post_type
			),
			Logger::DEBUG
		);

		return $ids;
	}

	/**
	 * Returns a map with mapped remote fields to taxonomies.
	 *
	 * @return array<string, string>
	 */
	final public function remote_taxonomies() {
		$taxonomies = array();
		foreach ( $this->tax_mappers as $mapper ) {
			if ( empty( $mapper['foreign'] ) || empty( $mapper['name'] ) ) {
				continue;
			}

			$taxonomies[ $mapper['foreign'] ] = $mapper['name'];
		}

		return $taxonomies;
	}

	/**
	 * Bridge's remote taxonomies getter.
	 *
	 * @return array<string, string>
	 */
	final public function remote_fields() {
		return array_merge(
			$this->remote_post_fields(),
			$this->remote_custom_fields()
		);
	}

	/**
	 * Bridge's remote post fields getter.
	 *
	 * @return array<string, string>
	 */
	final public function remote_post_fields() {
		$fields = array();
		foreach ( $this->field_mappers as $mapper ) {
			if ( empty( $mapper['name'] ) || empty( $mapper['foreign'] ) ) {
				continue;
			}

			if ( in_array( $mapper['name'], self::POST_MODEL, true ) ) {
				$fields[ $mapper['foreign'] ] = $mapper['name'];
			}
		}

		return $fields;
	}

	/**
	 * Bridge's remote custom fields getter.
	 *
	 * @return array<string, string>
	 */
	final public function remote_custom_fields() {
		$fields = array();
		foreach ( $this->field_mappers as $mapper ) {
			if ( empty( $mapper['foreign'] ) || empty( $mapper['name'] ) ) {
				continue;
			}

			if ( ! in_array( $mapper['name'], self::POST_MODEL, true ) ) {
				$fields[ $mapper['foreign'] ] = $mapper['name'];
			}
		}

		return $fields;
	}

	/**
	 * Apply fields mapping to a remote entry data.
	 *
	 * @param array $data Remote entry data.
	 *
	 * @return array Data with remote fields mappeds.
	 */
	final public function apply_mappers( $data ) {
		if ( ! is_array( $data ) ) {
			return $data;
		}

		$finger        = new JSON_Finger( $data );
		$post_fields   = $this->remote_post_fields();
		$custom_fields = $this->remote_custom_fields();
		$taxonomies    = $this->remote_taxonomies();

		foreach ( $post_fields as $foreign => $name ) {
			if ( $foreign === $name ) {
				continue;
			}

			$value = $finger->get( $foreign );
			if ( $value ) {
				$finger->set( $name, $value );
			}

			$finger->unset( $foreign );
		}

		foreach ( $custom_fields as $foreign => $name ) {
			$value = $finger->get( $foreign );
			if ( $value ) {
				// WordPress can't serialize list arrays...
				if ( wp_is_numeric_array( $value ) ) {
					$serializable = array();

					$l = count( $value );
					for ( $i = 0; $i < $l; $i++ ) {
						$serializable[ (string) $i ] = $value[ $i ];
					}
					$value = $serializable;
				}

				$finger->set( 'meta_input.' . $name, $value );
			}

			$finger->unset( $foreign );
		}

		$tax_input = array();
		foreach ( $taxonomies as $foreign => $name ) {
			$terms = $finger->get( $foreign );
			if ( $terms ) {
				if ( 'tags_input' === $name ) {
					$terms = $this->get_post_tags( $terms );

					if ( count( $terms ) ) {
						$finger->set( 'tags_input', $terms );
					}
				} elseif ( 'post_category' === $name ) {
					$terms = $this->get_post_terms( $terms );

					if ( count( $terms ) ) {
						$finger->set( 'post_category', $terms );
					}
				} else {
					$terms = $this->get_post_terms( $terms );

					if ( count( $terms ) ) {
						$tax_input[ $name ] = $terms;
					}
				}
			}

			$finger->unset( $foreign );
		}

		$data = $finger->data();

		if ( count( $tax_input ) ) {
			$data['tax_input'] = $tax_input;
		}

		// post type should not be user declarable.
		unset( $data['post_type'] );

		// fallback to publish status.
		if ( ! isset( $data['post_status'] ) ) {
			$data['post_status'] = 'publish';
		}

		foreach ( array_keys( $data ) as $key ) {
			if ( ! in_array( strtolower( $key ), self::POST_MODEL, true ) ) {
				unset( $data[ $key ] );
			}
		}

		return $data;
	}

	/**
	 * On inserts, WordPress wants categories as an array of existing terms' ids.
	 * Loop over the categories, create them if they doesn't exists, an return
	 * its ids.
	 *
	 * @param array|string $names Term names.
	 * @param string       $taxonomy Taxonomy name.
	 *
	 * @return array Array with valid categories ids.
	 */
	private function get_post_terms( $names, $taxonomy = 'category' ) {
		if ( ! wp_is_numeric_array( $names ) ) {
			$names = $this->get_post_tags( $names );
		}

		$terms = get_terms(
			array(
				'taxonomy'   => $taxonomy,
				'hide_empty' => false,
			)
		);

		$term_names = array();
		foreach ( $terms as $term ) {
			$term_names[ $term->name ] = $term->term_id;
		}

		$ids = array();
		foreach ( $names as $name ) {
			if ( is_int( $name ) ) {
				$ids[] = (int) $name;
			} elseif ( is_string( $name ) ) {
				if ( isset( $term_names[ $name ] ) ) {
					$ids[] = $term_names[ $name ];
				} else {
					$term = wp_insert_term( $name, $taxonomy );
					if ( ! is_wp_error( $term ) ) {
						$ids[] = $term['term_id'];
					}
				}
			}
		}

		return $ids;
	}

	/**
	 * On inserts, WordPress wants tags as an array of strings with tag names.
	 *
	 * @param array|string $tags Array with post tags, or string with comma separated values.
	 *
	 * @return array Tag names as array.
	 */
	private function get_post_tags( $tags ) {
		if ( ! is_array( $tags ) ) {
			if ( ! is_string( $tags ) ) {
				return array();
			}

			$tags = explode( ',', $tags );
		}

		$output = array();
		foreach ( $tags as $tag ) {
			if ( ! $tag || is_array( $tag ) || is_object( $tag ) ) {
				continue;
			}

			$tag = trim( strval( $tag ) );
			if ( $tag ) {
				$output[] = $tag;
			}
		}

		return $output;
	}

	/**
	 * Returns a clone of the bridge instance with its data patched by
	 * the partial array.
	 *
	 * @param array $partial Bridge data.
	 *
	 * @return Post_Bridge
	 */
	public function patch( $partial = array() ) {
		if ( ! $this->is_valid ) {
			return $this;
		}

		$data = array_merge( $this->data, $partial );
		return new static( $data, $this->addon );
	}

	/**
	 * Save the bridge data in the database.
	 *
	 * @return boolean
	 */
	public function save() {
		if ( ! $this->is_valid ) {
			return false;
		}

		$setting = Settings_Store::setting( $this->addon );
		if ( ! $setting ) {
			return false;
		}

		$bridges = $setting->bridges ?: array();

		$index = array_search( $this->name, array_column( $bridges, 'name' ), true );

		if ( false === $index ) {
			$bridges[] = $this->data;
		} else {
			$bridges[ $index ] = $this->data;
		}

		$setting->bridges = $bridges;

		return true;
	}

	/**
	 * Removes the bridge from the database.
	 *
	 * @return boolean
	 */
	public function delete() {
		if ( ! $this->is_valid ) {
			return false;
		}

		$setting = Settings_Store::setting( $this->addon );
		if ( ! $setting ) {
			return false;
		}

		$bridges = $setting->bridges ?: array();

		$index = array_search( $this->name, array_column( $bridges, 'name' ), true );

		if ( false === $index ) {
			return false;
		}

		array_splice( $bridges, $index, 1 );
		$setting->bridges = $bridges;

		return true;
	}
}
