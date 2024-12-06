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
    public function construct(...$args)
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
        ] = Settings::get_setting('posts-bridge', 'general')->syncronize;
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

        $success = $this->sync();

        wp_send_json(['success' => $success], 200);
    }

    /**
     * Synchronize REST API remote relation posts.
     *
     * @param Remote_Relation $relation REST remote relation.
     *
     * @return boolean True if success, false otherwise.
     */
    private function rest_sync($relation)
    {
        $endpoint = $relation->endpoint();
        $backend = $relation->backend();

        do_action('posts_bridge_before_search', $relation);
        $res = $backend->get($endpoint);
        do_action('posts_bridge_after_search', $res, $relation);

        if (is_wp_error($res)) {
            return false;
        }

        $foreign_ids = array_map(static function ($model) use ($relation) {
            return (new JSON_Finger($model))->get($relation->foreign_key());
        }, (array) $res['data']);

        return $this->sync_posts($foreign_ids, $relation);
    }

    /**
     * Synchronize RPC API remote relation posts.
     *
     * @param Remote_Relation $relation RPC remote relation.
     *
     * @return boolean True if success, false otherwise.
     */
    private function rpc_sync($relation)
    {
        $rpc = Settings::get_setting('posts-bridge', 'rpc-api');
        $url = $relation->url();
        $headers = $relation->headers();

        $result = HTTP_Client::rpc_login($url, $headers);

        if (is_wp_error($result)) {
            return false;
        }

        [$sid, $uid] = $result;

        $payload = HTTP_Client::rpc_payload($sid, 'object', 'execute', [
            $rpc->database,
            $uid,
            $rpc->password,
            $relation->model(),
            'search',
            [],
        ]);

        do_action('posts_bridge_before_search', $relation);
        $res = http_bridge_post($url, $payload, $headers);
        do_action('posts_bridge_before_search', $res, $relation);

        $foreign_ids = HTTP_Client::rpc_response($res);
        if (is_wp_error($foreign_ids)) {
            return false;
        }

        return $this->sync_posts($foreign_ids, $relation);
    }

    /**
     * Synchronize post types collections.
     *
     * @param array $foreign_ids Remote ids reference.
     * @param Remote_Relation $relation Remote relation instance.
     *
     * @return boolean True if success, false otherwise.
     */
    private function sync_posts($foreign_ids, $relation)
    {
        global $remote_cpt;

        $post_type = $relation->post_type();

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
            $foreign_id = $remote_cpt->foreign_id();
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

        $sync = [];
        foreach ($foreign_ids as $foreign_id => $post) {
            // if is a new remote model, mock a post as its local counterpart
            if (empty($post)) {
                $post = new WP_Post(
                    (object) ['ID' => $post, 'post_type' => $post_type]
                );
            }

            $rcpt = new Remote_CPT($post);
            add_filter(
                'posts_bridge_endpoint',
                function ($endpoint, $fid, $rcpt) use (
                    $relation,
                    $foreign_id,
                    $post,
                    &$sync
                ) {
                    if (
                        $fid ||
                        isset($sync[$foreign_id]) ||
                        $rcpt->ID !== $post->ID ||
                        $relation->proto() === 'rpc'
                    ) {
                        return $endpoint;
                    }

                    $parsed = parse_url($endpoint);
                    $endpoint =
                        preg_replace('/\/+$/', '', $parsed['path']) .
                        '/' .
                        $foreign_id;
                    if (isset($parsed['query'])) {
                        $endpoint .= '/?' . $parsed['query'];
                    }

                    $sync[$foreign_id] = true;
                    return $endpoint;
                },
                5,
                3
            );

            $data = $rcpt->fetch();
            $data = $relation->map_remote_fields($data);

            if (is_wp_error($data)) {
                return false;
            }

            $custom_fields = $relation->remote_custom_fields();

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
                $featured_media = Remote_Featured_Media::default_thumbnail_id();
            }

            set_post_thumbnail($post_id, $featured_media);

            if (!empty($data['categories'])) {
                if (!is_array($data['categories'])) {
                    $data['categories'] = (string) $data['categories'];
                }
                wp_set_post_terms($post_id, $data['categories'], 'category');
            }

            if (!empty($data['tags'])) {
                if (!is_array($data['tags'])) {
                    $data['tags'] = (string) $data['tags'];
                }
                wp_set_post_terms($post_id, $data['tags'], 'post_tag');
            }

            foreach ($custom_fields as $name) {
                if (isset($data[$name])) {
                    update_post_meta($post_id, $name, $data[$name]);
                }
            }
        }

        return true;
    }
}
