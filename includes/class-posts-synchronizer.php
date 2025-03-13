<?php

namespace POSTS_BRIDGE;

use Error;
use Exception;
use WPCT_ABSTRACT\Singleton;
use WP_Query;
use WP_Post;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Remote posts index synchronzier.
 */
class Posts_Synchronizer extends Singleton
{
    /**
     * Handle synchronization ajax nonce name.
     *
     * @var string ajax_none
     */
    private const ajax_nonce = 'posts-bridge-ajax-sync';

    /**
     * Handle synchronization ajax action name.
     *
     * @var string ajax_action
     */
    private const ajax_action = 'posts_bridge_sync';

    /**
     * Handles synchronization schedule hook name.
     *
     * @var string Synchronization schedule hook name.
     */
    private const schedule_hook = '_posts_bridge_sync_schedule';

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
    public static function setup()
    {
        return self::get_instance();
    }

    /**
     * Registers custom wp schedules.
     *
     * @param array<string, array> $schedules New schedules to register.
     *
     * @return Array with custom schedules registerefs.
     */
    private static function register_custom_schedules($schedules)
    {
        $schedules['minutly'] = [
            'interval' => 60,
            'display' => __('Minutly', 'posts-bridge'),
        ];

        $schedules['quarterly'] = [
            'interval' => 60 * 15,
            'display' => __('Quarterly', 'posts-bridge'),
        ];

        $schedules['twicehourly'] = [
            'interval' => 60 * 30,
            'display' => __('Twice Hourly', 'posts-bridge'),
        ];

        return $schedules;
    }

    /**
     * Activates schedule hook events with a given recurrence.
     *
     * @param integer $timestamp UNIX timestamp for the first run.
     * @param string $recurrence How often the event should be subsequently recur.
     * @param array $payload Arguments to be passed to the hook's callback function.
     */
    private static function add_schedule($timestamp, $recurrence, $payload = [])
    {
        $next_schedule = wp_next_scheduled(self::schedule_hook, $payload);

        if ($next_schedule) {
            // if new timestamp is nearer than the existing one, replace it
            if ($next_schedule > $timestamp) {
                wp_unschedule_event(
                    $next_schedule,
                    self::schedule_hook,
                    $payload
                );
                $next_schedule = null;
            } else {
                // if recurrence from the existing schedule is different from the new one, replace it
                $schedule = wp_get_schedule(self::schedule_hook, $payload);
                if ($schedule !== $recurrence) {
                    wp_unschedule_event(
                        $next_schedule,
                        self::schedule_hook,
                        $payload
                    );
                    $next_schedule = null;
                }
            }
        }

        // creates a new schedule if it doesn't exists
        if (!$next_schedule) {
            wp_schedule_event(
                $timestamp,
                $recurrence,
                self::schedule_hook,
                $payload
            );
        }
    }

    /**
     * Unschedule the scheduled plugin's hook.
     */
    public static function unschedule()
    {
        $timestamp = wp_next_scheduled(self::schedule_hook, []);
        if ($timestamp !== false) {
            wp_unschedule_event($timestamp, self::schedule_hook);
        }
    }

