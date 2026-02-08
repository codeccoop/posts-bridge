<?php
/**
 * Class Posts_Synchronizer
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use Error;
use Exception;
use PBAPI;
use WPCT_PLUGIN\Singleton;
use WP_Query;
use WP_Post;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Remote posts index synchronzier.
 */
class Posts_Synchronizer extends Singleton {

	/**
	 * Handle synchronization ajax nonce name.
	 *
	 * @var string
	 */
	private const AJAX_NONCE = 'posts-bridge-ajax-sync';

	/**
	 * Handle synchronization ajax action name.
	 *
	 * @var string
	 */
	private const SYNC_ACTION = 'posts_bridge_sync';

	/**
	 * Handle ping ajax action name.
	 *
	 * @var string
	 */
	private const PING_ACTION = 'posts_bridge_sync_ping';

	/**
	 * Handles synchronization schedule hook name.
	 *
	 * @var string
	 */
	private const SCHEDULE_HOOK = '_posts_bridge_sync_schedule';

	/**
	 * Handles detached queue option name.
	 *
	 * @var string
	 */
	private const DETACHED_QUEUE = '_posts_bridge_detach_queue';

	/**
	 * Handles detached queue data.
	 *
	 * @var array
	 */
	private static $detached_queue = array();

	/**
	 * Public class initializer.
	 *
	 * @return Posts_Synchronizer Singleton instance.
	 */
	public static function setup() {
		return self::get_instance();
	}

	/**
	 * Registers custom wp schedules.
	 *
	 * @param array<string, array> $schedules New schedules to register.
	 *
	 * @return array
	 */
	private static function register_custom_schedules( $schedules ) {
		$schedules['pb-quarterly'] = array(
			'interval' => 60 * 15,
			'display'  => __( 'Quarterly', 'posts-bridge' ),
		);

		$schedules['pb-twicehourly'] = array(
			'interval' => 60 * 30,
			'display'  => __( 'Twice Hourly', 'posts-bridge' ),
		);

		return $schedules;
	}

	/**
	 * Activates schedule hook events with a given recurrence.
	 *
	 * @param integer $timestamp UNIX timestamp for the first run.
	 * @param string  $recurrence How often the event should be subsequently recur.
	 * @param array   $payload Arguments to be passed to the hook's callback function.
	 */
	private static function add_schedule( $timestamp, $recurrence, $payload = array() ) {
		$next_schedule = wp_next_scheduled( self::SCHEDULE_HOOK, $payload );

		if ( $next_schedule ) {
			// if new timestamp is nearer than the existing one, replace it.
			if ( $next_schedule > $timestamp ) {
				$result = wp_unschedule_event(
					$next_schedule,
					self::SCHEDULE_HOOK,
					$payload
				);

				if ( ! $result ) {
					Logger::log(
						"Can not unschedule synchronize hook with recurrence {$recurrence}",
						Logger::ERROR,
					);

					return;
				}

				$next_schedule = null;
			} else {
				// if recurrence from the existing schedule is different from the new one, replace it.
				$scheduled_recurrencte = wp_get_schedule( self::SCHEDULE_HOOK, $payload );

				if ( $scheduled_recurrencte !== $recurrence ) {
					$result = wp_unschedule_event(
						$next_schedule,
						self::SCHEDULE_HOOK,
						$payload
					);

					if ( ! $result ) {
						Logger::log(
							"Can not unschedule synchronize hook with recurrence {$scheduled_recurrencte}",
							Logger::ERROR,
						);

						return;
					}

					$next_schedule = null;
				}
			}
		}

		// creates a new schedule if it doesn't exists.
		if ( ! $next_schedule ) {
			$result = wp_schedule_event(
				$timestamp,
				$recurrence,
				self::SCHEDULE_HOOK,
				$payload
			);

			if ( ! $result ) {
				Logger::log( 'Can not schedule synchronize hook', Logger::ERROR );
			}
		}
	}

	/**
	 * Unschedule the scheduled plugin's hook.
	 */
	public static function unschedule() {
		$timestamp = wp_next_scheduled( self::SCHEDULE_HOOK, array() );
		if ( false !== $timestamp ) {
			wp_unschedule_event( $timestamp, self::SCHEDULE_HOOK );
		}
	}

