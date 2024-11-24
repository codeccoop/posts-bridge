<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Singleton;
use WP_Query;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Remote posts index syncronzier.
 */
class Posts_Synchronizer extends Singleton
{
    /*
     * Binds schedules to general settings updates.
     */
    public function __construct()
    {
        add_action('update_option', function ($option) {
            if ($option === 'posts-bridge_general') {
                $this->schedule();
            }
        }, 90, 1);

        add_action('wp_ajax_posts_bridge_sync', function () {
            $this->sync_callback();
        });
    }

    /**
     * Gets syncronize general setting field and toggles schedule state.
     */
    private function schedule()
    {
        ['enabled' => $enabled, 'recurrence' => $recurrence] = Settings::get_setting('posts-bridge', 'general', 'synchronize');
        if (empty($enabled) || empty($recurrence)) {
            Posts_Bridge::unschedule();
        } else {
            $next_run = time();
            switch ($recurrence) {
                case 'minutly':
                    $next_run += 60;
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
            self::sync();
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

        $remote_ids = array_map(function ($model) use ($relation) {
            return $model[$relation->get_foreign_key()];
        }, $models);

        return $this->sync_posts($relation->get_post_type(), $remote_ids, function ($remote_id) use ($relation, $backend) {
            $endpoint = preg_replace('/\/^/', '', $relation->get_endpoint());
            $endpoint .= '/' . $remote_id;
            $endpoint = apply_filters('posts_bridge_endpoint', $endpoint, null);

            $url = $backend->get_endpoint_url($endpoint);
            $headers = $backend->get_headers();

            $data = HTTP_Client::fetch($url, $headers);
            return $relation->map_remote_fields($data);
        });
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

        $remote_ids = HTTP_Client::search($url, $model, $headers);
        if (is_wp_error($remote_ids)) {
            return false;
        }

        return $this->sync_posts($relation->get_post_type(), $remote_ids, function ($remote_id) use ($relation) {
            $data = HTTP_Client::read($relation->get_url(), $relation->get_model(), $remote_id, $relation->get_headers());
            return $relation->map_remote_fields($data);
        });
    }

    /**
     * Synchronize post types collections.
     *
     * @param string $post_type Target post type collection.
     * @param array<integer> $remote_ids Remote ids reference.
     * @param function $fetch_data Method to fetch remote models data.
     */
    private function sync_posts($post_type, $remote_ids, $fetch_data)
    {
        global $remote_cpt;

        $remote_ids = array_reduce($remote_ids, function ($carry, $id) {
            $carry[$id] = 1;
            return $carry;
        }, []);

        $args = [
            'post_type' => $post_type,
            'posts_per_page' => -1,
            'post_status' => 'any',
            'meta_query' => [
                'key' => '_posts_bridge_remote_id',
                'value' => array_keys($remote_ids),
            ],
        ];

        $args['meta_query']['compare'] = 'NOT IN';
        $query = new WP_Query($args);

        while ($query->have_posts()) {
            $query->the_post();
            wp_delete_post(get_the_ID(), true);
        }

        wp_reset_postdata();

        $args['meta_query']['compare'] = 'IN';
        $query = new WP_Query($args);
        while ($query->have_posts()) {
            $query->the_post();
            unset($remote_ids[$remote_cpt->remote_id]);
        }

        $remote_ids = array_keys($remote_ids);
        foreach ($remote_ids as $remote_id) {
            $data = $fetch_data($remote_id);
            if (is_wp_error($data)) {
                return false;
            }

            $data['post_type'] = $post_type;
            $post_id = wp_insert_post($data);
            if (is_wp_error($post_id) || !$post_id) {
                return false;
            }

            update_post_meta($post_id, '_posts_bridge_remote_id', $remote_id);
        }
    }
}
