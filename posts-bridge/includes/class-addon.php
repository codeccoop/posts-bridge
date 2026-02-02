<?php
/**
 * Class Addon
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use Error;
use TypeError;
use PBAPI;
use WPCT_PLUGIN\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Base addon class to be used by addons.
 */
class Addon extends Singleton {

	/**
	 * Handles active addon instance references.
	 *
	 * @var array<string, Addon>
	 */
	private static $addons = array();

	/**
	 * Handles addon's registry option name.
	 *
	 * @var string registry
	 */
	private const REGISTRY = 'posts_bridge_addons';

	/**
	 * Handles addon public title.
	 *
	 * @var string
	 */
	public const TITLE = '';

	/**
	 * Handles addon's API name.
	 *
	 * @var string
	 */
	public const NAME = '';

	/**
	 * Handles addon's custom bridge class name.
	 *
	 * @var string
	 */
	public const BRIDGE = '\POSTS_BRIDGE\Post_Bridge';

	/**
	 * Addon's default config getter.
	 *
	 * @return array
	 */
	public static function schema() {
		$bridge_schema = PBAPI::get_bridge_schema( static::NAME );

		return array(
			'type'       => 'object',
			'properties' => array(
				'title'       => array( 'type' => 'string' ),
				'description' => array(
					'type'    => 'string',
					'default' => '',
				),
				'bridges'     => array(
					'type'    => 'array',
					'items'   => $bridge_schema,
					'default' => array(),
				),
			),
			'required'   => array( 'title', 'bridges' ),
		);
	}

	/**
	 * Addon's default data getter.
	 *
	 * @return array
	 */
	protected static function defaults() {
		return array(
			'title'   => static::TITLE,
			'bridges' => array(),
		);
	}

	/**
	 * Public singleton initializer.
	 *
	 * @param mixed[] ...$args Array of class constructor arguments.
	 */
	final public static function setup( ...$args ) {
		return static::get_instance( ...$args );
	}

	/**
	 * Public addons registry getter.
	 *
	 * @return array Addons registry state.
	 */
	final public static function registry() {
		$state      = get_option( self::REGISTRY, array( 'rest' => true ) ) ?: array();
		$addons_dir = POSTS_BRIDGE_ADDONS_DIR;
		$addons     = array_diff( scandir( $addons_dir ), array( '.', '..' ) );

		$registry = array();
		foreach ( $addons as $addon ) {
			$addon_dir = "{$addons_dir}/{$addon}";
			if ( ! is_dir( $addon_dir ) ) {
				continue;
			}

			$index = "{$addon_dir}/class-{$addon}-addon.php";
			if ( is_file( $index ) && is_readable( $index ) ) {
				$registry[ $addon ] = boolval( $state[ $addon ] ?? false );
			}
		}

		return $registry;
	}

	/**
	 * Updates the addons' registry state.
	 *
	 * @param array<string, boolean> $addons Addons registry state.
	 */
	private static function update_registry( $addons = array() ) {
		$registry = self::registry();
		foreach ( $addons as $addon => $enabled ) {
			if ( ! isset( $registry[ $addon ] ) ) {
				continue;
			}

			$registry[ $addon ] = (bool) $enabled;
		}

		update_option( self::REGISTRY, $registry );
	}

	/**
	 * Public addons list getter.
	 *
	 * @return Addon[] List of enabled addon instances.
	 */
	final public static function addons() {
		$addons = array();
		foreach ( self::$addons as $addon ) {
			if ( $addon->enabled ) {
				$addons[] = $addon;
			}
		}

		return $addons;
	}

	/**
	 * Addon instances getter.
	 *
	 * @param string $name Addon name.
	 *
	 * @return Addon|null
	 */
	final public static function addon( $name ) {
		return self::$addons[ $name ] ?? null;
	}