	/**
	 * Gets synchronize general setting field and toggles schedule state.
	 *
	 * @param array $general General setting data.
	 */
	public static function schedule( $general ) {
		$enabled    = $general['synchronize']['enabled'] ?? false;
		$recurrence = $general['synchronize']['recurrence'] ?? null;

		if ( ! $enabled || ! $recurrence ) {
			self::unschedule();
		} else {
			$next_run = time();
			switch ( $recurrence ) {
				case 'every_minute':
					$next_run += 60;
					break;
				case 'pb-quarterly':
					$next_run += 60 * 15;
					break;
				case 'pb-twicehourly':
					$next_run += 60 * 30;
					break;
				case 'hourly':
					$next_run += 60 * 60;
					break;
				case 'pb-twicedaily':
					$next_run += 60 * 60 * 12;
					break;
				case 'daily':
					$next_run += 60 * 60 * 24;
					break;
				case 'weekly':
					$next_run += 60 * 60 * 24 * 7;
					break;
				default:
					return;
			}

			self::add_schedule( $next_run, $recurrence, array() );
		}
	}

	/**
	 * Enqueues detached synchronizations ping script.
	 */
	private static function enqueue_ping_script() {
		$handle = 'posts-bridge-sync-ping';

		wp_enqueue_script(
			$handle,
			plugin_dir_url( __DIR__ ) . '/assets/sync-ping.js',
			array(),
			Posts_Bridge::version(),
			array( 'strategy' => 'defer' ),
		);

		wp_localize_script(
			$handle,
			'postsBridgeSyncPing',
			array( 'siteUrl' => site_url() ),
		);
	}

	/**
	 * Localize postsBridgeAjaxSync script with nonces.
	 */
	private static function ajax_localization() {
		wp_localize_script(
			'posts-bridge',
			'postsBridgeAjaxSync',
			array(
				'url'     => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( self::AJAX_NONCE ),
				'actions' => array(
					'sync' => self::SYNC_ACTION,
					'ping' => self::PING_ACTION,
				),
			)
		);
	}

	/**
	 * Binds schedules to general settings updates.
	 *
	 * @param mixed[] ...$args Constructor arguments.
	 */
	protected function construct( ...$args ) {
		add_action(
			'updated_option',
			static function ( $option, $from, $to ) {
				if ( 'posts-bridge_general' === $option ) {
					self::schedule( $to );
				}
			},
			90,
			3,
		);

		add_action(
			'added_option',
			static function ( $option, $value ) {
				if ( 'posts-bridge_general' === $option ) {
					self::schedule( $value );
				}
			},
			90,
			2,
		);

		add_filter(
			'cron_schedules',
			static function ( $schedules ) {
				return self::register_custom_schedules( $schedules );
			}
		);

		add_action(
			'admin_enqueue_scripts',
			static function ( $admin_page ) {
				if ( 'settings_page_posts-bridge' === $admin_page ) {
					self::ajax_localization();
				}

				self::enqueue_ping_script();
			},
			11
		);

		add_action(
			'wp_enqueue_scripts',
			static function () {
				self::enqueue_ping_script();
			},
			10,
			0,
		);

		add_filter(
			'query_vars',
			function ( $query_vars ) {
				$query_vars[] = 'pb-sync-ping';
				return $query_vars;
			}
		);

		add_action(
			'init',
			static function () {
				// phpcs:disable WordPress.Security.NonceVerification
				if ( isset( $_GET['pb-sync-ping'] ) ) {
					self::detached_sync();
				}
				// phpcs:enable
			},
			20,
			0,
		);

		add_action(
			self::SCHEDULE_HOOK,
			static function () {
				self::scheduled_sync();
			},
			10,
			0,
		);

		add_action(
			'wp_ajax_' . self::SYNC_ACTION,
			static function () {
				self::ajax_callback();
			}
		);

		add_action(
			'wp_ajax_' . self::PING_ACTION,
			static function () {
				self::ping_callback();
			}
		);
	}

	/**
	 * Callback to the ping ajax action. Checks if a synchronization is running
	 * in the background.
	 */
	private static function ping_callback() {
		check_ajax_referer( self::AJAX_NONCE );

		$upload_dir = Posts_Bridge::upload_dir();
		if ( $upload_dir && is_file( $upload_dir . '/sync-lock' ) ) {
			wp_send_json(
				array(
					'success' => false,
					'error'   => 'ajax_lock',
				),
				409
			);
		}

		wp_send_json( array( 'success' => true ), 200 );
	}

	/**
	 * Ajax synchronization callback.
	 *
	 * @throws Exception For bad requests or internal server errors.
	 */
	private static function ajax_callback() {
		check_ajax_referer( self::AJAX_NONCE );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json(
				array(
					'success' => false,
					'error'   => 'ajax_unauthorized',
				),
				401,
			);
		}

