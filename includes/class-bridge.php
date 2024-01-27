<?php

namespace WPCT_REMOTE_CPT;

class Bridge
{
    private $base_url;
    private $post_type;

    public function __construct($base_url, $post_type)
    {
        $this->base_url = $base_url;
        $this->post_type = $post_type;

        add_action('rest_insert_' . $post_type, [$this, 'on_insert_post'], 10, 3);
    }

    public function get_data($post_id, $locale = null)
    {
        $endpoint = $this->get_endpoint($post_id);

        if ($locale) {
            add_option('wpct_remote_cpt_api_language', $locale);
            add_filter('wpct_st_current_language', [$this, 'language_interceptor'], 99, 2);
        }

        if ($this->post_type === 'development') {
            $file = fopen($endpoint, 'r');
            $data = json_decode(fread($file, filesize($endpoint)), true);
            fclose($file);
        } else {
            $response = wpct_oc_get_odoo($endpoint);
            if (!$response || $response['response']['code'] !== 200) {
                throw new Exception('Unable to connect to Odoo', 500);
            }
            $data = json_decode($response['body'], true);
        }

        return $data;
    }

    private function on_insert_post($post, $request, $is_new)
    {
        $payload = $request->get_json_params();

        if (isset($payload['thumbnail'])) {
            $img_info = $payload['thumbnail'];
            $attachment_id = $this->store_external_image($img_info, $post->ID, $is_new);
            set_post_thumbnail($post->ID, $attachment_id);
        }
    }

    private function store_external_image($img_info, $post_id, $is_new)
    {
        if (!$img_info) throw new Exception('NULL remote image resource');

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

    private function get_endpoint($post_id)
    {
        if (WPCT_REMOTE_CPT_ENV === 'development') {
            return apply_filters('wpct_remote_cpt_data_file', dirname(dirname(__FILE__)) . "/{$post_id}.json", $post_id);
        } else {
            return apply_filters('wpct_remote_cpt_endpoint', $this->base_url . '/' . $post_id, $post_id);
        }
    }


    private function language_interceptor($language, $format = null)
    {
        $api_language = get_option('wpct_remote_cpt_api_language');
        if ($api_language) $language = $api_language;

        remove_filter('wpct_st_current_language', [$this, 'language_interceptor'], 99, 2);
        delete_option('wpct_remote_cpt_api_locale');

        return $language;
    }
}
