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
use WP_Error;

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
	 * @var array|null
	 */
	private static $detached_queue = null;

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

		delete_option( self::DETACHED_QUEUE );
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

		$post_type = isset( $_POST['post_type'] )
			? sanitize_text_field( wp_unslash( $_POST['post_type'] ) )
			: null;

		if ( $post_type ) {
			$bridge  = PBAPI::get_bridge( $post_type );
			$bridges = array_filter( array( $bridge ) );
		} else {
			$bridges = PBAPI::get_bridges();
		}

		if ( ! $bridges ) {
			Logger::log( 'Skip synchronization, no bridges found' );
			wp_send_json( array( 'success' => true ), 200 );
		}

		$result = self::sync_bridges( $bridges, 'ajax' );

		if ( is_wp_error( $result ) ) {
			wp_send_json(
				array(
					'success' => false,
					'error'   => array(
						'message' => $result->get_error_message(),
						'code'    => $result->get_error_code(),
					),
				),
				intval( $result->get_error_data()['status'] ?? 500 ),
			);
		}

		wp_send_json( array( 'success' => true ) );
	}

	/**
	 * Dispatch scheduled synchronizations.
	 */
	private static function scheduled_sync() {
		$bridges = PBAPI::get_bridges();

		if ( ! $bridges ) {
			return;
		}

		self::sync_bridges( $bridges, 'scheduled' );
	}

	/**
	 * Dispatch detached synchronizations.
	 */
	private static function detached_sync() {
		self::$detached_queue = get_option( self::DETACHED_QUEUE, array() ) ?: array();

		if ( ! self::$detached_queue ) {
			return;
		}

		$queue = self::$detached_queue[0];

		$bridge = PBAPI::get_bridge( $queue['post_type'] );
		if ( ! $bridge ) {
			Logger::log( "Skip detached syncrhonization, {$queue['post_type']} bridge not found" );
			array_shift( self::$detached_queue );
			update_option( self::DETACHED_QUEUE, self::$detached_queue, false );
			return wp_send_json( array( 'success' => true ) );
		}

		$result = self::sync_bridges( array( $bridge ), 'detached' );

		if ( is_wp_error( $result ) ) {
			wp_send_json(
				array(
					'success' => false,
					'error'   => array(
						'code'    => $result->get_error_code(),
						'message' => $result->get_error_message(),
					),
				),
				intval( $result->get_error_data()['status'] ?? 500 ),
			);
		}

		wp_send_json( array( 'success' => true ) );
	}

	/**
	 * Multiple bridge synchronization loop.
	 *
	 * @param Post_Bridge[] $bridges List of bridges to synchronize.
	 * @param string        $mode Synchronization mode (ajax, scheduled, detached).
	 *
	 * @return bool|WP_Error;
	 */
	private static function sync_bridges( $bridges, $mode ) {
		$upload_dir = Posts_Bridge::upload_dir() ?: '';
		if ( ! $upload_dir ) {
			$error_message = 'Can not create plugin internal folders';
			Logger::log( $error_message, Logger::ERROR );
			return new WP_Error( 'internal_server_error', $error_message, array( 'status' => 500 ) );
		}

		$lock_file = $upload_dir . '/sync-lock';
		if ( is_file( $lock_file ) ) {
			$error_message = 'Skip synchronization, lock file found';
			Logger::log( $error_message, Logger::ERROR );
			return new WP_Error( 'conflict', $error_message, array( 'status' => 409 ) );
		}

		// phpcs:disable WordPress.WP.AlternativeFunctions
		$result = touch( $lock_file );
		// phpcs:enable

		if ( ! $result ) {
			$error_message = 'Unable to create the syncrhonization lock file';
			Logger::log( $error_message, Logger::ERROR );
			return new WP_Error( 'internal_server_error', $error_message, array( 'status' => 500 ) );
		}

		if ( null === self::$detached_queue ) {
			self::$detached_queue = get_option( self::DETACHED_QUEUE, array() ) ?: array();
		}

		$error_message = "Internal error found on {$mode} synchronization";
		self::setup_error_handler( $error_message );

		Logger::log( "Start {$mode} synchronization" );

		$index = array();

		$l = count( self::$detached_queue );
		for ( $i = 0; $i < $l; ++$i ) {
			$index[ self::$detached_queue[ $i ]['post_type'] ] = $i;
		}

		$result = true;
		try {
			foreach ( $bridges  as $bridge ) {
				$post_type = $bridge->post_type ?: 'undefined';

				$position = $index[ $bridge->post_type ] ?? null;

				if ( ! $bridge || ! $bridge->is_valid ) {
					if ( null !== $position ) {
						array_splice( self::$detached_queue, $position, 1 );
					}

					Logger::log( "Skip {$mode} synchronization for invalid bridge with post type {$post_type}" );
					continue;
				}

				if ( ! $bridge->enabled ) {
					if ( null !== $position ) {
						array_splice( self::$detached_queue, $position, 1 );
					}

					Logger::log( "Skip {$mode} synchronization for disabled {$post_type} bridge" );
					continue;
				}

				if ( 'scheduled' === $mode && null !== $position ) {
					Logger::log( "Skip {$mode} synchronization for {$post_type} bridge: already enqueued" );
					continue;
				}

				$queue = null !== $position ? self::$detached_queue[ $position ] : null;

				$done = self::sync_bridge( $bridge, $mode, $queue );

				if ( $done && null !== $position ) {
					array_splice( self::$detached_queue, $position, 1 );
				}

				$result = $result && $done;
			}
		} catch ( Error | Exception $error ) {
			Logger::log( "Error on {$mode} synchronization for post type {$post_type}", Logger::ERROR );
			Logger::log( $error, Logger::ERROR );
		}

		wp_delete_file( $lock_file );

		update_option( self::DETACHED_QUEUE, self::$detached_queue, false );

		restore_error_handler();

		if ( isset( $error ) ) {
			return new WP_Error( 'internal_server_error', $error->getMessage(), array( 'status' => 500 ) );
		}

		if ( $result ) {
			Logger::log( "{$mode} synchronization completed" );
		}

		return $result;
	}

	/**
	 * Synchronize post type collections.
	 *
	 * @param Post_Bridge $bridge Remote relation instance.
	 * @param string      $mode Synchronization mode (ajax, scheduled, detached).
	 * @param array|null  $queue Bridge foreign ids list inherited queue.
	 *
	 * @return bool Synchronization done.
	 *
	 * @throws Exception On HTTP error response or inert post errors.
	 */
	private static function sync_bridge( $bridge, $mode, $queue ) {
		if ( null === $queue || 'ajax' === $mode ) {
			$foreign_ids = $bridge->foreign_ids();
		} else {
			$foreign_ids = $queue['foreign_ids'];
		}

		if ( ! $foreign_ids ) {
			return true;
		}

		$post_type = $bridge->post_type;

		if ( 'scheduled' === $mode ) {
			Logger::log( "Detached remote posts synchronization for post type {$bridge->post_type}" );
			self::$detached_queue[] = array(
				'post_type'   => $post_type,
				'foreign_ids' => $foreign_ids,
			);

			return false;
		}

		$remote_pairs = array();
		foreach ( $foreign_ids as $id ) {
			$remote_pairs[ $id ] = 0;
		}

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

			if ( $posts_bridge_remote_cpt ) {
				$foreign_id = $posts_bridge_remote_cpt->foreign_id;

				if ( isset( $remote_pairs[ $foreign_id ] ) ) {
					$remote_pairs[ $foreign_id ] = get_post();
					continue;
				}
			}

			// if post does not exists on the remote backend, then remove it.
			$post_id = get_the_ID();
			Logger::log( "Remove post {$post_id} on synchronization clean up" );
			wp_delete_post( $post_id );
		}

		Logger::log( "Ends synchronization clean up for post type {$post_type}" );
		Logger::log( sprintf( 'Remote pairs count: %s', count( $remote_pairs ) ) );

		wp_reset_postdata();

		Logger::log( "Start remote posts synchronization for post type {$post_type}" );

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

			$remote_fields = $bridge->remote_fields();

			if ( $remote_fields ) {
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
			} else {
				$post_data = array( 'post_status' => 'publish' );
			}

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
