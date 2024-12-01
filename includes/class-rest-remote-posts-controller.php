<?php

namespace POSTS_BRIDGE;

use Error;
use WP_Error;
use WP_REST_Posts_Controller;
use WP_REST_Post_Meta_Fields;

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
    private const _rest_alias_prefix = '_posts_bridge_rest_';

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
     *
     * @param string $post_type Post type to be handled.
     */
    public function __construct($post_type)
    {
        $this->post_type = $post_type;
        $this->rest_base = 'posts-bridge/' . $post_type;
        $this->meta = new WP_REST_Post_Meta_Fields($this->post_type);
        $this->register_routes();

        add_filter(
            "rest_pre_insert_{$post_type}",
            function ($prepared_post, $request) {
                return $this->filter_prepared_post($prepared_post, $request);
            },
            10,
            2
        );

        add_action(
            "rest_insert_{$post_type}",
            function ($post, $request, $is_new) {
                $this->on_rest_insert($post, $request, $is_new);
            },
            10,
            3
        );

        add_filter(
            'rest_pre_dispatch',
            function ($result, $server, $request) {
                return $this->rest_pre_dispatch($result, $server, $request);
            },
            10,
            3
        );
    }

    /**
     * Checks if the requests falls into the controller API namespace.
     *
     * @param WP_REST_Request $request Request instance.
     *
     * @return boolean True if the request is owned.
     */
    private function is_own_route($request)
    {
        $own_routes = $this->namespace . '/' . $this->rest_base;
        return preg_match(
            '/' . preg_quote($own_routes, '/') . '/',
            $request->get_route()
        );
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

        $relation = apply_filters(
            'posts_bridge_relation',
            null,
            $this->post_type
        );
        $payload = $request->get_json_params();
        foreach ($payload as $field => $value) {
            if ($this->is_alias($field)) {
                unset($payload[$field]);
                $payload[$this->unalias($field)] = $value;
            }
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

        $relation = apply_filters(
            'posts_bridge_relation',
            null,
            $this->post_type
        );
        foreach ($relation->get_remote_custom_fields() as $foreign => $name) {
            if (isset($request[$foreign])) {
                update_post_meta($post->ID, $name, $request[$foreign]);
            }
        }

        // Map custom featured media to the request before media handler execution
        foreach ($relation->get_remote_post_fields() as $foreign => $name) {
            if ($name === 'featured_media') {
                try {
                    $keys = JSON_Finger::parse($foreign);
                } catch (Error) {
                    $keys = [];
                }

                // Checks if foreign is a json finger
                if (count($keys) > 1) {
                    $key = $keys[0];
                    $alias = $this->alias($key);
                    // Checks if foreing field is aliased
                    if (isset($request[$alias])) {
                        // fix foreign key
                        $foreign = str_replace($key, $alias, $foreign);
                    }
                } else {
                    // Checks if foreing field is aliased
                    $alias = $this->alias($foreign);
                    if (isset($request[$alias])) {
                        // Overwrite foreig with alias
                        $foreign = $alias;
                    }
                }

                $value = (new JSON_Finger($request->get_params()))->get(
                    $foreign
                );
                $request->set_param('featured_media', $value);
                break;
            }
        }

        // Set default featured if empty
        if (empty($request['featured_media'])) {
            $request[
                'featured_media'
            ] = Remote_Featured_Media::get_default_thumbnail_id();
        }

        $foreign_key = $relation->get_foreign_key();

        // Unalias foreign key on the request
        $schema_properties = $this->get_item_schema()['properties'];
        if (isset($schema_properties[$foreign_key])) {
            $foreign_key = $this->alias($foreign_key);
        }

        update_post_meta(
            $post->ID,
            Remote_CPT::_foreign_key_handle,
            $request[$foreign_key]
        );
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

        // check schema conflict ressolutions
        $schema_properties = array_keys($this->get_item_schema()['properties']);
        $is_processed = array_reduce(
            $schema_properties,
            function ($is_processed, $property) use ($request) {
                return $is_processed ||
                    !empty($request[$this->alias($property)]);
            },
            false
        );

        // Exits if request has been processed
        if ($is_processed) {
            return $result;
        }

        $relation = apply_filters(
            'posts_bridge_relation',
            null,
            $this->post_type
        );
        $foreign_key = $relation->get_foreign_key();

        // Exits if no foreign key on the payload
        if (!isset($request[$foreign_key])) {
            return new WP_Error(
                'required_foreign_key',
                __('Remote CPT foreign key is unkown', 'posts-bridge')
            );
        }

        // Resolve schema conflicts
        foreach ($schema_properties as $property) {
            if (!empty($request[$property])) {
                $value = $request[$property];
                $request->set_param($this->alias($property), $value);
                unset($request[$property]);
            }
        }

        // Restore request id if comes from the URL
        if (preg_match('/\d+$/', $request->get_route(), $matches)) {
            $wp_id = $matches[0];
            $request->set_param('id', (int) $wp_id);
        }

        return $result;
    }

    /**
     * Aliases a field name.
     *
     * @param string $name Original field name.
     *
     * @return string Aliased field name.
     */
    private function alias($field)
    {
        return self::_rest_alias_prefix . $field;
    }

    /**
     * Reverses field name alias.
     *
     * @param string $alias Aliased field name.
     *
     * @return string Original field name.
     */
    private function unalias($alias)
    {
        return str_replace(self::_rest_alias_prefix, '', $alias);
    }

    /**
     * Checks if field name aliased.
     *
     * @param string $name Name of the field.
     *
     * return boolean True if name is an alias.
     */
    private function is_alias($name)
    {
        return (bool) strstr($name, self::_rest_alias_prefix);
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