		$upload_dir = Posts_Bridge::upload_dir() ?: '';
		if ( ! $upload_dir ) {
			Logger::log( 'Can not create plugin internal folders', Logger::ERROR );

			wp_send_json(
				array(
					'success' => false,
					'error'   => 'internal_server_error',
				),
				500,
			);
		}

		$lock_file = $upload_dir . '/sync-lock';
		if ( is_file( $lock_file ) ) {
			Logger::log( 'Skip synchronization, lock file found', Logger::ERROR );

			wp_send_json(
				array(
					'success' => false,
					'error'   => 'ajax_lock',
				),
				409
			);
		}

		$post_type = isset( $_POST['post_type'] )
			? sanitize_text_field( wp_unslash( $_POST['post_type'] ) )
			: null;

		// phpcs:disable WordPress.WP.AlternativeFunctions
		$result = touch( $lock_file );
		// phpcs:enable

		if ( ! $result ) {
			Logger::log( 'Unable to create the syncrhonization lock file', Logger::ERROR );

			wp_send_json(
				array(
					'success' => false,
					'error'   => 'internal_server_error',
				),
				500,
			);
		}

		$error_message = 'Ajax synchronization error';
		self::setup_error_handler( $error_message );

		Logger::log( 'Start ajax synchronization' );

		if ( $post_type ) {
			$bridge  = PBAPI::get_bridge( $post_type );
			$bridges = array_filter( array( $bridge ) );
		} else {
			$bridges = PBAPI::get_bridges();
		}

		$result = true;

		try {
			foreach ( $bridges as $bridge ) {
				if ( ! $bridge->is_valid ) {
					Logger::log( "Skip synchronization for invalid {$bridge->post_type} bridge" );
					continue;
				}

				if ( ! $bridge->enabled ) {
					Logger::log( "Skip synchronization for disabled {$bridge->post_type} bridge" );
					continue;
				}

				$result = $result && self::sync( $bridge, false );
			}
		} catch ( Error | Exception $e ) {
			Logger::log( "Error on ajax synchronization for post type {$bridge->post_type}", Logger::ERROR );
			Logger::log( $e, Logger::ERROR );

			if ( is_file( $lock_file ) ) {
				wp_delete_file( $lock_file );
			}

			$result = false;
		}

		if ( $result ) {
			Logger::log( 'Ajax synchronization completed' );
		}

		restore_error_handler();

		wp_delete_file( $lock_file );

