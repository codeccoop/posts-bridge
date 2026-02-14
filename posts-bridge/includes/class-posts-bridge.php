<?php
/**
 * Class Posts_Bridge
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use PBAPI;
use WPCT_PLUGIN\Plugin as Base_Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Posts Bridge plugin.
 */
class Posts_Bridge extends Base_Plugin {

	/**
	 * Handles the plugin db version option name.
	 *
	 * @var string
	 */
	private const DB_VERSION = 'posts-bridge-version';

	/**
	 * Handle plugin's settings store class name.
	 *
	 * @var string $settings_class Plugin's settings store class name.
	 */
	public const STORE = '\POSTS_BRIDGE\Settings_Store';

	/**
	 * Handle plugin menu class name.
	 *
	 * @var string $menu_class Plugin menu class name.
	 */
	public const MENU = '\POSTS_BRIDGE\Menu';

	/**
	 * Handle post types REST Controller instances
	 *
	 * @var array<REST_Controller> $rest_controllers Array of active REST_Controller instances
	 */
	private static $rest_controllers = array();

	/**
	 * Initialized addons, sets up plugin hooks and run db migrations if db version mismatches
	 * the plugin version.
	 *
	 * @param mixed[] ...$args Constructor arguments.
	 */
	protected function construct( ...$args ) {
		parent::construct( ...$args );

		Custom_Post_Type::load_custom_post_types();
		Addon::load_addons();

		// Store global remote cpts.
		add_action(
			'the_post',
			static function ( $post ) {
				self::the_post( $post );
			},
			9,
			2
		);

		// Initalize REST controllers on API init.
		add_action(
			'rest_api_init',
			static function () {
				$post_types = apply_filters( 'posts_bridge_remote_cpts', array() );
				foreach ( $post_types as $post_type ) {
					self::$rest_controllers[ $post_type ] = new REST_Remote_Posts_Controller( $post_type );
				}
			}
		);

		add_action(
			'admin_enqueue_scripts',
			static function ( $admin_page ) {
				if ( 'settings_page_posts-bridge' === $admin_page ) {
					self::admin_enqueue_scripts();
				}
			}
		);

		add_filter(
			'plugin_action_links',
			static function ( $links, $file ) {
				if ( 'posts-bridge/posts-bridge.php' !== $file ) {
					return $links;
				}

				$url   = 'https://postsbridge.codeccoop.org/documentation/';
				$label = __( 'Documentation', 'posts-bridge' );
				$link  = sprintf(
					'<a href="%s" target="_blank">%s</a>',
					esc_url( $url ),
					esc_html( $label )
				);
				array_push( $links, $link );

				return $links;
			},
			15,
			2
		);

		add_action(
			'in_plugin_update_message-posts-bridge/posts-bridge.php',
			function ( $plugin_data, $response ) {
				if ( 'posts-bridge' !== $response->slug ) {
					return;
				}

				if (
					! preg_match(
						'/^(\d+)\.\d+\.\d+$/',
						$response->new_version,
						$matches
					)
				) {
					return;
				}

				$new_version = $matches[1];
				$db_version  = get_option( self::DB_VERSION, '1.0.0' );

				if ( ! preg_match( '/^(\d+)\.\d+\.\d+$/', $db_version, $matches ) ) {
					return;
				}

				$from_version = $matches[1];

				if ( $new_version > $from_version ) {
					echo '<br /><b>' .
						'&nbsp' .
						esc_html(
							__(
								'This is a major release and while tested thoroughly you might experience conflicts or lost data. We recommend you back up your data before updating and check your configuration after updating.',
								'posts-bridge'
							)
						) .
						'</b>';
				}
			},
			10,
			2
		);
	}

	/**
	 * Schedules Posts_Synchronizer on plugin activation, adds the plugin's default thumbnail
	 * to the media store, and initialize the db version option.
	 */
	public static function activate() {
		if ( ! self::upload_dir() ) {
			wp_die(
				esc_html(
					__(
						'Posts Bridge requires the uploads directory to be writable',
						'posts-bridge'
					)
				)
			);
		}

		Remote_Featured_Media::setup_default_thumbnail();

		$setting_data = get_option( 'posts-bridge_general', array() ) ?: array();
		Posts_Synchronizer::schedule( $setting_data );

		$version = get_option( self::DB_VERSION );
		if ( false === $version ) {
			update_option( self::DB_VERSION, self::version(), true );
		}
	}

