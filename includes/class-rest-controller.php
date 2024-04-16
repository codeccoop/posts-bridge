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
            $post_data = $this->prepare_item_for_response($post, $request);
            $data[] = $post_data;
        }

        return new WP_REST_Response($data, 200);
    }


    public function get_item($request)
    {
        $item = $this->prepare_item_for_database($request);
        $post = $this->_get_item($item->id);
        if (!$post) {
            new WP_Error('not-found', __('Not Found', 'scaffolding'), ['status' => 404]);
        }

        $post_data = $this->prepare_item_for_response($post, $request);
        $response = new WP_REST_Response($post_data, 200);
        return apply_filters("rest_prepare_{$this->post_type}", $response, $post, $request);
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
            $post_data = $this->prepare_item_for_response($post, $request);
            $response = new WP_REST_Response($post_data, 200);
            return apply_filters("rest_prepare_{$this->post_type}", $response, $post, $request);
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
            $post_data = $this->prepare_item_for_response($post, $request);
            $response = new WP_REST_Response($post_data, 200);
            return apply_filters("rest_prepare_{$this->post_type}", $response, $post, $request);
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
        if (!empty($post)) {
            $post_data = $this->prepare_item_for_response($post, $request);
            $response = new WP_REST_Response($post_data, 200);
            return apply_filters("rest_prepare_{$this->post_type}", $response, $post, $request);
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

    public function parse_payload($payload, $post_id = null)
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
            $data = $this->parse_payload($payload);
            $prepared_post = apply_filters("rest_pre_insert_{$this->post_type}", (object) $data, $request);
        } elseif ($method === 'PUT') {
            $data = $this->parse_payload($payload, $params['id']);
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
        $GLOBALS['post'] = $item;
        setup_postdata($item);
        $post_data = get_object_vars($item);
        $post_data['featured_media'] = get_thumbnail_id($item->ID);

        $taxonomies = wp_list_filter(get_object_taxonomies($this->post_type, 'objects'), ['show_in_rest' => true]);
		foreach ($taxonomies as $taxonomy) {
			$base = !empty($taxonomy->rest_base) ? $taxonomy->rest_base : $taxonomy->name;
			$terms = get_the_terms($item, $taxonomy->name);
			$data[$base] = $terms ? array_values(wp_list_pluck($terms, 'term_id')) : [];
        }

        return $post_data;
    }

    private function insert_item($item, $is_new = true)
    {
        $featured_media = null;
        if (isset($item->featured_media)) {
            $featured_media = $item->featured_media;
            unset($item->featured_media);
        }

        $post_id = wp_insert_post(wp_slash((array) $item));
        if (!$post_id || is_wp_error($post_id)) {
            return null;
        }

        $post = $this->_get_item($post_id);

        if (!empty($featured_media)) {
            if (filter_var($featured_media, FILTER_VALIDATE_URL)) {
                $attachment_id = $this->upload_media($featured_media);
            } elseif ((int) $featured_media === $featured_media) {
                $attachment_id = (int) $featured_media;
            }

            if ($attachment_id) {
                set_post_thumbnail($post->ID, $attachment_id);
            }
        }

        return $post;
    }

    private function add_item($item)
    {
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

    private function upload_media($src)
    {
        if (empty($src)) {
            throw new Exception('NULL remote image resource');
        }

        $filename = basename($src);
        $path = ABSPATH . 'wp-content/uploads';
        $path .= '/' . date('Y');
        if (!is_dir($path)) {
            mkdir($path);
        }
        $path .= '/' . date('m');
        if (!is_dir($path)) {
            mkdir($path);
        }
        $filepath =  $path . '/' . $filename;

        if (file_exists($filepath)) {
            $extension_pos = strrpos($filename, '.'); // find position of the last dot, so where the extension starts
            $filename = substr($filename, 0, $extension_pos) . '_copy' . substr($filename, $extension_pos);
            $filepath = $path . '/' . $filename;
        }

        file_put_contents($path, file_get_contents($src));

        $filetype = wp_check_filetype($filename);
        if (!$filetype['type']) {
            $filetype['type'] = mime_content_type($filepath);
        }

        $attachment = [
            'post_mime_type' => $filetype['type'],
            'post_title' => sanitize_title($filename),
            'post_content' => '',
            'post_status' => 'inherit'
        ];

        $attachment_id = wp_insert_attachment($attachment, $filepath);
        if (is_wp_error($attachment_id)) {
            throw new Exception('Error while uploading media');
        }
        update_post_meta($attachment_id, '_wpct_remote_cpt_img_source', $src);

        require_once(ABSPATH . 'wp-admin/includes/image.php');

        $attach_data = wp_generate_attachment_metadata($attachment_id, $filepath);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return $attachment_id;
    }
}