		wp_send_json( array( 'success' => true ), 200 );
	}

	/**
	 * Dispatch scheduled synchronizations.
	 */
	private static function scheduled_sync() {
		$bridges = PBAPI::get_bridges();

		self::$detached_queue = get_option( self::DETACHED_QUEUE, array() ) ?: array();

		$upload_dir = Posts_Bridge::upload_dir() ?: '';
		if ( ! $upload_dir ) {
			Logger::log( 'Can not create plugin internal folders', Logger::ERROR );
			return;
		}

		$lock_file = $upload_dir . '/sync-lock';
		if ( is_file( $lock_file ) ) {
			Logger::log( 'Skip synchronization, lock file found', Logger::ERROR );
			return;
		}

		// phpcs:disable WordPress.WP.AlternativeFunctions
		$result = touch( $lock_file );
		// phpcs:enable

		if ( ! $result ) {
			Logger::log( 'Unable to create the syncrhonization lock file', Logger::ERROR );
			return;
		}

		$error_message = 'Detached synchronization error';
		self::setup_error_handler( $error_message );

		Logger::log( 'Start scheduled synchronization' );

		$result = true;
		try {
			foreach ( $bridges as $bridge ) {
				if ( ! $bridge->is_valid ) {
					Logger::log( "Skip synchronization for invalid {$bridge->post_type} bridge" );
					unset( self::$detached_queue[ $bridge->post_type ] );
					continue;
				}

				if ( ! $bridge->enabled ) {
					Logger::log( "Skip synchronization for disabled {$bridge->post_type} bridge" );
					unset( self::$detached_queue[ $bridge->post_type ] );
					continue;
				}

				$done = self::sync(
					$bridge,
					true,
					self::$detached_queue[ $bridge->post_type ] ?? null,
				);

				if ( $done ) {
					unset( self::$detached_queue[ $bridge->post_type ] );
				}

				$result = $result && $done;
			}
		} catch ( Error | Exception $e ) {
			Logger::log( "Scheduled synchronization error on post type {$bridge->post_type}", Logger::ERROR );
			Logger::log( $e, Logger::ERROR );

			$result = false;
		}

		if ( $result ) {
			Logger::log( 'Scheduled synchronization completed' );
		}

		update_option( self::DETACHED_QUEUE, self::$detached_queue, false );

		restore_error_handler();

		wp_delete_file( $lock_file );
	}

	/**
	 * Dispatch detached synchronizations.
	 */
	private static function detached_sync() {
		self::$detached_queue = get_option( self::DETACHED_QUEUE, array() ) ?: array();

		$upload_dir = Posts_Bridge::upload_dir() ?: '';
		if ( ! $upload_dir ) {
			Logger::log( 'Can not create plugin internal folders', Logger::ERROR );

			wp_send_json(
				array(
					'success' => false,
					'error'   => 'internal_server_error',
				),
				500,
			);
		}

		$lock_file = $upload_dir . '/sync-lock';
		if ( is_file( $lock_file ) ) {
			Logger::log( 'Skip synchronization, lock file found', Logger::ERROR );

			wp_send_json(
				array(
					'success' => false,
					'error'   => 'ajax_lock',
				),
				409
			);
		}

		// phpcs:disable WordPress.WP.AlternativeFunctions
		$result = touch( $lock_file );
		// phpcs:enable

		if ( ! $result ) {
			Logger::log( 'Unable to create the syncrhonization lock file', Logger::ERROR );

			wp_send_json(
				array(
					'success' => false,
					'error'   => 'internal_server_error',
				),
				500,
			);
		}

		$error_message = 'Detached synchronization error';
		self::setup_error_handler( $error_message );

		Logger::log( 'Start detached synchronization' );

		$post_types = array_keys( self::$detached_queue );

		$result = true;

		try {
			foreach ( $post_types  as $post_type ) {
				$bridge = PBAPI::get_bridge( $post_type );

				if ( ! $bridge || ! $bridge->is_valid ) {
					Logger::log( "Skip detached synchronization for invalid {$post_type} bridge" );
					unset( self::$detached_queue[ $post_type ] );
					continue;
				}

				if ( ! $bridge->enabled ) {
					Logger::log( "Skip detached synchronization for disabled {$post_type} bridge" );
					unset( self::$detached_queue[ $post_type ] );
					continue;
				}

				$done = self::sync( $bridge, false, self::$detached_queue[ $post_type ] );

				if ( $done ) {
					unset( self::$detached_queue[ $post_type ] );
				}

				$result = $result && $done;
			}
		} catch ( Error | Exception $e ) {
			Logger::log( "Error on detached synchronization for post type {$post_type}", Logger::ERROR );
			Logger::log( $e, Logger::ERROR );

			if ( is_file( $lock_file ) ) {
				wp_delete_file( $lock_file );
			}

			$result = false;
		}

		if ( $result ) {
			Logger::log( 'Detached synchronization completed' );
		}

		update_option( self::DETACHED_QUEUE, self::$detached_queue, false );

		restore_error_handler();

		wp_delete_file( $lock_file );

		wp_send_json( array( 'success' => true ) );
	}

	/**
	 * Synchronize post type collections.
	 *
	 * @param Post_Bridge $bridge Remote relation instance.
	 * @param bool        $scheduled Weather the syncrhonization is scheduled or not.
	 * @param array|null  $queue Bridge foreign ids list inherit queue.
	 *
	 * @return bool Synchronization done.
	 *
	 * @throws Exception On HTTP error response or inert post errors.
	 */
	private static function sync( $bridge, $scheduled = false, $queue = null ) {
		$start_at = time();

		if ( null === $queue ) {
			$foreign_ids = $bridge->foreign_ids();
		} else {
			$foreign_ids = $queue;
		}

		if ( ! $foreign_ids ) {
			return true;
		}

		$remote_pairs = array();
		foreach ( $foreign_ids as $id ) {
			$remote_pairs[ $id ] = 0;
		}

		$post_type = $bridge->post_type;

		$query = new WP_Query(
			array(
				'post_type'      => $post_type,
				'posts_per_page' => -1,
				'post_status'    => 'any',
			)
		);

		Logger::log( "Starts synchronization clean up for post type {$post_type}" );

		global $posts_bridge_remote_cpt;
		while ( $query->have_posts() ) {
			$query->the_post();
			$foreign_id = $posts_bridge_remote_cpt->foreign_id ?? null;

			if ( ! isset( $remote_pairs[ $foreign_id ] ) && null === $queue ) {
				// if post does not exists on the remote backend, then remove it.
				$post_id = get_the_ID();
				Logger::log( "Remove post {$post_id} on synchronization clean up" );
				wp_delete_post( $post_id );
			} else {
				$remote_pairs[ $foreign_id ] = get_post();
			}
		}

		Logger::log( "Ends synchronization clean up for post type {$post_type}" );
		Logger::log( sprintf( 'Remote pairs count: %s', count( $remote_pairs ) ) );

		wp_reset_postdata();

		Logger::log( "Start remote posts synchronization for post type {$post_type}" );

		$pending = $remote_pairs;

		foreach ( $remote_pairs as $foreign_id => $post ) {
			// if is a new remote record, mock a post as its local counterpart.
			if ( empty( $post ) ) {
				$post = new WP_Post(
					(object) array(
						'ID'        => $post,
						'post_type' => $post_type,
					)
				);
			}

			$rcpt = new Remote_CPT( $post, $foreign_id );

			$data = $rcpt->fetch();

			if ( is_wp_error( $data ) || empty( $data ) ) {
				Logger::log( 'Exit synchronization after a fetch error', Logger::ERROR );
				Logger::log( $data, Logger::ERROR );
				throw new Exception( 'sync_error', 500 );
			}

			$skip = apply_filters(
				'posts_bridge_skip_synchronization',
				false,
				$rcpt,
				$data
			);

			if ( $skip ) {
				Logger::log( "Skip synchrionization for Remote CPT({$post_type}) with foreign id {$foreign_id}" );

				$rcpt->ID && wp_delete_post( $rcpt->ID );
				continue;
			}

			$post_data = $bridge->apply_mappers( $data );

			$post_title = $post_data['post_title'] ?? "Remote CPT({$post_type}) #{$foreign_id}";

			if ( empty( $post_data['post_title'] ) ) {
				$post_data['post_title'] = ! empty( $post_data['post_name'] ) ? $post_data['post_name'] : $post_title;
			}

			$post_data['post_type'] = $post_type;

			if ( 0 !== $rcpt->ID ) {
				$post_data['ID'] = $rcpt->ID;
			}

			do_action( 'posts_bridge_before_synchronization', $rcpt, $post_data );

			Logger::log( "Remote CPT({$post_type}) #{$foreign_id} remote data after mappers" );
			Logger::log( $post_data );

			$post_id = wp_insert_post( $post_data );

			if ( is_wp_error( $post_id ) || ! $post_id ) {
				Logger::log( 'Post creation error on synchronization', Logger::ERROR );
				throw new Exception( 'insert_error', 500 );
			}

			update_post_meta( $post_id, Remote_CPT::FOREIGN_KEY_HANDLE, $foreign_id );

			if ( isset( $post_data['featured_media'] ) ) {
				$featured_media = Remote_Featured_Media::handle( $post_data['featured_media'], null, $bridge->backend );
			} else {
				$featured_media = Remote_Featured_Media::default_thumbnail_id();
			}

			if ( $featured_media ) {
				set_post_thumbnail( $post_id, $featured_media );
			}

			$rcpt = new Remote_CPT( $post_id, $foreign_id, $post_data );

			do_action( 'posts_bridge_rcpt_synchronization', $rcpt, $post_data );

			unset( $pending[ $foreign_id ] );

			$ttl = $scheduled ? 1 : INF;
			if ( $scheduled && $start_at < time() - $ttl && count( $pending ) ) {
				Logger::log( "Detached remote posts synchronization for post type {$post_type}" );
				self::$detached_queue[ $post_type ] = array_keys( $remote_pairs );
				return false;
			}
		}

		Logger::log( "Ends remote posts synchronization for post type {$post_type}" );
		return true;
	}

	/**
	 * Sets up a custom error handler to remove lock files on errors.
	 *
	 * @param string $error_message Message to display on errors.
	 */
	private static function setup_error_handler( $error_message ) {
		// phpcs:disable WordPress.PHP.DevelopmentFunctions
		set_error_handler(
			function ( $code, $message, $file, $line ) use ( $error_message ) {
				Logger::log( $error_message, Logger::ERROR );
				Logger::log(
					array(
						'code'    => $code,
						'message' => $message,
						'file'    => $file,
						'line'    => $line,
					),
					Logger::ERROR
				);

				$upload_dir = Posts_Bridge::upload_dir() ?: '';
				$lock_file  = $upload_dir . '/sync-lock';
				if ( is_file( $lock_file ) ) {
					wp_delete_file( $lock_file );
				}

				wp_send_json(
					array(
						'success' => false,
						'error'   => 'internal_server_error',
					),
					500,
				);
			}
		);
		// phpcs:enable
	}
}

Posts_Synchronizer::setup();