    /**
     * Gets synchronize general setting field and toggles schedule state.
     */
    public static function schedule()
    {
        [
            'enabled' => $enabled,
            'recurrence' => $recurrence,
        ] = Posts_Bridge::setting('general')->synchronize;

        if (empty($enabled) || empty($recurrence)) {
            self::unschedule();
        } else {
            $next_run = time();
            switch ($recurrence) {
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

            self::add_schedule($next_run, $recurrence, []);
        }
    }

    private static function ajax_localization()
    {
        wp_localize_script(
            Posts_Bridge::slug() . '-admin',
            'postsBridgeAjaxSync',
            [
                'url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce(self::ajax_nonce),
                'action' => self::ajax_action,
            ]
        );
    }

    /*
     * Binds schedules to general settings updates.
     */
    protected function construct(...$args)
    {
        add_action(
            'updated_option',
            static function ($option) {
                if ($option === Posts_Bridge::slug() . '_general') {
                    self::schedule();
                }
            },
            90,
            1
        );

        add_action(
            'admin_enqueue_scripts',
            static function ($admin_page) {
                if ('settings_page_' . Posts_Bridge::slug() !== $admin_page) {
                    return;
                }

                self::ajax_localization();
            },
            11
        );

        add_action('wp_ajax_' . self::ajax_action, static function () {
            self::ajax_callback();
        });

        add_filter('cron_schedules', static function ($schedules) {
            return self::register_custom_schedules($schedules);
        });

        add_action(self::schedule_hook, static function () {
            $bridges = apply_filters('posts_bridge_bridges', []);
            foreach ($bridges as $bridge) {
                try {
                    self::sync($bridge);
                } catch (Error | Exception $e) {
                    Logger::log(
                        'Scheduled synchronization error: ' . $e->getMessage(),
                        Logger::ERROR
                    );
                }
            }
        });
    }

    /**
     * Ajax synchronization callback.
     */
    private static function ajax_callback()
    {
        check_ajax_referer(self::ajax_nonce);

        try {
            if (!current_user_can('manage_options')) {
                throw new Exception('ajax_unauthorized', 401);
            }

            $mode = isset($_POST['mode'])
                ? sanitize_text_field(wp_unslash($_POST['mode']))
                : null;

            $post_type = isset($_POST['post_type'])
                ? sanitize_text_field(wp_unslash($_POST['post_type']))
                : null;

            if (!in_array($mode, ['light', 'full'], true)) {
                throw new Exception('bad_request', 400);
            }

            self::$sync_mode = $mode;
            if ($post_type) {
                $bridges = array_filter([
                    apply_filters('posts_bridge_bridge', null, $post_type),
                ]);
            } else {
                $bridges = apply_filters('posts_bridge_bridges', []);
            }

            foreach ($bridges as $bridge) {
                self::sync($bridge);
            }

            wp_send_json(['success' => true], 200);
        } catch (Exception $e) {
            Logger::log(
                'Ajax synchronization error: ' . $e->getMessage(),
                Logger::ERROR
            );

            wp_send_json(
                ['success' => false, 'error' => $e->getMessage()],
                $e->getCode()
            );
        } finally {
            self::$sync_mode = 'light';
        }
    }

    /**
     * Synchronize post types collections.
     *
     * @param Post_Bridge $bridge Remote relation instance.
     *
     * @return boolean True if success, false otherwise.
     */
    private static function sync($bridge)
    {
        $foreign_ids = apply_filters(
            'posts_bridge_foreign_ids',
            $bridge->foreign_ids(),
            $bridge
        );

        $remote_pairs = array_reduce(
            $foreign_ids,
            function ($carry, $id) {
                $carry[$id] = 0;
                return $carry;
            },
            []
        );

        $query = new WP_Query([
            'post_type' => $bridge->post_type,
            'posts_per_page' => -1,
            'post_status' => 'any',
        ]);

        Logger::log('Starts synchronization clean up', Logger::DEBUG);

        global $posts_bridge_remote_cpt;
        while ($query->have_posts()) {
            $query->the_post();
            $foreign_id = $posts_bridge_remote_cpt->foreign_id;

            if (!isset($remote_pairs[$foreign_id])) {
                // if post does not exists on the remote backend, then remove it.
                $post_id = get_the_ID();
                Logger::log(
                    "Remove post {$post_id} as synchronization clean up",
                    Logger::DEBUG
                );

                wp_delete_post($post_id);
            } else {
                if (self::$sync_mode === 'light') {
                    // if light mode, skip synchronization for existing ones
                    unset($remote_pairs[$foreign_id]);
                } else {
                    $remote_pairs[$foreign_id] = get_post();
                }
            }
        }

        Logger::log('Ends synchronization clean up', Logger::DEBUG);

        wp_reset_postdata();

        Logger::log('Starts remote posts synchronization', Logger::DEBUG);

        foreach ($remote_pairs as $foreign_id => $post) {
            // if is a new remote model, mock a post as its local counterpart
            if (empty($post)) {
                $post = new WP_Post(
                    (object) [
                        'ID' => $post,
                        'post_type' => $bridge->post_type,
                    ]
                );
            }

            $rcpt = new Remote_CPT($post, $foreign_id);

            $data = $rcpt->fetch();

            if (is_wp_error($data) || empty($data)) {
                Logger::log(
                    'Fetching remote data error on synchronization',
                    Logger::ERROR
                );
                Logger::log(['foreign_id' => $foreign_id]);

                throw new Exception('sync_error', 500);
            }

            $skip = apply_filters(
                'posts_bridge_skip_synchronization',
                false,
                $rcpt,
                $data
            );

            if ($skip) {
                Logger::log(
                    "Skip synchrionization for rcpt with foreign id {$foreign_id}",
                    Logger::DEBUG
                );
                Logger::log($data, Logger::DEBUG);

                $rcpt->ID && wp_delete_post($rcpt->ID);
                continue;
            }

            $data = $bridge->map_remote_fields($data);

            $data['post_type'] = $rcpt->post_type;

            if ($rcpt->ID !== 0) {
                $data['ID'] = $rcpt->ID;
            }

            do_action('posts_bridge_before_synchronization', $rcpt, $data);

            $post_id = wp_insert_post($data);

            if (is_wp_error($post_id) || !$post_id) {
                Logger::log(
                    'Post creation error on synchronization',
                    Logger::ERROR
                );
                Logger::log($data, Logger::ERROR);

                throw new Exception('insert_error', 500);
            }

            update_post_meta(
                $post_id,
                Remote_CPT::_foreign_key_handle,
                $foreign_id
            );

            if (isset($data['featured_media'])) {
                $featured_media = Remote_Featured_Media::handle(
                    $data['featured_media']
                );
            } else {
                $featured_media = Remote_Featured_Media::default_thumbnail_id();
            }

            set_post_thumbnail($post_id, $featured_media);

            $rcpt = new Remote_CPT($post_id, $foreign_id, $data);

            do_action('posts_bridge_synchronization', $rcpt, $data);
        }

        Logger::log('Ends remote posts synchronization', Logger::DEBUG);
    }
}

Posts_Synchronizer::setup();
