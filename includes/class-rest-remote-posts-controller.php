<?php

namespace POSTS_BRIDGE;

use WP_REST_Posts_Controller;
use WP_REST_Post_Meta_Fields;
use Exception;

/**
 * REST API Controller for remote posts.
 */
class REST_Remote_Posts_Controller extends WP_REST_Posts_Controller
{
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
        $this->rest_base = 'posts/' . $post_type;
        $this->meta = new WP_REST_Post_Meta_Fields($this->post_type);
        $this->register_routes();

        add_filter("rest_pre_insert_{$post_type}", function ($prepared_post, $request) {
            $this->filter_prepared_post($prepared_post, $request);
        }, 10, 2);

        add_action("rest_insert_{$post_type}", function ($post, $request, $is_new) {
            $this->on_rest_insert($post, $request, $is_new);
        }, 10, 3);
    }

    /**
     * Updates the prepared post mapping to it the relation remote fields.
     *
     * @param object $prepared_post Prepared post data before inserts.
     * @param WP_REST_Request $request Current request.
     *
     * @return object Prepared post data with mapped remote fields.
     */
    private function filter_prepared_post($prepared_post, $request)
    {
        $relation = apply_filters('posts_bridge_relation', null, $this->post_type);
        $prepared_post = $relation->map_remote_fields((array) $prepared_post);
        return (object) $prepared_post;
    }

    /**
     * Updates post custom fields after REST API inserts based on relation custom fields.
     *
     * @param WP_Post $post Writed post.
     * @param WP_REST_Request $request Current request.
     * @param boolean $is_new True if is a newly created post.
     */
    private function on_rest_insert($post, $request, $is_new)
    {
        $relation = apply_filters('posts_bridge_relation', null, $this->post_type);
        foreach ($relation->get_remote_custom_fields() as $foreign => $name) {
            if (isset($request[$foreign])) {
                update_post_meta($post->ID, $name, $request[$foreign]);
            }
        }
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
        if (!empty($featured_media)) {
            if (filter_var($featured_media, FILTER_VALIDATE_URL)) {
                $featured_media = $this->download_media($featured_media);
            } elseif ((int) $featured_media == $featured_media) {
                $featured_media = (int) $featured_media;
            } else {
                $featured_media = (int) get_option('posts_bridge_thumbnail');
            }
        }

        parent::handle_featured_media($featured_media, $post_id);
    }

    /**
     * Downloads media from URL and store it as a WP_Attachment.
     *
     * @param string $src Media URL source.
     * @return int $attachment_id ID of the created attachment.
     */
    private function download_media($src)
    {
        if (empty($src)) {
            return (int) get_option('posts_bridge_thumbnail');
        }

        $filename = basename($src);

        $upload_dir = wp_upload_dir();
        if (wp_mkdir_p($upload_dir['path'])) {
            $filepath = $upload_dir['path'] . '/' . $filename;
        } else {
            $filepath = $upload_dir['basedir'] . '/' . $filename;
        }

        if (file_exists($filepath)) {
            $ext = pathinfo($filepath)['extension'];
            $filepath = dirname($filepath) . '/' . time() . '.' . $ext;
        }

        file_put_contents($filepath, file_get_contents($src));

        $filetype = wp_check_filetype($filename, null);
        if (!$filetype['type']) {
            $filetype['type'] = mime_content_type($filepath);
        }

        $attachment_id = wp_insert_attachment([
            'post_mime_type' => $filetype['type'],
            'post_title' => sanitize_title($filename),
            'post_content' => '',
            'post_status' => 'inherit',
        ], $filepath);

        if (is_wp_error($attachment_id)) {
            throw new Exception('Error while uploading media');
        }

        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attachment_id, $filepath);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return $attachment_id;
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
