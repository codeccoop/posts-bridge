<?php

namespace WPCT_RCPT;

class Model
{
    public static $api_client;
    private $remote_data;
    private $post;

    public static function register($post_types)
    {
        foreach ($post_types as $post_type) {
            register_post_type(
                $post_type,
                [
                    'labels' => [
                        'name' => __($post_type, 'scaffolding'),
                        'singular_name' => __($post_type, 'scaffolding'),
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
    }

    public function __construct($post)
    {
        $this->post = $post;
        if (is_singular($post->post_type)) {
            $this->remote_data = self::$api_client->get_data($this->ID, $post->post_type);
        }
    }

    public function get_data()
    {
        if ($this->remote_data) {
            return $this->remote_data;
        }
        $this->remote_data = self::$api_client->get_data($this->ID, $this->post_type);
        return $this->remote_data;
    }

    public function __get($attr)
    {
        $post_data = $this->post->to_array();
        if (isset($post_data[$attr])) {
            return $post_data[$attr];
        } elseif (isset($this->remote_data) && isset($this->remote_data[$attr])) {
            return $this->remote_data[$attr];
        }

        return null;
    }
}
