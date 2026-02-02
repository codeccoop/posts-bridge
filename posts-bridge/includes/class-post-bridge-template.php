<?php

namespace POSTS_BRIDGE;

use Exception;
use Error;
use PBAPI;
use WP_Error;
use HTTP_BRIDGE\Settings_Store as Http_Store;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Post Bridge template class. Handles the data validation
 * and the use of template as post bridge creation strategy.
 */
class Post_Bridge_Template {

	/**
	 * Handles the template id;
	 *
	 * @var string
	 */
	protected $id;

	/**
	 * Handles the template addon name.
	 *
	 * @var string
	 */
	protected $addon;

	/**
	 * Handles the template data.
	 *
	 * @var array
	 */
	private $data;

	/**
	 * Handles the common template data json schema. The schema is common for all
	 * Post_Bridge_Templates.
	 *
	 * @param string $addon Addon name.
	 *
	 * @return array
	 */
	public static function schema( $addon = null ) {
		$backend_schema    = PBAPI::get_backend_schema();
		$bridge_schema     = PBAPI::get_bridge_schema( $addon );
		$credential_schema = PBAPI::get_credential_schema();

		$schema = array(
			'$schema'              => 'http://json-schema.org/draft-04/schema#',
			'title'                => 'post-bridge-template',
			'type'                 => 'object',
			'properties'           => array(
				'name'        => array(
					'title'       => _x(
						'Name',
						'Bridge template schema',
						'posts-bridge'
					),
					'description' => __(
						'Internal and unique name of the template',
						'posts-bridge'
					),
					'type'        => 'string',
					'minLength'   => 1,
				),
				'title'       => array(
					'title'       => _x(
						'Title',
						'Bridge template schema',
						'posts-bridge'
					),
					'description' => __(
						'Public title of the template',
						'posts-bridge'
					),
					'type'        => 'string',
					'minLength'   => 1,
				),
				'description' => array(
					'title'       => _x(
						'Description',
						'Bridge template schema',
						'posts-bridge'
					),
					'description' => __(
						'Short description of the template purpose',
						'posts-bridge'
					),
					'type'        => 'string',
					'default'     => '',
				),
				'fields'      => array(
					'title'       => _x(
						'Fields',
						'Bridge template schema',
						'posts-bridge'
					),
					'description' => __(
						'Template fields to be filled by the user',
						'posts-bridge'
					),
					'type'        => 'array',
					'items'       => array(
						'type'                 => 'object',
						'properties'           => array(
							'ref'         => array(
								'type'    => 'string',
								'pattern' => '^#.+',
							),
							'name'        => array(
								'type'      => 'string',
								'minLength' => 1,
							),
							'label'       => array(
								'type'      => 'string',
								'minLength' => 1,
							),
							'description' => array( 'type' => 'string' ),
							'type'        => array(
								'type' => 'string',
								'enum' => array(
									'text',
									'number',
									'select',
									'boolean',
									'email',
									'url',
								),
							),
							'required'    => array( 'type' => 'boolean' ),
							'value'       => array(
								'type' => array(
									'integer',
									'number',
									'string',
									'array',
									'boolean',
								),
							),
							'default'     => array(
								'type' => array(
									'integer',
									'number',
									'string',
									'array',
									'boolean',
								),
							),
							'options'     => array(
								'anyOf' => array(
									array(
										'description' => __(
											'List of field options',
											'posts-bridge'
										),
										'type'        => 'array',
										'items'       => array(
											'type'       => 'object',
											'properties' => array(
												'label' => array(
													'type' => 'string',
												),
												'value' => array(
													'type' => 'string',
												),
											),
											'required'   => array( 'value', 'label' ),
										),
										'uniqueItems' => true,
									),
									array(
										'description' => __(
											'How to get options from the addon API',
											'posts-bridge'
										),
										'type'        => 'object',
										'properties'  => array(
											'endpoint' => array(
												'description' => __(
													'Endpoint to get values from',
													'posts-bridge'
												),
												'type' => 'string',
											),
											'finger'   => array(
												'description' => __(
													'Fingers to get values from the endpoint response',
													'posts-bridge'
												),
												'oneOf' => array(
													array(
														'type' => 'object',
														'properties' => array(
															'value' => array(
																'type' =>
																	'string',
															),
															'label' => array(
																'type' =>
																	'string',
															),
														),
														'required' => array( 'value' ),
													),
													array(
														'type' => 'string',
													),
												),
											),
										),
										'required'    => array( 'endpoint', 'finger' ),
									),
								),
							),
							'enum'        => array(
								'type'        => 'array',
								'items'       => array(
									'type' => array( 'integer', 'number', 'string' ),
								),
								'uniqueItems' => true,
							),
							'min'         => array( 'type' => 'integer' ),
							'max'         => array( 'type' => 'integer' ),
							'multiple'    => array( 'type' => 'boolean' ),
						),
						'required'             => array( 'ref', 'name', 'type' ),
						'additionalProperties' => true,
					),
				),
				'bridge'      => self::child_schema_to_template(
					$bridge_schema,
					_x( 'Bridge', 'Bridge template schema', 'posts-bridge' )
				),
				'backend'     => self::child_schema_to_template(
					$backend_schema,
					_x( 'Backend', 'Bridge template schema', 'posts-bridge' )
				),
				'credential'  => self::child_schema_to_template(
					$credential_schema,
					_x( 'Credential', 'Bridge template schema', 'posts-bridge' )
				),
			),
			'additionalProperties' => false,
			'required'             => array( 'name', 'title', 'fields', 'backend', 'bridge' ),
		);

		if ( ! $addon ) {
			return $schema;
		}

		return apply_filters( 'posts_bridge_template_schema', $schema, $addon );
	}