	/**
	 * Public addons loader.
	 */
	final public static function load_addons() {
		$addons_dir = POSTS_BRIDGE_ADDONS_DIR;
		$registry   = self::registry();
		foreach ( $registry as $addon => $enabled ) {
			require_once "{$addons_dir}/{$addon}/class-{$addon}-addon.php";

			if ( $enabled ) {
				self::$addons[ $addon ]->load();
			}
		}

		Settings_Store::ready(
			function ( $store ) {
				$store::use_getter(
					'general',
					static function ( $data ) {
						$registry = self::registry();
						$addons   = array();
						foreach ( self::$addons as $name => $addon ) {
							$logo_path = POSTS_BRIDGE_ADDONS_DIR . '/' . $addon::NAME . '/assets/logo.png';

							if ( is_file( $logo_path ) && is_readable( $logo_path ) ) {
								$logo = plugin_dir_url( $logo_path ) . 'logo.png';
							} else {
								$logo = '';
							}

							$addons[ $name ] = array(
								'name'    => $name,
								'title'   => $addon::TITLE,
								'enabled' => $registry[ $name ] ?? false,
								'logo'    => $logo,
							);
						}

						ksort( $addons );
						$addons = array_values( $addons );

						$addons = apply_filters( 'posts_bridge_addons', $addons );
						return array_merge( $data, array( 'addons' => $addons ) );
					}
				);

				$store::use_setter(
					'general',
					static function ( $data ) {
						if ( ! isset( $data['addons'] ) || ! is_array( $data['addons'] ) ) {
							return $data;
						}

						$registry = array();
						foreach ( $data['addons'] as $addon ) {
							$registry[ $addon['name'] ] = (bool) $addon['enabled'];
						}

						self::update_registry( $registry );

						unset( $data['addons'] );
						return $data;
					},
					9
				);
			}
		);
	}

	/**
	 * Middelware to the addon settings validation method to filter out of domain
	 * setting updates.
	 *
	 * @param array $data Setting data.
	 *
	 * @return array Validated setting data.
	 */
	private static function sanitize_setting( $data ) {
		if ( ! isset( $data['bridges'] ) ) {
			return $data;
		}

		$data['bridges'] = static::sanitize_bridges( $data['bridges'] );

		return $data;
	}

	/**
	 * Apply bridges setting data sanitization and validation.
	 *
	 * @param array $bridges Collection of bridges data.
	 *
	 * @return array
	 */
	private static function sanitize_bridges( $bridges ) {
		$post_types = PBAPI::get_post_types();

		$uniques   = array();
		$sanitized = array();

		$schema = PBAPI::get_bridge_schema( static::NAME );
		foreach ( $bridges as $bridge ) {
			$bridge['post_type'] = trim( $bridge['post_type'] );

			if ( ! in_array( $bridge['post_type'], $post_types, true ) ) {
				continue;
			}

			if ( in_array( $bridge['post_type'], $uniques, true ) ) {
				continue;
			}

			$bridge = static::sanitize_bridge( $bridge, $schema );
			if ( $bridge ) {
				$sanitized[] = $bridge;
				$uniques[]   = $bridge['post_type'];
			}
		}

		return $sanitized;
	}

	/**
	 * Common bridge sanitization method.
	 *
	 * @param array $bridge Bridge data.
	 * @param array $schema Bridge schema.
	 *
	 * @return array
	 */
	protected static function sanitize_bridge( $bridge, $schema ) {
		$backends = Settings_Store::setting( 'http' )->backends ?: array();

		foreach ( $backends as $candidate ) {
			if ( $candidate['name'] === $bridge['backend'] ) {
				$backend = $candidate;
				break;
			}
		}

		if ( ! isset( $backend ) ) {
			$bridge['backend'] = '';
		}

		$uniques = array();
		$mappers = array();
		foreach ( $bridge['field_mappers'] ?? array() as $mapper ) {
			if (
				empty( $mapper['name'] ) ||
				in_array( $mapper['name'], $uniques, true )
			) {
				continue;
			}

			$uniques[] = $mapper['name'];
			$mappers[] = $mapper;
		}

		$bridge['field_mappers'] = $mappers;

		$uniques = array();
		$mappers = array();
		foreach ( $bridge['tax_mappers'] ?? array() as $mapper ) {
			if (
				empty( $mapper['name'] ) ||
				in_array( $mapper['name'], $uniques, true )
			) {
				continue;
			}

			$uniques[] = $mapper['name'];
			$mappers[] = $mapper;
		}

		$bridge['tax_mappers'] = $mappers;

		$bridge['is_valid'] =
			$bridge['backend'] && $bridge['method'] && $bridge['endpoint'];

		$bridge['enabled'] = boolval( $bridge['enabled'] ?? true );
		return $bridge;
	}

	/**
	 * Handles the enabled state of the addon instance.
	 *
	 * @var bool
	 */
	public $enabled = false;

