<?php

namespace WPCT_REMOTE_CPT;

class Model
{
    public static $bridge;
    private $remote_data;
    private $post;

    public static function init($post_type)
    {
        register_post_type(
            $post_type,
            [
                'labels' => [
                    'name' => __('Remote CPTs', 'wpct-remote-cpt'),
                    'singular_name' => __('Remote CPT', 'wpct-remote-cpt'),
                ],

                // Frontend
                'has_archive' => true,
                'public' => true,
                'publicly_queryable' => true,

                // Admin
                'capability_type' => 'post',
                'menu_icon' => 'dashicons-admin-home',
                'menu_position' => 28,
                'query_var' => true,
                'show_in_menu' => true,
                'show_ui' => true,
                'show_in_rest' => true,
                'supports' => [
                    'title',
                    'thumbnail',
                    'excerpt',
                    'custom-fields',
                    'editor',
                ],
                'rewrite' => ['slug' => 'remote'],
                'taxonomies' => []
            ]
        );

        register_post_meta(
            $post_type,
            'remote_id',
            [
                'type' => 'string',
                'description' => 'Remote backend ID',
                'single' => true,
                'show_in_rest' => true
            ]
        );
    }

    public function __construct($post)
    {
        $this->post = $post;
        if (is_singular($post->post_type)) {
            $this->remote_data = self::$bridge->get_data($this->post->ID);
        }
    }

    public function get_data()
    {
        if ($this->remote_data) return $this->remote_data;
        $this->remote_data = self::$bridge->get_data($this->post->ID);
        return $this->remote_data;
    }
}
