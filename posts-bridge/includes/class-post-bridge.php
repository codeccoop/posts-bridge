<?php

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
	public const post_model = array(
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
		// custom
		'featured_media',
	);

	/**
	 * Bridge data common schema.
	 *
	 * @var array
	 */
	public static function schema( $addon = null ) {
		$schema = array(
			'$schema'              => 'http://json-schema.org/draft-04/schema#',
			'title'                => 'post-bridge',
			'type'                 => 'object',
			'properties'           => array(
				'post_type'     => array(
					'title'       => _x( 'Post type', 'Bridge schema', 'posts-bridge' ),
					'description' => __(
						'Post type of the bridge',
						'posts-bridge'
					),
					'type'        => 'string',
					'minLength'   => 1,
					'default'     => 'post',
				),
				'foreign_key'   => array(
					'title'       => _x(
						'Foreign key',
						'Bridge schema',
						'posts-bridge'
					),
					'description' => __(
						'Name of the primary key of the remote objects',
						'posts-birdge'
					),
					'type'        => 'string',
					'default'     => 'id',
				),
				'backend'       => array(
					'title'       => _x( 'Backend', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'Backend name', 'posts-bridge' ),
					'type'        => 'string',
					'default'     => '',
				),
				'endpoint'      => array(
					'title'       => _x( 'Endpoint', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'HTTP API endpoint', 'posts-bridge' ),
					'type'        => 'string',
					'default'     => '/',
				),
				'method'        => array(
					'title'       => _x( 'Method', 'Bridge schema', 'posts-bridge' ),
					'description' => __( 'HTTP method', 'posts-bridge' ),
					'type'        => 'string',
					'enum'        => array( 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ),
					'default'     => 'GET',
				),
				'tax_mappers'   => array(
					'description' => __(
						'Array of bridge remote taxonomy mappings',
						'posts-bridge'
					),
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
								'validate_callback' =>
									'\POSTS_BRIDGE\JSON_Finger::validate',
							),
						),
						'additionalProperties' => false,
						'required'             => array( 'name', 'foreign' ),
					),
					'default'     => array(),
				),
				'field_mappers' => array(
					'description' => __(
						'Array of bridge\'s remote field mappings',
						'posts-bridge'
					),
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
								'validate_callback' =>
									'\POSTS_BRIDGE\JSON_Finger::validate',
							),
						),
						'additionalProperties' => false,
						'required'             => array( 'name', 'foreign' ),
					),
					'default'     => array(),
				),
				'is_valid'      => array(
					'description' => __(
						'Validation result of the bridge setting',
						'posts-bridge'
					),
					'type'        => 'boolean',
					'default'     => true,
				),
				'enabled'       => array(
					'description' => __(
						'Boolean flag to enable/disable a bridge',
						'posts-bridge'
					),
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

	protected $id;

	/** Handles post bridge's addon slug.
	 *
	 * @var string
	 */
	protected $addon;

	/**
	 * Stores the post bridge's data as a private attribute.
	 */
	public function __construct( $data, $addon ) {
		$this->data  = wpct_plugin_sanitize_with_schema(
			$data,
			static::schema( $addon )
		);
		$this->addon = $addon;

		if ( $this->is_valid ) {
			$this->id = $addon . '-' . $this->data['post_type'];
		}
	}

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
	 * Fetches remote data for a given foreign id.
	 *
	 * @param int|string|null $foreign_id Foreig key value.
	 * @param array           $params Request query params.
	 * @param array           $headers Request headers.
	 *
	 * @return array|WP_Error
	 */
	public function fetch( $foreign_id = null, $params = array(), $headers = array() ) {
		if ( ! $this->is_valid ) {
			return new WP_Error( 'invalid_bridge' );
		}

		// Function overload to allow calls without foreign_id
		if ( is_array( $foreign_id ) ) {
			$foreign_id = null;
			$headers    = $params;
			$params     = $foreign_id;
		}

		$schema = $this->schema();

		if (
			! in_array(
				$this->method,
				$schema['properties']['method']['enum'],
				true
			)
		) {
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

		$backend  = $this->backend();
		$method   = $this->method;
		$endpoint = $this->endpoint( $foreign_id );

		return $backend->$method( $endpoint, $params, $headers );
	}

	protected function endpoint( $foreign_id = null ) {
		$endpoint = $this->data['endpoint'] ?? '';
		$parsed   = wp_parse_url( $endpoint );

		$endpoint = $parsed['path'] ?? '';

		if ( $foreign_id ) {
			$endpoint .= '/' . $foreign_id;
		}

		if ( isset( $parsed['query'] ) ) {
			$endpoint .= '?' . $parsed['query'];
		}

		return apply_filters(
			'posts_bridge_endpoint',
			$endpoint,
			$foreign_id,
			$this
		);
	}

	protected function list_remotes() {
		$response = $this->fetch();

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return $response['data'];
	}

	public function foreign_ids() {
		$items = $this->list_remotes();

		if ( is_wp_error( $items ) ) {
			Logger::log(
				"Index fetch response error on the {$this->post_type} bridge",
				Logger::ERROR
			);

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
			$finger = new JSON_Finger( $item );
			$id     = $finger->get( $this->foreign_key );

			if ( $id ) {
				$ids[] = $id;
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
	 * Bridge's remote fields getter.
	 *
	 * @return array Map of remote fields with foreign as keys and names as values.
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
	 * @return array Map of remote fields with foreign as keys and names as values.
	 */
	final public function remote_post_fields() {
		$fields = array();
		foreach ( $this->field_mappers as $mapper ) {
			if ( empty( $mapper['name'] ) || empty( $mapper['foreign'] ) ) {
				continue;
			}

			if ( in_array( $mapper['name'], self::post_model ) ) {
				$fields[ $mapper['foreign'] ] = $mapper['name'];
			}
		}

		return $fields;
	}

	/**
	 * Bridge's remote custom fields getter.
	 *
	 * @return array Map of remote fields with foreign as keys and names as values.
	 */
	final public function remote_custom_fields() {
		$fields = array();
		foreach ( $this->field_mappers as $mapper ) {
			if ( empty( $mapper['foreign'] ) || empty( $mapper['name'] ) ) {
				continue;
			}

			if ( ! in_array( $mapper['name'], self::post_model ) ) {
				$fields[ $mapper['foreign'] ] = $mapper['name'];
			}
		}

		return $fields;
	}

	/**
	 * Apply fields mapping to a given data.
	 *
	 * @param array $data Data to apply fields mappings.
	 *
	 * @return array Data with remote fields mappeds.
	 */
	final public function apply_mappers( $data ) {
		$finger        = new JSON_Finger( $data );
		$post_fields   = $this->remote_post_fields();
		$custom_fields = $this->remote_custom_fields();
		$taxonomies    = $this->remote_taxonomies();

		foreach ( $post_fields as $foreign => $name ) {
			if ( $foreign === $name ) {
				continue;
			}

			if ( $value = $finger->get( $foreign ) ) {
				$finger->set( $name, $value );
			}

			$finger->unset( $foreign );
		}

		foreach ( $custom_fields as $foreign => $name ) {
			if ( $value = $finger->get( $foreign ) ) {
				// WordPress can't serialize list arrays...
				if ( wp_is_numeric_array( $value ) ) {
					$serializable = array();
					for ( $i = 0; $i < count( $value ); $i++ ) {
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
			if ( $terms = $finger->get( $foreign ) ) {
				if ( $name === 'tags_input' ) {
					$terms = $this->get_post_tags( $terms );

					if ( count( $terms ) ) {
						$finger->set( 'tags_input', $terms );
					}
				} elseif ( $name === 'post_category' ) {
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

		// post type should not be user declarable
		unset( $data['post_type'] );

		// fallback to publish status
		if ( ! isset( $data['post_status'] ) ) {
			$data['post_status'] = 'publish';
		}

		return $data;
	}

	/**
	 * On inserts, WordPress wants categories as an array of existing terms' ids.
	 * Loop over the categories, create them if they doesn't exists, an return
	 * its ids.
	 *
	 * @param array|string $categories Array with category names.
	 *
	 * @return array Array with valid categories ids.
	 */
	private function get_post_terms( $names, $taxonomy = 'category' ) {
		if ( ! wp_is_numeric_array( $names ) ) {
			$names = $this->get_post_tags( $names );
		}

		$terms      = get_terms(
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
			$tag = trim( $tag );
			if ( $tag ) {
				$output[] = $tag;
			}
		}

		return $output;
	}

	/**
	 * Register remote fields as post's meta and show on the REST API. This is
	 * needed to load this fields on the editor.
	 */
	final public function register_meta() {
		$fields = $this->remote_fields();
		foreach ( array_keys( $fields ) as $foreign ) {
			register_post_meta(
				$this->post_type,
				$foreign,
				array(
					'show_in_rest'      => true,
					'single'            => true,
					'type'              => 'string',
					'sanitize_callback' => 'wp_kses_post',
				)
			);
		}
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

	public function save() {
		if ( ! $this->is_valid ) {
			return false;
		}

		$setting = Settings_Store::setting( $this->addon );
		if ( ! $setting ) {
			return false;
		}

		$bridges = $setting->bridges ?: array();

		$index = array_search( $this->name, array_column( $bridges, 'name' ) );

		if ( $index === false ) {
			$bridges[] = $this->data;
		} else {
			$bridges[ $index ] = $this->data;
		}

		$setting->bridges = $bridges;

		return true;
	}

	public function delete() {
		if ( ! $this->is_valid ) {
			return false;
		}

		$setting = Settings_Store::setting( $this->addon );
		if ( ! $setting ) {
			return false;
		}

		$bridges = $setting->bridges ?: array();

		$index = array_search( $this->name, array_column( $bridges, 'name' ) );

		if ( $index === false ) {
			return false;
		}

		array_splice( $bridges, $index, 1 );
		$setting->bridges = $bridges;

		return true;
	}
}