	/**
	 * Unschedule Posts_Synchronizer on plugin deactivation and remove the plugin's default thumbnail
	 * from the media store.
	 */
	public static function deactivate() {
		Remote_Featured_Media::remove_default_thumbnail();
		Posts_Synchronizer::unschedule();
	}

	/**
	 * Init hook callabck. Checks if comes from an upgrade and run db migrations.
	 */
	protected static function init() {
		$db_version = get_option( self::DB_VERSION );
		if ( self::version() !== $db_version && ! defined( 'WP_TESTS_DOMAIN' ) ) {
			self::do_migrations();
		}
	}

	/**
	 * Enqueue admin client scripts
	 */
	private static function admin_enqueue_scripts() {
		$version = self::version();

		wp_enqueue_script(
			'posts-bridge',
			plugins_url( 'assets/plugin.bundle.js', self::index() ),
			array(
				'react',
				'react-jsx-runtime',
				'wp-api-fetch',
				'wp-components',
				'wp-dom-ready',
				'wp-element',
				'wp-i18n',
				'wp-api',
			),
			$version,
			array( 'in_footer' => true )
		);

		wp_set_script_translations(
			'posts-bridge',
			'posts-bridge',
			self::path() . 'languages'
		);

		wp_enqueue_style( 'wp-components' );
	}

	/**
	 * Callback to `the_post` hook to populate the global $posts_bridge_remote_cpt variable with
	 * the current post wrapped as a Remote CPT.
	 *
	 * @param WP_Post $post Global WP post.
	 */
	private static function the_post( $post ) {
		global $posts_bridge_remote_cpt;
		$posts_bridge_remote_cpt = null;

		if ( empty( $post ) || empty( $post->ID ) ) {
			return;
		}

		$rcpts = PBAPI::get_remote_cpts();
		if ( ! in_array( $post->post_type, $rcpts, true ) ) {
			return;
		}

		$posts_bridge_remote_cpt = new Remote_CPT( $post );
	}

	/**
	 * Apply db migrations on plugin upgrades.
	 */
	private static function do_migrations() {
		$action = sanitize_text_field( wp_unslash( $_POST['action'] ?? '' ) );
		if ( 'heartbeat' === $action && wp_doing_ajax() ) {
			return;
		}

		$from = get_option( self::DB_VERSION, self::version() );

		if ( ! preg_match( '/^\d+\.\d+\.\d+$/', $from ) ) {
			Logger::log( 'Invalid db plugin version', Logger::ERROR );
			return;
		}

		$to = self::version();

		$migrations      = array();
		$migrations_path = self::path() . '/migrations';

		$as_int = fn( $version ) => (int) str_replace( '.', '', $version );

		foreach (
			array_diff( scandir( $migrations_path ), array( '.', '..' ) )
			as $migration
		) {
			$version = pathinfo( $migrations_path . '/' . $migration )['filename'];

			if ( $as_int( $version ) > $as_int( $to ) ) {
				break;
			}

			if ( ! empty( $migrations ) ) {
				$migrations[] = $migration;
				continue;
			}

			if (
				$as_int( $version ) > $as_int( $from ) &&
				$as_int( $version ) <= $as_int( $to )
			) {
				$migrations[] = $migration;
			}
		}

		sort( $migrations );
		foreach ( $migrations as $migration ) {
			include $migrations_path . '/' . $migration;
		}

		update_option( self::DB_VERSION, $to );
	}

	/**
	 * Returns the plugin's uploads directory. If the directory does not
	 * exists, it creates it on the fly.
	 *
	 * @return string|null Full path to the directory. Null if upload dir is not writable.
	 */
	public static function upload_dir() {
		$dir = wp_upload_dir()['basedir'] . '/posts-bridge';

		if ( ! is_dir( $dir ) ) {
			if ( ! wp_mkdir_p( $dir ) ) {
				return;
			}
		}

		return $dir;
	}
}
