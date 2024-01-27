<?php

namespace WPCT_REMOTE_CPT;

use Exception;
use WP_REST_Response;
use WP_REST_Controller;
use WP_Error;

class REST_Controller extends WP_REST_Controller
{
    // https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/

    private $post_type;

    public function __construct($post_type)
    {
        $this->post_type = $post_type;
    }

    public function register_routes()
    {
        $namespace = 'wpct-remote';
        $version = '1';
        $base = "{$namespace}/v{$version}";

        register_rest_route($base, "/{$this->post_type}", [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get_items'],
                'permission_callback' => [$this, 'get_items_permission_callback'],
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'create_item'],
                'permission_callback' => [$this, 'create_item_permission_callback']
            ],
        ]);

        register_rest_route($base, "/{$this->post_type}/(?P<id>[\d]+)", [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get_item'],
                'permission_callback' => [$this, 'get_item_permission_callback']
            ],
            [
                'methods' => 'PUT',
                'callback' => [$this, 'update_item'],
                'permission_callback' => [$this, 'update_item_permission_callback']
            ],
            [
                'methods' => 'DELETE',
                'callback' => [$this, 'delete_item'],
                'permission_callback' => [$this, 'delete_item_permission_callback']
            ],
        ]);
    }

    public function get_items($request)
    {
        $posts = get_posts(['post_type' => $this->post_type]);
        $data = [];
        foreach ($posts as $post) {
            $datum = $this->prepare_item_for_response($post, $request);
            $data[] = $datum;
        }

        return new WP_REST_Response($data, 200);
    }


    public function get_item($request)
    {
        $item = $this->prepare_item_for_database($request);
        $item = $this->_get_item($item->id, $request);
        if (!$item) new WP_Error('not-found', __('Not Found', 'wpct-remote-cpt'), ['status' => 404]);
        return new WP_REST_Response($item, 200);
    }

    private function _get_item($item_id, $request = null)
    {
        $item = get_post($item_id);
        if (!$item) return null;
        return $this->prepare_item_for_response($item, $request);
    }

    public function create_item($request)
    {
        $item = $this->prepare_item_for_database($request);
        if (!$item) return $this->bad_request();

        $inserted = $this->insert_item($item);
        if (is_array($inserted)) return new WP_REST_Response($inserted, 200);

        return new WP_Error('cant-create', __('Internal Server Error', 'wpct-remote-cpt'), ['status' => 500]);
    }

    public function update_item($request)
    {
        $item = $this->prepare_item_for_database($request);
        if (!$item) return $this->bad_request();

        $updated = $this->patch_item($item);
        if (is_array($updated)) return new WP_REST_Response($updated, 200);

        return new WP_Error('cant-update', __('Internal Server Error', 'wpct-remote-cpt'), ['status' => 500]);
    }

    public function delete_item($request)
    {
        $item = $this->prepare_item_for_database($request);
        if (!$item) return $this->bad_request();

        $deleted = $this->remove_item($item);
        if ($deleted) return new WP_REST_Response($deleted, 200);

        return new WP_Error('cant-delete', __('Internal Server Error', 'wpct-remote-ctp'), ['status' => 500]);
    }

    public function get_items_permission_callback($request)
    {
        return true;
    }

    public function get_item_permission_callback($request)
    {
        return $this->get_item_permission_callback($request);
    }

    public function create_item_permission_callback($request)
    {
        return current_user_can('publish_posts');
    }

    public function update_item_permission_callback($request)
    {
        return current_user_can('edit_posts');
    }

    public function delete_item_permission_callback($request)
    {
        return current_user_can('delete_posts');
    }

    public function prepare_item_for_database($request)
    {
        $method = $request->get_method();
        $data = $request->get_body_params();
        $params = $request->get_params();
        try {
            switch ($method) {
                case 'POST':
                    return (object) [
                        'post_title' => (string) $data['post_title'],
                        'post_excerpt' => (string) $data['post_excerpt'],
                        'post_content' => (string) $data['post_content'],
                        'post_name' => (string) $data['post_name'],
                        'post_status' => (string) $data['post_status'],
                        'remote_id' => (string) $data['remote_id'],
                    ];
                case 'PUT':
                    return (object) [
                        'ID' => (int) $data['ID'],
                        'post_title' => (string) $data['post_title'],
                        'post_excerpt' => (string) $data['post_excerpt'],
                        'post_content' => (string) $data['post_content'],
                        'post_name' => (string) $data['post_name'],
                        'post_status' => (string) $data['post_status'],
                        'remote_id' => (string) $data['remote_id'],
                    ];
                case 'GET':
                case 'DELETE':
                    return (object) ['id' => (int) $params['id']];
                default:
                    throw new Exception('Method Not Allowed', 405);
            };
        } catch (Exception) {
            return null;
        }
    }

    public function prepare_item_for_response($item, $request)
    {
        $remote_id = get_post_meta($item->ID, 'remote_id', true);
        $data = get_object_vars($item);
        $data['remote_id'] = (int) $remote_id;
        return $data;
    }

    public function insert_item($item)
    {
        $post_id = wp_insert_post($item);
        if (!$post_id) return null;
        return $this->_get_item($post_id);
    }

    public function patch_item($item)
    {
        $post_id = wp_insert_post($item);
        if (!$post_id) return null;
        return $this->_get_item($item->id);
    }

    public function remove_item($item)
    {
        $post = wp_remove_post($item->ID);
        return $this->prepare_item_for_response($post, null);
    }

    public function bad_request()
    {
        return new WP_Error('bad-request', __('Bad Request', 'wpct-remote-cpt'), ['status' => 400]);
    }
}