	/**
	 * Private class constructor. Add addons scripts as dependency to the
	 * plugin's scripts and setup settings hooks.
	 *
	 * @param mixed[] ...$args Array of class constructor arguments.
	 */
	protected function construct( ...$args ) {
		if ( empty( static::NAME ) || empty( static::TITLE ) ) {
			Logger::log( 'Skip invalid addon registration', Logger::DEBUG );
			Logger::log(
				'Addon name and title const are required',
				Logger::ERROR
			);
			return;
		}

		self::$addons[ static::NAME ] = $this;
	}

	/**
	 * Loads the addon.
	 */
	public function load() {
		add_filter(
			'posts_bridge_templates',
			static function ( $templates, $addon = null ) {
				if ( ! wp_is_numeric_array( $templates ) ) {
					$templates = array();
				}

				if ( $addon && static::NAME !== $addon ) {
					return $templates;
				}

				foreach ( static::load_templates() as $template ) {
					$templates[] = $template;
				}

				return $templates;
			},
			10,
			2
		);

		add_filter(
			'posts_bridge_bridges',
			static function ( $bridges, $addon = null ) {
				if ( ! wp_is_numeric_array( $bridges ) ) {
					$bridges = array();
				}

				if ( $addon && static::NAME !== $addon ) {
					return $bridges;
				}

				$setting = static::setting();
				if ( ! $setting ) {
					return $bridges;
				}

				foreach ( $setting->bridges ?: array() as $bridge_data ) {
					$bridge_class = static::BRIDGE;
					$bridges[]    = new $bridge_class( $bridge_data, static::NAME );
				}

				return $bridges;
			},
			10,
			2
		);

		add_filter(
			'posts_bridge_remote_cpts',
			static function ( $post_types, $addon = null ) {
				if ( ! wp_is_numeric_array( $post_types ) ) {
					$post_types = array();
				}

				if ( $addon && static::NAME !== $addon ) {
					return $post_types;
				}

				$setting = static::setting();
				if ( ! $setting ) {
					return $post_types;
				}

				foreach ( $setting->bridges ?: array() as $bridge_data ) {
					$post_types[] = $bridge_data['post_type'];
				}

				return $post_types;
			},
			10,
			2
		);

		Settings_Store::register_setting(
			static function ( $settings ) {
				$schema            = static::schema();
				$schema['name']    = static::NAME;
				$schema['default'] = static::defaults();

				$settings[] = $schema;
				return $settings;
			}
		);

		Settings_Store::ready(
			static function ( $store ) {
				$store::use_getter(
					static::NAME,
					static function ( $data ) {
						$templates = PBAPI::get_addon_templates( static::NAME );

						$data['templates'] = array_map(
							function ( $template ) {
								return array(
									'title' => $template->title,
									'name'  => $template->name,
								);
							},
							$templates
						);

						return $data;
					}
				);

				$store::use_setter(
					static::NAME,
					static function ( $data ) {
						if ( ! is_array( $data ) ) {
							return $data;
						}

						unset( $data['templates'] );
						return static::sanitize_setting( $data );
					},
					9
				);
			}
		);

		$this->enabled = true;
	}

	/**
	 * Addon's setting name getter.
	 *
	 * @return string
	 */
	final protected static function setting_name() {
		return 'posts-bridge_' . static::NAME;
	}

	/**
	 * Addon setting getter.
	 *
	 * @return Setting|null Setting instance.
	 */
	final protected static function setting() {
		return Posts_Bridge::setting( static::NAME );
	}

	/**
	 * Performs a request against the backend to check the connexion status.
	 *
	 * @param string $backend Target backend name.
	 *
	 * @return boolean|WP_Error
	 */
	public function ping( $backend ) {
		Logger::log( 'This adddon bridges has not known ping endpoint', Logger::ERROR );
		return true;
	}

	/**
	 * Performs a GET request against the backend endpoint and retrive the response data.
	 *
	 * @param string $endpoint Target endpoint name.
	 * @param string $backend Target backend name.
	 *
	 * @return array|WP_Error
	 */
	public function fetch( $endpoint, $backend ) {
		$bridge_class = self::BRIDGE;

		$bridge = new $bridge_class(
			array(
				'post_type'   => '_',
				'foreign_key' => 'id',
				'endpoint'    => $endpoint,
				'backend'     => $backend,
				'method'      => 'GET',
			),
		);

		return $bridge->fetch();
	}

