<?php

namespace WPCT_RCPT;

use WP_REST_Posts_Controller;
use WP_REST_Post_Meta_Fields;
use Exception;

class REST_Controller extends WP_REST_Posts_Controller
{
    protected $post_type;
    protected $meta;
    protected $rest_base;
    protected $namespace;

    public function __construct($post_type)
    {
        $this->post_type = $post_type;
        $this->rest_base = $post_type;
        $this->namespace = 'wpct-remote/v1';
        $this->meta = new WP_REST_Post_Meta_Fields($this->post_type);
    }

    protected function handle_featured_media($featured_media, $post_id)
    {
        if (!empty($featured_media)) {
            if (filter_var($featured_media, FILTER_VALIDATE_URL)) {
                $featured_media = $this->upload_media($featured_media);
            } elseif ((int) $featured_media === $featured_media) {
                $featured_media = (int) $featured_media;
            }
        }

        parent::handle_featured_media($featured_media, $post_id);
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
