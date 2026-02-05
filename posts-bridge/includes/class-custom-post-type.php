<?php
/**
 * Class Custom_Post_Type
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Custom post types manager
 */
class Custom_Post_Type {

	/**
	 * Handle internat WP post types.
	 *
	 * @var array
	 */
	public const INTERNAL_TYPES = array(
		'attachment',
		'revision',
		'nav_menu_item',
		'custom_css',
		'customize_changeset',
		'oembed_cache',
		'user_request',
		'wp_block',
		'wp_template',
		'wp_template_part',
		'wp_global_styles',
		'wp_navigation',
		'wp_font_family',
		'wp_font_face',
	);

	/**
	 * Handle post types registry option name.
	 *
	 * @var string
	 */
	private const OPTION_NAME = 'posts_bridge_custom_post_types';

	/**
	 * Handle custom post types registry.
	 *
	 * @var array|null
	 */
	private static $registry = null;

	/**
	 * Custom post type schema getter.
	 *
	 * @return array
	 */
	public static function schema() {
		return array(
			'type'                 => 'object',
			'properties'           => array(
				'label'               => array(
					'description' => __(
						'Plural name of the post type shown in the menu',
						'posts-bridge'
					),
					'type'        => 'string',
					'required'    => false,
					'default'     => '',
				),
				'singular_label'      => array(
					'description' => __(
						'Singluar name of the post type shown in the menu',
						'posts-bridge'
					),
					'type'        => 'string',
					'required'    => false,
					'default'     => '',
				),
				'description'         => array(
					'description' => __(
						'A short descriptive summary of what the post type is',
						'posts-bridge'
					),
					'type'        => 'string',
					'required'    => false,
					'default'     => '',
				),
				'public'              => array(
					'description' => __(
						'Whether a post type is intended for use publicly either via the admin interface or by front-end users',
						'posts-bridge'
					),
					'default'     => true,
					'type'        => 'boolean',
					'required'    => false,
				),
				'exclude_from_search' => array(
					'description' => __(
						'Whether to exclude posts with this post type from front end search results. Default is the opposite value of $public',
						'posts-bridge'
					),
					'default'     => false,
					'type'        => 'boolean',
					'required'    => false,
				),
				'publicly_queryable'  => array(
					'description' => __(
						'Whether queries can be performed on the front end for the post type as part of parse_request(). Default is inherited from $public',
						'posts-bridge'
					),
					'default'     => true,
					'type'        => 'boolean',
					'required'    => false,
				),
				'show_ui'             => array(
					'description' => __(
						'Whether to generate and allow a UI for managing this post type in the admin',
						'posts-bridge'
					),
					'default'     => true,
					'type'        => 'boolean',
					'required'    => false,
				),
				'show_in_menu'        => array(
					'description' => __(
						'Where to show the post type in the admin menu. To work, $show_ui must be true',
						'posts-bridge'
					),
					'default'     => true,
					'type'        => 'boolean',
					'required'    => false,
				),
				'show_in_nav_menus'   => array(
					'description' => __(
						'Makes this post type available for selection in navigation menus',
						'posts-bridge'
					),
					'default'     => true,
					'type'        => 'boolean',
					'required'    => false,
				),
				'show_in_admin_bar'   => array(
					'description' => __(
						'Makes this post type available via the admin bar, Default is value of $show_in_menu',
						'posts-bridge'
					),
					'type'        => 'boolean',
					'required'    => false,
					'default'     => true,
				),
				'show_in_rest'        => array(
					'description' => __(
						'Whether to include the post type in the REST API. Set this to true for the post type to be available in the block editor',
						'posts-bridge'
					),
					'default'     => true,
					'type'        => 'boolean',
					'required'    => false,
				),
				'rest_base'           => array(
					'description' => __(
						'To change the base URL of REST API route. Default is $post_type',
						'posts-bridge'
					),
					'type'        => 'string',
					'required'    => false,
					'default'     => '',
				),
				'menu_position'       => array(
					'description' => __(
						'The position in the menu order the post type should appear',
						'posts-bridge'
					),
					'type'        => 'integer',
					'required'    => false,
					'default'     => 10,
				),
				'capability_type'     => array(
					'description' => __(
						'The string to use to build the read, edit, and delete capabilities',
						'posts-bridge'
					),
					'default'     => 'post',
					'type'        => 'string',
					'required'    => false,
				),
				'map_meta_cap'        => array(
					'description' => __(
						'Whether to use the internal default meta capability handling',
						'posts-bridge'
					),
					'default'     => true,
					'type'        => 'boolean',
					'required'    => false,
				),
				'supports'            => array(
					'description' => __(
						'Core feature(s) the post type supports',
						'posts-bridge'
					),
					'default'     => array(
						'title',
						'thumbnail',
						'excerpt',
						'custom-fields',
					),
					'type'        => 'array',
					'items'       => array( 'type' => 'string' ),
					'enum'        => array(
						'title',
						'editor',
						'comments',
						'revisions',
						'trackbacks',
						'author',
						'excerpt',
						'page-attributes',
						'thumbnail',
						'custom-fields',
						'post-formats',
					),
					'uniqueItems' => true,
					'required'    => false,
				),
				'taxonomies'          => array(
					'description' => __(
						'An array of taxonomy identifiers that will be registered for the post type',
						'posts-bridge'
					),
					'type'        => 'string',
					'required'    => false,
					'default'     => 'category,post_tag',
				),
				'has_archive'         => array(
					'description' => __(
						'Whether there should be post type archives, or if a string, the archive slug to use',
						'posts-bridge'
					),
					'default'     => false,
					'type'        => 'boolean',
					'required'    => false,
				),
				'rewrite'             => array(
					'description' => __(
						'Triggers the handling of slug rewrite for this post type. Default is $post_type key',
						'posts-bridge'
					),
					'type'        => 'string',
					'required'    => false,
					'default'     => '',
				),
				'query_var'           => array(
					'description' => __(
						'Sets the query_var key for this post type. Defaults to $post_type key',
						'posts-bridge'
					),
					'type'        => 'string',
					'required'    => false,
					'default'     => '',
				),
				'meta'                => array(
					'description' => __(
						'Registered post meta',
						'posts-bridge',
					),
					'type'        => array(
						'type'  => 'array',
						'items' => array(
							'type'       => 'object',
							'properties' => array(
								'name'         => array( 'type' => 'string' ),
								'type'         => array(
									'type'    => 'string',
									'enum'    => array(
										'string',
										'integer',
										'number',
										'boolean',
										'array',
										'object',
									),
									'default' => 'string',
								),
								'default'      => array( 'type' => 'string' ),
								'single'       => array( 'type' => 'boolean' ),
								'show_in_rest' => array( 'type' => 'boolean' ),
							),
							'required'   => array( 'name', 'type' ),
						),
					),
					'required'    => true,
					'default'     => array(),
				),
			),
			'additionalProperties' => false,
		);
	}

