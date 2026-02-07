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
	 * @var string ajax_none
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
	 * @var string Synchronization schedule hook name.
	 */
	private const SCHEDULE_HOOK = '_posts_bridge_sync_schedule';

	/**
	 * Handle full synchronization mode. Full synchronization will fetch remote data of all remote models.
	 * Light mode does only fetch differences between the posts collection and the foreign ids.
	 *
	 * @var string $sync_mode Full or light mode.
	 */
	private static $sync_mode = 'light';

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
	 * @return Array with custom schedules registerefs.
	 */
	private static function register_custom_schedules( $schedules ) {
		$schedules['minutly'] = array(
			'interval' => 60,
			'display'  => __( 'Minutly', 'posts-bridge' ),
		);

		$schedules['quarterly'] = array(
			'interval' => 60 * 15,
			'display'  => __( 'Quarterly', 'posts-bridge' ),
		);

		$schedules['twicehourly'] = array(
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
				wp_unschedule_event(
					$next_schedule,
					self::SCHEDULE_HOOK,
					$payload
				);
				$next_schedule = null;
			} else {
				// if recurrence from the existing schedule is different from the new one, replace it.
				$schedule = wp_get_schedule( self::SCHEDULE_HOOK, $payload );
				if ( $schedule !== $recurrence ) {
					wp_unschedule_event(
						$next_schedule,
						self::SCHEDULE_HOOK,
						$payload
					);
					$next_schedule = null;
				}
			}
		}

		// creates a new schedule if it doesn't exists.
		if ( ! $next_schedule ) {
			wp_schedule_event(
				$timestamp,
				$recurrence,
				self::SCHEDULE_HOOK,
				$payload
			);
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
	 */
	public static function schedule() {
		$general    = Posts_Bridge::setting( 'general' );
		$enabled    = $general->synchronize['enabled'] ?? false;
		$recurrence = $general->synchronize['recurrence'] ?? null;

		if ( empty( $enabled ) || empty( $recurrence ) ) {
			self::unschedule();
		} else {
			$next_run = time();
			switch ( $recurrence ) {
				case 'minutly':
					$next_run += 60;
					break;
				case 'quarterly':
					$next_run += 60 * 15;
					break;
				case 'twicehourly':
					$next_run += 60 * 30;
					break;
				case 'hourly':
					$next_run += 60 * 60;
					break;
				case 'twicedaily':
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
			static function ( $option ) {
				if ( 'posts-bridge_general' === $option ) {
					self::schedule();
				}
			},
			90,
			1
		);

		add_action(
			'admin_enqueue_scripts',
			static function ( $admin_page ) {
				if ( 'settings_page_posts-bridge' !== $admin_page ) {
					return;
				}

				self::ajax_localization();
			},
			11
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

		add_filter(
			'cron_schedules',
			static function ( $schedules ) {
				return self::register_custom_schedules( $schedules );
			}
		);

		add_action(
			self::SCHEDULE_HOOK,
			static function () {
				$upload_dir = Posts_Bridge::upload_dir();
				if ( $upload_dir && is_file( $upload_dir . '/sync-lock' ) ) {
					Logger::log( 'Skip scheduled synchronization due to sync lock conflicts', Logger::ERROR );
					return;
				}

				Logger::log( 'Start scheduled synchronization' );

				$upload_dir = Posts_Bridge::upload_dir();
				if ( $upload_dir ) {
					touch( $upload_dir . '/sync-lock' );
				}

				set_error_handler(
					function ( $code, $message, $file, $line ) {
						Logger::log(
							array(
								'code'    => $code,
								'message' => $message,
								'file'    => $file,
								'line'    => $line,
							),
							Logger::ERROR
						);

						$upload_dir = Posts_Bridge::upload_dir();
						if ( $upload_dir ) {
							wp_delete_file( $upload_dir . '/sync-lock' );
						}

						wp_die( esc_html( $message ) );
					}
				);

				try {
					$bridges = PBAPI::get_bridges();
					foreach ( $bridges as $bridge ) {
						if ( ! $bridge->is_valid ) {
							Logger::log( "Skip synchronization for invalid {$bridge->post_type} bridge" );
							continue;
						}

						if ( ! $bridge->enabled ) {
							Logger::log( "Skip synchronization for invalid {$bridge->post_type} bridge" );
							continue;
						}

						try {
							self::sync( $bridge );
						} catch ( Error | Exception $e ) {
							Logger::log( "Scheduled synchronization error on {$bridge->post_type} bridge", Logger::ERROR );
							Logger::log( $e, Logger::ERROR );
						}
					}
				} finally {
					Logger::log( 'End scheduled synchronization' );

					restore_error_handler();

					$upload_dir = Posts_Bridge::upload_dir();
					if ( $upload_dir && is_file( $upload_dir . '/sync-lock' ) ) {
						wp_delete_file( $upload_dir . '/sync-lock' );
					}
				}
			}
		);
	}

	/**
	 * Callback to the ping ajax action. Checks if a synchronization is running in the background.
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

		try {
			if ( ! current_user_can( 'manage_options' ) ) {
				throw new Exception( 'ajax_unauthorized', 401 );
			}

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

			$mode = isset( $_POST['mode'] )
				? sanitize_text_field( wp_unslash( $_POST['mode'] ) )
				: null;

			$post_type = isset( $_POST['post_type'] )
				? sanitize_text_field( wp_unslash( $_POST['post_type'] ) )
				: null;

			if ( ! in_array( $mode, array( 'light', 'full' ), true ) ) {
				throw new Exception( 'bad_request', 400 );
			}

			Logger::log( 'Start ajax synchronization' );

			$upload_dir = Posts_Bridge::upload_dir();
			if ( $upload_dir ) {
				touch( $upload_dir . '/sync-lock' );
			}

			set_error_handler(
				function ( $code, $message, $file, $line ) {
					Logger::log(
						array(
							'code'    => $code,
							'message' => $message,
							'file'    => $file,
							'line'    => $line,
						),
						Logger::ERROR
					);

					$upload_dir = Posts_Bridge::upload_dir();
					if ( $upload_dir ) {
						wp_delete_file( $upload_dir . '/sync-lock' );
					}

					wp_die( esc_html( $message ) );
				}
			);

			self::$sync_mode = $mode;
			if ( $post_type ) {
				$bridge  = PBAPI::get_bridge( $post_type );
				$bridges = array_filter( array( $bridge ) );
			} else {
				$bridges = PBAPI::get_bridges();
			}

			foreach ( $bridges as $bridge ) {
				if ( ! $bridge->is_valid ) {
					Logger::log( "Skip synchronization for invalid {$bridge->post_type} bridge" );
					continue;
				}

				if ( ! $bridge->enabled ) {
					Logger::log( "Skip synchronization for invalid {$bridge->post_type} bridge" );
					continue;
				}

				self::sync( $bridge );
			}
		} catch ( Error | Exception $e ) {
			Logger::log( "Ajax synchronization error on {$bridge->post_type} bridge", Logger::ERROR );
			Logger::log( $e, Logger::ERROR );
			$error = $e;
		} finally {
			Logger::log( 'Ajax synchronization completed' );

			restore_error_handler();

			$upload_dir = Posts_Bridge::upload_dir();
			if ( $upload_dir && is_file( $upload_dir . '/sync-lock' ) ) {
				wp_delete_file( $upload_dir . '/sync-lock' );
			}

			if ( isset( $error ) ) {
				wp_send_json(
					array(
						'success' => false,
						'error'   => $error->getMessage(),
					),
					$error->getCode(),
					400,
				);
			}

			wp_send_json( array( 'success' => true ), 200 );
		}
	}

	/**
	 * Synchronize post types collections.
	 *
	 * @param Post_Bridge $bridge Remote relation instance.
	 *
	 * @throws Exception On HTTP error response or inert post errors.
	 */
	private static function sync( $bridge ) {
		$foreign_ids = $bridge->foreign_ids();

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

		Logger::log( "Starts synchronization clean up for {$post_type} bridge" );

		global $posts_bridge_remote_cpt;
		while ( $query->have_posts() ) {
			$query->the_post();
			$foreign_id = $posts_bridge_remote_cpt->foreign_id;

			if ( ! isset( $remote_pairs[ $foreign_id ] ) ) {
				// if post does not exists on the remote backend, then remove it.
				$post_id = get_the_ID();
				Logger::log( "Remove post {$post_id} on synchronization clean up" );
				wp_delete_post( $post_id );
			} elseif ( 'light' === self::$sync_mode ) {
					// if light mode, skip synchronization for existing ones.
					unset( $remote_pairs[ $foreign_id ] );
			} else {
				$remote_pairs[ $foreign_id ] = get_post();
			}
		}

		Logger::log( "Ends synchronization clean up for post type {$post_type}" );
		Logger::log( sprintf( 'Remote pairs count: %s', count( $remote_pairs ) ) );

		wp_reset_postdata();

		Logger::log( "Start remote posts synchronization for {$post_type} bridge" );

		foreach ( $remote_pairs as $foreign_id => $post ) {
			// if is a new remote model, mock a post as its local counterpart.
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
				Logger::log( 'Exit synchronization on error' );
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

			$post_data['post_title'] = $post_data['post_title']
				?? $post_data['post_name']
				?? "Remote CPT({$post_type}) #{$foreign_id}";

			if ( empty( $post_data['post_name'] ) ) {
				$post_data['post_name'] = sanitize_title( $post_data['post_title'] );
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
				Logger::log( 'Exit synchronization on error' );
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

			do_action( 'posts_bridge_synchronization', $rcpt, $post_data );
		}

		Logger::log( "Ends remote posts synchronization for {$post_type} bridge" );
	}
}

Posts_Synchronizer::setup();
