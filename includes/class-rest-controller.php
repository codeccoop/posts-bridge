<?php

namespace WPCT_RCPT;

use WP_REST_Response;
use WP_REST_Controller;
use WP_Error;
use Exception;
use WP_Query;

class REST_Controller extends WP_REST_Controller
{
    // https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
    private $post_type;
    public static $db_schema = [
        'post_title' => null,
        'post_name' => null,
        'post_excerpt' => null,
        'post_status' => null,
        'post_type' => null,
        'featured_media' => null,
        'post_content' => null,
    ];

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
        $item = $this->_get_item($item->id);
        if (!$item) {
            new WP_Error('not-found', __('Not Found', 'scaffolding'), ['status' => 404]);
        }
        return new WP_REST_Response($this->prepare_item_for_response($item, $request), 200);
    }

    private function _get_item($item_id)
    {
        $item = get_post($item_id);
        if (!$item) {
            return null;
        }
        return $item;
    }

    public function create_item($request)
    {
        $item = $this->prepare_item_for_database($request);
        if (!$item) {
            return $this->bad_request();
        }

        $post = $this->add_item($item);

        if (!empty($post)) {
            do_action("rest_insert_{$post->post_type}", $post, $request, true);
            return new WP_REST_Response($this->prepare_item_for_response($post, $request), 200);
        }

        return new WP_Error('cant-create', __('Internal Server Error', 'scaffolding'), ['status' => 500]);
    }

    public function update_item($request)
    {
        $item = $this->prepare_item_for_database($request);
        if (!$item) {
            return $this->bad_request();
        }

        $post = $this->patch_item($item);
        if (!empty($post)) {
            do_action("rest_insert_{$post->post_type}", $post, $request, false);
            return new WP_REST_Response($this->prepare_item_for_response($post, $request), 200);
        }

        return new WP_Error('cant-update', __('Internal Server Error', 'scaffolding'), ['status' => 500]);
    }

    public function delete_item($request)
    {
        $item = $this->prepare_item_for_database($request);
        if (!$item) {
            return $this->bad_request();
        }

        $post = $this->remove_item($item);
        if ($post) {
            return new WP_REST_Response($this->prepare_item_for_response($post, $request), 200);
        }

        return new WP_Error('cant-delete', __('Internal Server Error', 'scaffolding'), ['status' => 500]);
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

    public static function parse_payload($payload, $post_id = null)
    {
        $data = [];
        foreach (array_merge(self::$db_schema, $payload) as $key => $val) {
            if (isset(self::$db_schema[$key])) {
                $data[$key] = $val;
            }
        }

        if (!empty($post_id)) {
            $existing_post = $this->_get_item($post_id);
            if (empty($existing_post)) {
                return null;
            }

            $data['ID'] = (int) $post_id;
        }

        return $data;
    }

    public function prepare_item_for_database($request)
    {
        $method = $request->get_method();
        $payload = $request->get_json_params();
        $params = $request->get_url_params();

        if ($method === 'POST') {
            $data = self::parse_payload($payload);
            $prepared_post = apply_filters("rest_pre_insert_{$this->post_type}", (object) $data, $request);
        } elseif ($method === 'PUT') {
            $data = self::parse_payload($payload, $params['id']);
            $prepared_post = apply_filters("rest_pre_insert_{$this->post_type}", (object) $data, $request);
        }
        

        try {
            switch ($method) {
                case 'POST':
                case 'PUT':
                    return (object) $prepared_post;
                case 'GET':
                case 'DELETE':
                    return (object) ['ID' => (int) $params['id']];
                default:
                    throw new Exception('Method Not Allowed', 405);
            };
        } catch (Exception) {
            return null;
        }
    }

    public function prepare_item_for_response($item, $request)
    {
        return get_object_vars($item);
    }

    private function insert_item($item, $is_new = true)
    {
        $featured_media = $item->featured_media;
        if (isset($item->featured_media)) {
            unset($item->featured_media);
        }

        $post_id = wp_insert_post($item);
        if (!$post_id) {
            return null;
        }

        $post = $this->_get_item($post_id);

        if (!empty($featured_media)) {
            if ((int) $featured_media == $featured_media) {
                $attachment_id = (int) $featured_media;  
            } else {
                $attachment_id = $this->store_external_image($featured_media, $post_id, $is_new);
            }

            if (is_int($attachment_id)) {
                set_post_thumbnail($post->ID, $attachment_id);
            }

        }
        return $post;
    }

    private function add_item($item) {
        return $this->insert_item($item, true);
    }

    private function patch_item($item)
    {
        return $this->insert_item($item, false);
    }

    private function remove_item($item)
    {
        $post = wp_remove_post($item->ID);
        return $this->prepare_item_for_response($post, null);
    }

    private function bad_request()
    {
        return new WP_Error('bad-request', __('Bad Request', 'scaffolding'), ['status' => 400]);
    }

    private function store_external_image($img_info, $post_id, $is_new)
    {
        if (empty($img_info)) {
            throw new Exception('NULL remote image resource');
        }

        if (filter_var($img_info, FILTER_VALIDATE_URL)) {
            $img_info = [
                'url' => $img_info,
                'modified' => date('Y-m-d h:m', time()),
            ];
        } else if (is_array($img_info)) {
            $img_info = array_merge([
                'url' => null,
                'modified' => date('Y-m-d h:m', time())
            ], $img_info);
        } else {
            return;
        }

        if (!(empty($img_info['url']) && empty($img_info['modified']))) {
            return;
        }

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
        if (!is_dir($path)) {
            mkdir($path);
        }
        $path .= '/' . date('m');
        if (!is_dir($path)) {
            mkdir($path);
        }
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
        if (is_wp_error($attachment_id)) {
            throw new Exception();
        }
        update_post_meta($attachment_id, '_wpct_remote_cpt_img_source', $img_info['url']);
        update_post_meta($attachment_id, '_wpct_remote_cpt_img_modified', $img_info['modified']);

        require_once(ABSPATH . 'wp-admin/includes/image.php');

        $attach_data = wp_generate_attachment_metadata($attachment_id, $path);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return $attachment_id;
    }
}