	private static function child_schema_to_template( $schema, $title ) {
		if ( isset( $schema['oneOf'] ) ) {
			$schema['oneOf'] = array_map(
				static function ( $schema ) use (
					$title
				) {
					$title = $schema['title'] ?? $title;
					return self::child_schema_to_template( $schema, $title );
				},
				$schema['oneOf']
			);
			return $schema;
		} elseif ( isset( $schema['anyOf'] ) ) {
			$schema['anyOf'] = array_map(
				static function ( $schema ) use (
					$title
				) {
					$title = $schema['title'] ?? $title;
					return self::child_schema_to_template( $schema, $title );
				},
				$schema['anyOf']
			);
			return $schema;
		}

		foreach ( $schema['properties'] as &$prop_schema ) {
			if ( $prop_schema['type'] === 'string' ) {
				$prop_schema['default'] = '';
				unset( $prop_schema['minLength'] );
				unset( $prop_schema['pattern'] );
				unset( $prop_schema['format'] );
			} elseif ( $prop_schema['type'] === 'array' ) {
				$prop_schema['default'] = array();
				unset( $prop_schema['minItems'] );
			}
		}

		if ( ! isset( $schema['default'] ) ) {
			$schema['default'] = array();
		}

		$schema['title'] = $title;
		return $schema;
	}

	/**
	 * Template default data getter.
	 *
	 * @param string $addon Template addon namespace.
	 * @param array  $schema Template schema.
	 *
	 * @return array
	 */
	protected static function defaults( $addon = null, $schema = null ) {
		if ( ! is_array( $schema ) ) {
			$schema = static::schema( $addon );
		}

		return apply_filters(
			'posts_bridge_template_defaults',
			array(
				'integrations' => array(),
				'fields'       => array(
					array(
						'ref'      => '#backend',
						'name'     => 'name',
						'label'    => __( 'Name', 'posts-bridge' ),
						'type'     => 'text',
						'required' => true,
					),
					array(
						'ref'      => '#backend',
						'name'     => 'base_url',
						'label'    => __( 'Base URL', 'posts-bridge' ),
						'type'     => 'url',
						'required' => true,
						'default'  => 'https://',
						'format'   => 'uri',
					),
					array(
						'ref'      => '#bridge',
						'name'     => 'post_type',
						'label'    => __( 'Post Type', 'posts-bridge' ),
						'type'     => 'select',
						'options'  => array_map(
							function ( $type ) {
								return array(
									'value' => $type,
									'label' => $type,
								);
							},
							PBAPI::get_post_types()
						),
						'required' => true,
						'default'  => 'post',
					),
					array(
						'ref'      => '#bridge',
						'name'     => 'foreign_key',
						'label'    => __( 'Foreign Key', 'posts-bridge' ),
						'type'     => 'text',
						'required' => true,
						'default'  => 'id',
					),
					array(
						'ref'      => '#bridge',
						'name'     => 'endpoint',
						'label'    => __( 'Endpoint', 'posts-bridge' ),
						'type'     => 'text',
						'required' => true,
						'default'  => '',
					),
					array(
						'ref'      => '#bridge',
						'name'     => 'method',
						'label'    => __( 'Method', 'posts-bridge' ),
						'type'     => 'options',
						'options'  => array(
							array(
								'label' => 'GET',
								'value' => 'GET',
							),
							array(
								'label' => 'POST',
								'value' => 'POST',
							),
							array(
								'label' => 'PUT',
								'value' => 'PUT',
							),
							array(
								'label' => 'PATCH',
								'value' => 'PATCH',
							),
							array(
								'label' => 'DELETE',
								'value' => 'DELETE',
							),
						),
						'required' => true,
						'default'  => 'POST',
					),
				),
				'bridge'       => array(
					'post_type' => 'post',
					'endpoint'  => '',
					'method'    => 'POST',
					'mappers'   => array(),
				),
				'backend'      => array(
					'headers' => array(
						array(
							'name'  => 'Content-Type',
							'value' => 'application/json',
						),
					),
				),
			),
			$addon,
			$schema
		);
	}

