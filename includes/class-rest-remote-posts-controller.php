<?php

namespace POSTS_BRIDGE;

use WP_Error;
use WP_REST_Posts_Controller;
use WP_REST_Post_Meta_Fields;
use Exception;

/**
 * REST API Controller for remote posts.
 */
class REST_Remote_Posts_Controller extends WP_REST_Posts_Controller
{
    /**
     * Handle alias for id field on rest payloads that prevents collisions with WP schema.
     *
     * @var string $rest_id_alias Alias name.
     */
    public const _rest_id_alias = '_posts_bridge_rest_id';

    /**
     * Handle the controlled post type.
     *
     * @var string $post_type Post type slug.
     */
    protected $post_type;

    /**
     * Handle the controller WP_REST_Post_Meta_Fields instance.
     *
     * @var WP_REST_Post_Meta_Fields $meta WP_REST_Post_Meta_Fields instance.
     */
    protected $meta;

    /**
     * Handle the controller endpoint base path.
     *
     * @var string $rest_base Controller's endpoint base path.
     */
    protected $rest_base;

    /**
     * Handle the controller endpoints namespace.
     *
     * @var string $namespace REST API namespace.
     */
    protected $namespace = 'wp-bridges/v1';

    /**
     * Binds the controlled post type, setup the rest_base, registers the
     * WP_REST_Post_Meta_Fields controller and registers the REST API routes.
     */
    public function __construct($post_type)
    {
        $this->post_type = $post_type;
        $this->rest_base = 'posts-bridge/' . $post_type;
        $this->meta = new WP_REST_Post_Meta_Fields($this->post_type);
        $this->register_routes();

        add_filter("rest_pre_insert_{$post_type}", function ($prepared_post, $request) {
            return $this->filter_prepared_post($prepared_post, $request);
        }, 10, 2);

        add_action("rest_insert_{$post_type}", function ($post, $request, $is_new) {
            $this->on_rest_insert($post, $request, $is_new);
        }, 10, 3);

        add_filter('rest_pre_dispatch', function ($result, $server, $request) {
            return $this->rest_pre_dispatch($result, $server, $request);
        }, 10, 3);
    }

    private function is_own_route($request)
    {
        $own_routes = $this->namespace . '/' . $this->rest_base;
        return preg_match('/' . preg_quote($own_routes, '/') . '/', $request->get_route());
    }

    /**
     * Filters the rest insert prepared post with relation fields.
     *
     * @param object $prepared_post Prepared post data before inserts.
     * @param WP_REST_Request $request Current request.
     *
     * @return object Prepared post data with mapped remote fields.
     */
    private function filter_prepared_post($prepared_post, $request)
    {
        if (!$this->is_own_route($request)) {
            return $prepared_post;
        }

        $relation = apply_filters('posts_bridge_relation', null, $this->post_type);
        $payload = $request->get_json_params();

        // Unalias foreign id before post preparation
        $foreign_key = $relation->get_foreign_key();
        if ($foreign_key === 'id') {
            $payload['id'] = $request[self::_rest_id_alias];
            unset($payload[self::_rest_id_alias]);
        }

        $prepared_data = $relation->map_remote_fields($payload);
        $prepared_post = array_merge((array) $prepared_post, $prepared_data);

        return (object) $prepared_post;
    }

    /**
     * Updates post custom fields after REST API inserts based on relation custom fields and
     * maps featured_media custom fields to the request params.
     *
     * @param WP_Post $post Writed post.
     * @param WP_REST_Request $request Current request.
     * @param boolean $is_new True if is a newly created post.
     */
    private function on_rest_insert($post, $request, $is_new)
    {
        if (!$this->is_own_route($request)) {
            return;
        }

        $relation = apply_filters('posts_bridge_relation', null, $this->post_type);
        foreach ($relation->get_remote_custom_fields() as $foreign => $name) {
            if (isset($request[$foreign])) {
                update_post_meta($post->ID, $name, $request[$foreign]);
            }
        }

        // Map custom featured media to the request before media handler execution
        foreach ($relation->get_remote_post_fields() as $foreign => $name) {
            if ($name === 'featured_media') {
                $request->set_param('featured_media', $request[$foreign]);
            }
        }

        $foreign_key = $relation->get_foreign_key();

        // Unalias foreign key on the request
        if ($foreign_key === 'id') {
            $foreign_key = self::_rest_id_alias;
        }

        update_post_meta($post->ID, Remote_CPT::_foreign_key_handle, $request[$foreign_key]);
    }

    /**
     * Sanitize and validates request params before rest dispatches to prevent schema conflicts and uncompleted
     * payloads.
     *
     * @param mixed $result Response to replace the requested version with.
     * @param WP_REST_Server $server Server instance.
     * @param WP_REST_Request $request Request instance.
     *
     * @return mixed Unaltered result.
     */
    public function rest_pre_dispatch($result, $server, $request)
    {
        // Exits if request is not for the own remote cpt
        if (!$this->is_own_route($request)) {
            return $result;
        }

        // Exits on read requests
        if (!strstr($server::EDITABLE, $request->get_method())) {
            return $result;
        }

        // Exits if request has been sanitized
        if (isset($request[self::_rest_id_alias])) {
            return $result;
        }

        $relation = apply_filters('posts_bridge_relation', null, $this->post_type);
        $foreign_key = $relation->get_foreign_key();

        // Exits if no foreign key on the payload
        if (!isset($request[$foreign_key])) {
            return new WP_Error('required_foreign_key', __('Remote CPT foreign key is unkown', 'posts-bridge'));
        }

        // WP REST API works heavy with the ID field. Alias it on the request before dispatch
        // to prevent collisions between the backend payload and the WP schema.
        if (isset($request['id'])) {
            $id = $request['id'];
            $request->set_param(self::_rest_id_alias, $id);

            // WP_REST_Requests returns body params before query or route params. If method is PUT or PATCH,
            // with ID on the URL, it can conflict URL id with body id. Does resolve this collision.
            preg_match('/\d+$/', $request->get_route(), $matches);
            if (count($matches)) {
                $wp_id = $matches[0];
                $request->set_param('id', (int) $wp_id);
            } else {
                // On posts requests, WP doesn't like IDs.
                $request->set_param('id', null);
            }
        }

        return $result;
    }

    /**
     * Overwrite parent's featured media handler to download URL images and
     * store them as WP attachments.
     *
     * @param string|int $featured_media Featured media source. Could be an ID or a URL.
     * @param int $post_id Target post ID.
     */
    protected function handle_featured_media($featured_media, $post_id)
    {
        $featured_media = Remote_Featured_Media::handle($featured_media);
        parent::handle_featured_media($featured_media, $post_id);
    }

    /**
     * Overwrite post's default schema to allow URL featured media values.
     *
     * @return array Item schema data.
     */
    public function get_item_schema()
    {
        $schema = parent::get_item_schema();
        $schema['properties']['featured_media'] = ['integer', 'string'];
        return $schema;
    }
}