	/**
	 * Performs an introspection of the backend endpoint and returns API fields
	 * and accepted content type.
	 *
	 * @param string $endpoint Target endpoint name.
	 * @param string $backend Target backend name.
	 *
	 * @return array|WP_Error
	 */
	public function get_endpoint_schema( $endpoint, $backend ) {
		return array();
	}

	/**
	 * Performs an introspection of the backend API and returns a list of available endpoints.
	 *
	 * @param string      $backend Target backend name.
	 * @param string|null $method HTTP method.
	 *
	 * @return array|WP_Error
	 */
	public function get_endpoints( $backend, $method = null ) {
		return array();
	}

	/**
	 * Autoload config files from a given addon's directory. Used to load
	 * template and job config files.
	 *
	 * @param string   $dir Path of the target directory.
	 * @param string[] $extensions Allowed file extensions.
	 *
	 * @return array Array with data from files.
	 */
	private static function autoload_dir( $dir, $extensions = array( 'php', 'json' ) ) {
		if ( ! is_readable( $dir ) || ! is_dir( $dir ) ) {
			return array();
		}

		static $load_cache;

		$files = array();
		foreach ( array_diff( scandir( $dir ), array( '.', '..' ) ) as $file ) {
			$file_path = $dir . '/' . $file;

			if ( is_file( $file_path ) && is_readable( $file_path ) ) {
				$files[] = $file_path;
			}
		}

		$loaded = array();
		foreach ( $files as $file_path ) {
			$file = basename( $file_path );
			$name = pathinfo( $file )['filename'];
			$ext  = pathinfo( $file )['extension'] ?? null;

			if ( ! in_array( $ext, $extensions, true ) ) {
				continue;
			}

			if ( isset( $load_cache[ $file_path ] ) ) {
				$loaded[] = $load_cache[ $file_path ];
				continue;
			}

			$data = null;
			if ( 'php' === $ext ) {
				$data = include_once $file_path;
			} elseif ( 'json' === $ext ) {
				// phpcs:disable Generic.CodeAnalysis.EmptyStatement
				try {
					$content = file_get_contents( $file_path );
					$data    = json_decode( $content, true, JSON_THROW_ON_ERROR );
				} catch ( TypeError ) {
					// pass.
				} catch ( Error ) {
					// pass.
				}
				// phpcs:enable
			}

			if ( is_array( $data ) ) {
				$data['name']             = $name;
				$loaded[]                 = $data;
				$load_cache[ $file_path ] = $data;
			}
		}

		return $loaded;
	}

	/**
	 * Loads addon's bridge templates.
	 *
	 * @return Post_Bridge_Template[].
	 */
	private static function load_templates() {
		$dir = POSTS_BRIDGE_ADDONS_DIR . '/' . static::NAME . '/templates';

		$directories = apply_filters(
			'posts_bridge_template_directories',
			array(
				$dir,
				Posts_Bridge::path() . 'includes/templates',
				get_stylesheet_directory() . '/posts-bridge/templates/' . static::NAME,
			),
			static::NAME
		);

		$templates = array();
		foreach ( $directories as $dir ) {
			if ( ! is_dir( $dir ) ) {
				continue;
			}

			foreach ( self::autoload_dir( $dir ) as $template ) {
				$template['name']               = sanitize_title( $template['name'] );
				$templates[ $template['name'] ] = $template;
			}
		}

		$templates = array_values( $templates );

		$templates = apply_filters(
			'posts_bridge_load_templates',
			$templates,
			static::NAME
		);

		$loaded = array();
		foreach ( $templates as $template ) {
			if (
				is_array( $template ) &&
				isset( $template['data'], $template['name'] )
			) {
				$template = array_merge(
					$template['data'],
					array(
						'name' => $template['name'],
					)
				);
			}

			$template = new Post_Bridge_Template( $template, static::NAME );

			if ( $template->is_valid ) {
				$loaded[] = $template;
			}
		}

		return $loaded;
	}

	// /**
	// * Registers remote cpts remote fields as post meta to make it visibles
	// * on the REST API.
	// */
	// private static function register_meta()
	// {
	// $bridges = static::bridges();
	// foreach ($bridges as $bridge) {
	// $bridge->register_meta();
	// }
	// }
}