	/**
	 * Store template attribute values, validates data and binds the
	 * instance to custom posts bridge template hooks.
	 *
	 * @param string $name Template name.
	 * @param array  $data Template data.
	 */
	public function __construct( $data, $addon ) {
		$this->addon = $addon;
		$this->data  = $this->validate( $data );

		if ( $this->is_valid ) {
			$this->id = $this->addon . '-' . $data['name'];
		}
	}

	/**
	 * Magic method to proxy private template attributes and data.
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
			case 'data':
				return $this->data;
			case 'is_valid':
				return ! is_wp_error( $this->data ) &&
					Addon::addon( $this->addon ) !== null;
			default:
				if ( ! $this->is_valid ) {
					return;
				}

				return $this->data[ $name ] ?? null;
		}
	}

	/**
	 * Validates input data against the template schema.
	 *
	 * @param array $data Input data.
	 *
	 * @return array|WP_Error Validated data.
	 */
	private function validate( $data ) {
		$schema   = static::schema( $this->addon );
		$defaults = static::defaults( $this->addon, $schema );

		$data = wpct_plugin_merge_object( $data, $defaults, $schema );
		return wpct_plugin_sanitize_with_schema( $data, $schema );
	}

	/**
	 * Decorates the template data for REST responses.
	 *
	 * @return array REST data.
	 */
	public function data() {
		if ( ! $this->is_valid ) {
			return;
		}

		return array_merge(
			array(
				'id'    => $this->id,
				'addon' => $this->addon,
			),
			$this->data
		);
	}

