<?php

namespace WPCT_RCPT;

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

        add_action('rest_insert_' . $post_type, [$this, 'on_rest_insert'], 10, 3);
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
                        'thumbnail' => (array) $data['thumbnail'],
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
                        'thumbnail' => (array) $data['thumbnail'],
                        'remote_id' => (string) $data['remote_id'],
                    ];
                case 'GET':
                case 'DELETE':
                    return (object) ['id' => (int) $params['id']];
                default:
                    throw new \Exception('Method Not Allowed', 405);
            };
        } catch (\Exception) {
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

    public function on_rest_insert($post, $request, $is_new)
    {
        $payload = $request->get_json_params();

        if (isset($payload['thumbnail']) && $payload['thumbnail']) {
            $img_info = $payload['thumbnail'];
            $attachment_id = $this->store_external_image($img_info, $post->ID, $is_new);
            set_post_thumbnail($post->ID, $attachment_id);
        }
    }

    private function store_external_image($img_info, $post_id, $is_new)
    {
        if (!$img_info) throw new \Exception('NULL remote image resource');

        if (!$is_new) {
            $thumbnail_id = get_post_thumbnail_id($post_id);
            $source = get_post_meta($thumbnail_id, '_wpct_remote_cpt_img_source', true);
            $modified = get_post_meta($thumbnail_id, '_wpct_remote_cpt_img_modified', true);
            if ($source === $img_info['url'] && $modified === $img_info['modified']) {
                return;
            }
        }

        $query = new WP_Query([
            'post_type' => 'attachment',
            'posts_per_page' => 1,
            'post_status' => 'inherit',
            'meta_query' => [
                [
                    'key' => '_wpct_remote_cpt_img_source',
                    'value' => $img_info['url'],
                    'compare' => '=',
                ],
                [
                    'key' => '_wpct_remote_cpt_img_modified',
                    'value' => $img_info['modified'],
                    'compare' => '=',
                ],
            ]
        ]);

        foreach ($query->posts as $attachment) {
            return $attachment->ID;
        }

        $filename = basename($img_info['url']);
        $path = ABSPATH . 'wp-content/uploads';
        $path .= '/' . date('Y');
        if (!is_dir($path)) mkdir($path);
        $path .= '/' . date('m');
        if (!is_dir($path)) mkdir($path);
        $path .=  '/' . $filename;

        file_put_contents($path, file_get_contents($img_info['url']));

        $filetype = wp_check_filetype($filename);
        if (!$filetype['type']) {
            $filetype['type'] = mime_content_type($path);
        }

        $attachment = [
            'post_mime_type' => $filetype['type'],
            'post_title' => sanitize_title($filename),
            'post_content' => '',
            'post_status' => 'inherit'
        ];

        $attachment_id = wp_insert_attachment($attachment, $path);
        if (is_wp_error($attachment_id)) throw new Exception();
        update_post_meta($attachment_id, '_wpct_remote_cpt_img_source', $img_info['url']);
        update_post_meta($attachment_id, '_wpct_remote_cpt_img_modified', $img_info['modified']);

        require_once(ABSPATH . 'wp-admin/includes/image.php');

        $attach_data = wp_generate_attachment_metadata($attachment_id, $path);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return $attachment_id;
    }
}