	/**
	 * Public loader.
	 */
	public static function load_custom_post_types() {
		add_action(
			'add_option_' . self::OPTION_NAME,
			static function ( $option, $value ) {
				self::$registry = $value;
			},
			10,
			2
		);

		add_action(
			'update_option_' . self::OPTION_NAME,
			function ( $from, $to ) {
				self::$registry = $to;
			},
			10,
			2
		);

		add_action(
			'delete_option_' . self::OPTION_NAME,
			function () {
				self::$registry = null;
			},
			10,
			0
		);

		self::handle_setting();

		add_action(
			'init',
			static function () {
				self::init();
			},
			50
		);

		add_filter(
			'posts_bridge_custom_post_types',
			static function () {
				return self::registry();
			},
			10,
			0
		);
	}

	/**
	 * Registers a post type.
	 *
	 * @param array $data Post type data.
	 *
	 * @return bool
	 */
	public static function register( $data ) {
		$registry = self::registry();

		$name              = sanitize_key( $data['name'] );
		$registry[ $name ] = self::sanitize_args( $name, $data );

		update_option( self::OPTION_NAME, $registry );

		$success = self::register_post_type( $name, $registry[ $name ] );
		if ( is_wp_error( $success ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Unregisters a post type by name.
	 *
	 * @param string $name Type name.
	 *
	 * @return bool
	 */
	public static function unregister( $name ) {
		$name = sanitize_key( $name );

		$registry = self::registry();
		unset( $registry[ $name ] );

		update_option( self::OPTION_NAME, $registry );

		$success = unregister_post_type( $name );
		if ( is_wp_error( $success ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Post types registry getter.
	 *
	 * @return array
	 */
	private static function registry() {
		if ( is_array( self::$registry ) ) {
			return self::$registry;
		}

		self::$registry = (array) get_option( self::OPTION_NAME, array() );
		return self::$registry;
	}

	/**
	 * Init hook callback. Registers in WordPress the post types from
	 * the internal registry.
	 */
	private static function init() {
		$cpts       = self::registry();
		$post_types = get_post_types();

		foreach ( $cpts as $name => $args ) {
			if ( isset( $post_types[ $name ] ) ) {
				continue;
			}

			self::register_post_type( $name, $args );
		}
	}

	/**
	 * Gets the list of available post types excluding internals.
	 *
	 * @return string[]
	 */
	public static function post_types() {
		$post_types = array_keys( get_post_types() );

		return array_values(
			array_filter(
				$post_types,
				static function ( $post_type ) {
					return ! in_array( $post_type, self::INTERNAL_TYPES, true );
				}
			)
		);
	}

	/**
	 * Registers a post type and its meta.
	 *
	 * @param string $name Type name.
	 * @param array  $args Registration arguments.
	 *
	 * @return WP_Post_Type|WP_Error
	 */
	private static function register_post_type( $name, $args ) {
		$args['labels'] = array(
			'name'          => $args['label'],
			'singular_name' => $args['singular_label'],
		);

		unset( $args['label'] );
		unset( $args['singular_label'] );

		if ( is_string( $args['rewrite'] ) ) {
			$args['rewrite'] = array( 'slug' => $args['rewrite'] );
		}

		if ( is_string( $args['taxonomies'] ) ) {
			$args['taxonomies'] = explode( ',', $args['taxonomies'] );
		}

		$meta   = $args['meta'] ?? array();
		$result = register_post_type( $name, $args );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		foreach ( $meta as $field ) {
			register_post_meta(
				$name,
				$field['name'],
				array(
					'type'         => $field['type'],
					'default'      => $field['default'] ?? '',
					'single'       => $field['single'] ?? true,
					'show_in_rest' => true,
				)
			);
		}

		return $result;
	}

	/**
	 * Settings store interceptors to insert types list in the general setting.
	 */
	private static function handle_setting() {
		Settings_Store::ready(
			static function ( $store ) {
				$store::use_getter(
					'general',
					static function ( $data ) {
						$data['post_types'] = self::post_types();
						return $data;
					}
				);

				$store::use_setter(
					'general',
					static function ( $data ) {
						if ( isset( $data['post_types'] ) ) {
							unset( $data['post_types'] );
						}
						return $data;
					},
					9
				);
			}
		);
	}

	/**
	 * Post type registration arguments sanitizer.
	 *
	 * @param string $name Type name.
	 * @param array  $args Post type data.
	 *
	 * @return array
	 */
	private static function sanitize_args( $name, $args ) {
		$public  = boolval( $args['public'] ?? true );
		$show_ui = boolval( $args['show_ui'] ?? true );

		return array(
			'label'               => ! empty( $args['label'] ) && is_string( $args['label'] )
				? sanitize_text_field( $args['label'] )
				: $name,
			'singular_label'      => ! empty( $args['singular_label'] ) && is_string( $args['singular_label'] )
				? sanitize_text_field( $args['singular_label'] )
				: $name,
			'description'         => esc_html( $args['description'] ?? '' ),
			'public'              => $public,
			'exclude_from_search' => boolval( $args['exclude_from_search'] ?? ! $public ),
			'publicly_queryable'  => boolval( $args['queryable'] ?? $public ),
			'show_ui'             => $show_ui,
			'show_in_menu'        => boolval( $args['show_in_menu'] ?? true ) && $show_ui,
			'show_in_nav_menus'   => boolval( $args['show_in_nav_menus'] ?? $public ),
			'show_in_admin_bar'   => boolval( $args['show_in_admin_bar'] ?? true ) && $show_ui,
			'show_in_rest'        => boolval( $args['show_in_rest'] ?? true ),
			'rest_base'           => ! empty( $args['rest_base'] ) && is_string( $args['rest_base'] )
				? sanitize_title( $args['rest_base'] )
				: $name,
			'menu_position'       => isset( $args['menu_position'] )
				? (int) $args['menu_position']
				: null,
			'capability_type'     => ! empty( $args['capability_type'] ) && is_string( $args['capability_type'] )
				? sanitize_key( $args['capability_type'] )
				: 'post',
			'map_meta_cap'        => boolval( $args['map_meta_cap'] ?? true ),
			'supports'            => isset( $args['supports'] ) && is_array( $args['supports'] )
				? array_map(
					function ( $token ) {
						return trim( $token );
					},
					array_filter(
						$args['supports'],
						static function (
							$token
						) {
							$token  = trim( $token );
							$tokens = self::schema()['properties']['supports']['enum'];

							return in_array( $token, $tokens, true );
						}
					)
				)
				: self::schema()['properties']['supports']['default'],
			'taxonomies'          => isset( $args['taxonomies'] ) && is_string( $args['taxonomies'] )
				? implode(
					',',
					array_map(
						function ( $tax ) {
							return sanitize_text_field( trim( $tax ) );
						},
						explode( ',', $args['taxonomies'] )
					)
				)
				: array(),
			'has_archive'         => boolval( $args['has_archive'] ?? false ),
			'rewrite'             => ! empty( $args['rewrite'] ) && is_string( $args['rewrite'] )
				? sanitize_title( $args['rest_base'] )
				: $name,
			'query_var'           => ! empty( $args['query_var'] ) && is_string( $args['query_var'] )
				? sanitize_key( $args['query_var'] )
				: $name,
			'meta'                => $args['meta'] ?? array(),
		);
	}
}