	/**
	 * Applies the input fields with the template's data to
	 * create a bridge.
	 *
	 * @param array $fields User input fields data.
	 */
	public function use( $fields ) {
		if ( ! $this->is_valid ) {
			return new WP_Error(
				'invalid_template',
				__( 'The target template is invalid', 'posts-bridge' )
			);
		}

		$template = $this->data;
		$schema   = static::schema( $this->addon );

		// Add constants to the user fields
		foreach ( $template['fields'] as $field ) {
			if ( ! empty( $field['value'] ) ) {
				$fields[] = $field;
			}
		}

		$all_fields = wpct_plugin_merge_collection(
			$fields,
			$template['fields'],
			$schema['properties']['fields']['items']
		);

		$requireds = array_filter(
			$all_fields,
			static function ( $field ) {
				return ( $field['required'] ?? false ) && ! isset( $field['value'] );
			}
		);

		if ( count( $requireds ) || count( $fields ) > count( $all_fields ) ) {
			return new WP_Error(
				'invalid_fields',
				__( 'Invalid template fields', 'posts-bridge' )
			);
		}

		$data = $template;
		foreach ( $fields as $field ) {
			$is_required = $field['required'] ?? false;

			$field_schema             = $schema['properties']['fields']['items'];
			$field_schema['required'] = array( 'ref', 'name' );

			if ( $is_required ) {
				$field_schema['required'][] = 'value';
			}

			$field = wpct_plugin_sanitize_with_schema( $field, $field_schema );

			if ( is_wp_error( $field ) ) {
				return new WP_Error(
					'invalid_field',
					sprintf(
						__(
							/* translators: %s: Field name */
							'Field `%s` does not match the schema',
							'posts-bridge'
						),
						$field['name']
					)
				);
			}

			if ( ! isset( $field['value'] ) ) {
				continue;
			}

			if ( is_array( $field['value'] ) && empty( $field['type'] ) ) {
				continue;
			}

			if ( $field['value'] === '' ) {
				continue;
			}

			if ( $field['type'] === 'boolean' ) {
				if ( ! isset( $field['value'][0] ) ) {
					continue;
				} else {
					$field['value'] = '1';
				}
			}

			if (
				$field['ref'] === '#backend/headers[]' ||
				$field['ref'] === '#bridge/custom_fields[]'
			) {
				$field['value'] = array(
					'name'  => $field['name'],
					'value' => $field['value'] ?? null,
				);
			}

			$keys = explode( '/', substr( $field['ref'], 1 ) );
			$leaf = &$data;
			foreach ( $keys as $key ) {
				$clean_key = str_replace( '[]', '', $key );
				if ( ! isset( $leaf[ $clean_key ] ) ) {
					return new WP_Error(
						'invalid_ref',
						sprintf(
							__(
								/* translators: %s: ref value */
								'Invalid template field ref `%s`',
								'posts-bridge'
							),
							$field['ref']
						)
					);
				}

				$leaf = &$leaf[ $clean_key ];
			}

			if ( substr( $key, -2 ) === '[]' ) {
				if ( isset( $field['index'] ) ) {
					$leaf[ $field['index'] ] = $field['value'];
				} else {
					$leaf[] = $field['value'];
				}
			} elseif ( isset( $field['value'] ) ) {
				$leaf[ $field['name'] ] = $field['value'];
			}
		}

		$data = apply_filters(
			'posts_bridge_template_data',
			$data,
			$this->id,
			$this
		);

		if ( is_wp_error( $data ) ) {
			return $data;
		} elseif ( empty( $data ) ) {
			return new WP_Error(
				'template_creation_error',
				__( 'There is a problem with the template data', 'posts-bridge' )
			);
		}

		try {
			$create_credential = false;
			if ( ! empty( $data['credential']['name'] ) ) {
				$create_credential = ! $this->credential_exists(
					$data['credential']['name']
				);

				if ( $create_credential ) {
					$result = $this->create_credential( $data['credential'] );

					if ( ! $result ) {
						return new WP_Error(
							'credential_creation_error',
							__(
								'Posts Bridge can\'t create the credential',
								'posts-bridge',
								array(
									'status' => 400,
									'data'   => $data['credential'],
								)
							)
						);
					}
				}

				$data['backend']['credential'] = $data['credential']['name'];
			}

			$create_backend = ! $this->backend_exists( $data['backend']['name'] );
			if ( $create_backend ) {
				$result = $this->create_backend( $data['backend'] );

				if ( ! $result ) {
					if ( $create_credential ) {
						$this->remove_credential( $data['credential']['name'] );
					}

					return new WP_Error(
						'backend_creation_error',
						__(
							'Posts Bridge can\'t create the backend',
							'posts-bridge',
							array(
								'status' => 400,
								'data'   => $data['backend'],
							)
						)
					);
				}
			}

			$data['bridge']['backend'] = $data['backend']['name'];

			$bridge_created = $this->create_bridge( $data['bridge'] );

			if ( ! $bridge_created ) {
				if ( $create_credential ) {
					$this->remove_credential( $data['credential']['name'] );
				}

				if ( $create_backend ) {
					$this->remove_backend( $data['backend']['name'] );
				}

				return new WP_Error(
					'bridge_creation_error',
					__(
						'Posts Bridge can\'t create the post bridge',
						'posts-bridge',
						array(
							'status' => 400,
							'data'   => $data['bridge'],
						)
					)
				);
			}
		} catch ( Error | Exception $e ) {
			if ( isset( $create_credential ) && $create_credential ) {
				$this->remove_credential( $data['credential']['name'] );
			}

			if ( isset( $create_backend ) && $create_backend ) {
				$this->remove_backend( $data['backend']['name'] );
			}

			if ( isset( $bridge_created ) && $bridge_created ) {
				$this->remove_bridge( $data['bridge']['post_type'] );
			}

			return new WP_Error(
				'internal_server_error',
				$e->getMessage(),
				array(
					'status' => 500,
				)
			);
		}

		return true;
	}

	/**
	 * Checks if a backend with the given name exists on the settings store.
	 *
	 * @param string $name Backend name.
	 *
	 * @return boolean
	 */
	final protected function backend_exists( $name ) {
		$backends = Http_Store::setting( 'general' )->backends ?: array();
		return array_search( $name, array_column( $backends, 'name' ) ) !== false;
	}

