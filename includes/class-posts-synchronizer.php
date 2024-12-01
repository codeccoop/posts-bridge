<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Singleton;
use WP_Query;
use WP_Post;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Remote posts index syncronzier.
 */
class Posts_Synchronizer extends Singleton
{
    /**
     * Handle full synchronization mode. Full synchronization will fetch remote data of all remote models.
     * Light mode does only fetch differences between the posts collection and the foreign ids.
     *
     * @var string $sync_mode Full or light mode.
     */
    private $sync_mode = 'light';

    /*
     * Binds schedules to general settings updates.
     */
    public function __construct()
    {
        add_action(
            'update_option',
            function ($option) {
                if ($option === 'posts-bridge_general') {
                    $this->schedule();
                }
            },
            90,
            1
        );

        add_action('wp_ajax_posts_bridge_sync', function () {
            $this->sync_callback();
        });
    }

    /**
     * Gets syncronize general setting field and toggles schedule state.
     */
    public function schedule()
    {
        [
            'enabled' => $enabled,
            'recurrence' => $recurrence,
        ] = Settings::get_setting('posts-bridge', 'general', 'synchronize');
        if (empty($enabled) || empty($recurrence)) {
            Posts_Bridge::unschedule();
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
            }

            Posts_Bridge::schedule($next_run, $recurrence, []);
        }
    }

    /**
     * Synchronize posts with remote sources.
     */
    public function sync()
    {
        $relations = apply_filters('posts_bridge_relations', [], 'rest');

        foreach ($relations as $rel) {
            $this->rest_sync($rel);
        }

        $relations = apply_filters('posts_bridge_relations', [], 'rpc');
        foreach ($relations as $rel) {
            $this->rpc_sync($rel);
        }
    }

    /**
     * Ajax synchronization callback.
     */
    private function sync_callback()
    {
        check_ajax_referer('posts-bridge-ajax-sync');
        if (!current_user_can('manage_options')) {
            return;
        }

        $this->sync_mode = isset($_POST['sync_mode'])
            ? $_POST['sync_mode']
            : 'light';
        $this->sync();

        wp_send_json(['success' => true], 200);
    }

    /**
     * Synchronize REST API remote relation posts.
     *
     * @param Remote_Relation $relation REST remote relation.
     */
    private function rest_sync($relation)
    {
        $url = $relation->get_url();
        $headers = $relation->get_headers();
        $backend = $relation->get_backend();

        $models = HTTP_Client::fetch($url, $headers);
        if (is_wp_error($models)) {
            return false;
        }

        $foreign_ids = array_map(static function ($model) use ($relation) {
            return (new JSON_Finger($model))->get($relation->get_foreign_key());
        }, $models);

        return $this->sync_posts(
            $relation->get_post_type(),
            $foreign_ids,
            static function ($foreign_id, $remote_cpt) use (
                $relation,
                $backend
            ) {
                $endpoint = $relation->get_endpoint();
                $url = parse_url($endpoint);
                $endpoint = preg_replace('/\/$/', '', $url['path']);
                $endpoint .= '/' . $foreign_id;

                if (isset($url['query'])) {
                    $endpoint .= '?' . $url['query'];
                }

                $endpoint = apply_filters(
                    'posts_bridge_endpoint',
                    $endpoint,
                    $foreign_id,
                    $remote_cpt
                );

                $url = $backend->get_endpoint_url($endpoint);
                $headers = $backend->get_headers();

                $locale = apply_filters(
                    'wpct_i18n_current_language',
                    null,
                    'locale'
                );
                $data = HTTP_Client::fetch($url, $headers);
                $data = $relation->map_remote_fields($data);
                $data = apply_filters(
                    'posts_bridge_fetch',
                    $data,
                    $remote_cpt,
                    $locale
                );
                return [
                    $data,
                    array_values($relation->get_remote_custom_fields()),
                ];
            }
        );
    }

    /**
     * Synchronize RPC API remote relation posts.
     *
     * @param Remote_Relation $relation RPC remote relation.
     */
    private function rpc_sync($relation)
    {
        $model = $relation->get_model();
        $url = $relation->get_url();
        $headers = $relation->get_headers();

        $foreign_ids = HTTP_Client::search($url, $model, $headers);
        if (is_wp_error($foreign_ids)) {
            return false;
        }

        return $this->sync_posts(
            $relation->get_post_type(),
            $foreign_ids,
            static function ($foreign_id, $remote_cpt) use ($relation) {
                $locale = apply_filters(
                    'wpct_i18n_current_language',
                    null,
                    'locale'
                );
                $data = HTTP_Client::read(
                    $relation->get_url(),
                    $relation->get_model(),
                    $foreign_id,
                    $relation->get_headers()
                );
                $data = $relation->map_remote_fields($data);
                $data = apply_filters(
                    'posts_bridge_fetch',
                    $data,
                    $remote_cpt,
                    $locale
                );
                return [
                    $data,
                    array_values($relation->get_remote_custom_fields()),
                ];
            }
        );
    }

    /**
     * Synchronize post types collections.
     *
     * @param string $post_type Target post type collection.
     * @param array<integer> $foreign_ids Remote ids reference.
     * @param Closure(int, object) $fetch_data Method to fetch remote models data.
     */
    private function sync_posts($post_type, $foreign_ids, $fetch_data)
    {
        global $remote_cpt;

        $foreign_ids = array_reduce(
            $foreign_ids,
            function ($carry, $id) {
                $carry[$id] = 0;
                return $carry;
            },
            []
        );

        $query = new WP_Query([
            'post_type' => $post_type,
            'posts_per_page' => -1,
            'post_status' => 'any',
        ]);

        while ($query->have_posts()) {
            $query->the_post();
            $foreign_id = $remote_cpt->get_foreign_id();
            if (!isset($foreign_ids[$foreign_id])) {
                wp_delete_post(get_the_ID());
            } else {
                if ($this->sync_mode === 'light') {
                    unset($foreign_ids[$foreign_id]);
                } else {
                    $foreign_ids[$foreign_id] = get_post();
                }
            }
        }

        wp_reset_postdata();

        foreach ($foreign_ids as $foreign_id => $post) {
            // if is a new remote model, mock a post as its local counterpart
            if (empty($post)) {
                $post = new WP_Post(
                    (object) ['ID' => $post, 'post_type' => $post_type]
                );
            }

            [$data, $custom_fields] = $fetch_data(
                $foreign_id,
                new Remote_CPT($post)
            );
            if (is_wp_error($data)) {
                return false;
            }

            $data['post_type'] = $post_type;
            if ($post->ID !== 0) {
                $data['ID'] = $post->ID;
            }

            $post_id = wp_insert_post($data);
            if (is_wp_error($post_id) || !$post_id) {
                return false;
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
                $featured_media = Remote_Featured_Media::get_default_thumbnail_id();
            }

            set_post_thumbnail($post_id, $featured_media);

            foreach ($custom_fields as $name) {
                if (isset($data[$name])) {
                    update_post_meta($post_id, $name, $data[$name]);
                }
            }
        }
    }
}