	/**
	 * Stores the backend data on the settings store.
	 *
	 * @param array $data Backend data.
	 *
	 * @return boolean Creation result.
	 */
	private function create_backend( $data ) {
		$setting  = Http_Store::setting( 'general' );
		$backends = $setting->backends ?: array();

		do_action_ref_array(
			'posts_bridge_before_template_backend',
			array(
				$data,
				$this->name,
				$this,
			)
		);

		$setting->backends = array_merge( $backends, array( $data ) );
		$setting->flush();

		$is_valid = $this->backend_exists( $data['name'] );
		if ( ! $is_valid ) {
			return;
		}

		do_action( 'posts_bridge_template_backend', $data, $this->id, $this );
		return true;
	}

	/**
	 * Removes backend from the settings store by name.
	 *
	 * @param string $name Backend name.
	 */
	private function remove_backend( $name ) {
		$setting  = Http_Store::setting( 'general' );
		$backends = $setting->backends ?: array();

		$setting->backends = array_filter(
			$backends,
			static function (
				$backend
			) use ( $name ) {
				return $backend['name'] !== $name;
			}
		);
	}

	/**
	 * Checks if a bridge with the given post type exists on the settings store.
	 *
	 * @param string $post_type Bridge post type.
	 *
	 * @return boolean
	 */
	private function bridge_exists( $post_type ) {
		$bridges = Settings_Store::setting( $this->addon )->bridges ?: array();
		return array_search( $post_type, array_column( $bridges, 'post_type' ) ) !==
			false;
	}

	/**
	 * Stores the post bridge data on the settings store.
	 *
	 * @param array $data Post bridge data.
	 *
	 * @return boolean Creation result.
	 */
	private function create_bridge( $data ) {
		$name_conflict = $this->bridge_exists( $data['post_type'] );
		if ( $name_conflict ) {
			return;
		}

		$setting = Settings_Store::setting( $this->addon );
		$bridges = $setting->bridges ?: array();

		do_action_ref_array(
			'posts_bridge_before_template_bridge',
			array(
				$data,
				$this->name,
				$this,
			)
		);

		$setting->bridges = array_merge( $bridges, array( $data ) );
		$setting->flush();

		$is_valid = $this->bridge_exists( $data['post_type'] );
		if ( ! $is_valid ) {
			return;
		}

		do_action( 'posts_bridge_template_bridge', $data, $this->id, $this );
		return true;
	}

	/**
	 * Removes a bridge from the settings store by post type.
	 *
	 * @param string $post_type Bridge post type.
	 */
	private function remove_bridge( $post_type ) {
		$setting = Settings_Store::setting( $this->addon );
		$bridges = $setting->bridges ?: array();

		$setting->bridges = array_filter(
			$bridges,
			static function (
				$bridge
			) use ( $post_type ) {
				return $bridge['post_type'] !== $post_type;
			}
		);
	}

	/**
	 * Checks if a credential with the given name exists on the settings store.
	 *
	 * @param string $name Credential name.
	 *
	 * @return boolean
	 */
	private function credential_exists( $name ) {
		$credentials = Http_Store::setting( 'general' )->credentials ?: array();
		return array_search( $name, array_column( $credentials, 'name' ) ) !==
			false;
	}

	/**
	 * Stores the bridge credential data on the settings store.
	 *
	 * @param array $data Credential data.
	 *
	 * @return boolean Creation result.
	 */
	private function create_credential( $data ) {
		$setting     = Http_Store::setting( 'general' );
		$credentials = $setting->credentials ?: array();

		if ( ! is_array( $credentials ) ) {
			return;
		}

		do_action_ref_array(
			'posts_bridge_before_template_credential',
			array(
				$data,
				$this->name,
				$this,
			)
		);

		$setting->credentials = array_merge( $credentials, array( $data ) );
		$setting->flush();

		$is_valid = $this->credential_exists( $data['name'] );
		if ( ! $is_valid ) {
			return;
		}

		do_action( 'posts_bridge_template_credential', $data, $this->id, $this );
		return true;
	}

	/**
	 * Removes a credential from the settings store by name.
	 *
	 * @param string $name Credential name.
	 */
	private function remove_credential( $name ) {
		$setting     = Http_Store::setting( 'general' );
		$credentials = $setting->credentials ?: array();

		$setting->credentials = array_filter(
			$credentials,
			static function (
				$credential
			) use ( $name ) {
				return $credential['name'] !== $name;
			}
		);
	}
}
