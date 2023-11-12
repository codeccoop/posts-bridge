<?php

add_action('init', 'wpct_remote_cpt_register_post_type', 10);
function wpct_remote_cpt_register_post_type()
{
    register_post_type(
        WPCT_REMOTE_CPT_POST_TYPE,
        [
            'labels' => [
                'name' => __('Remote CPTs'),
                'singular_name' => __('Remote CPT')
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
                'custom-fields'
            ],
            // 'rewrite' => ['slug' => 'landing'],
            'taxonomies' => []
        ]
    );

    $custom_fields = array_keys(WPCT_REMOTE_CPT_META);
    foreach ($custom_fields as $field) {
        register_post_meta(
            WPCT_REMOTE_CPT_POST_TYPE,
            $field,
            WPCT_REMOTE_CPT_META[$field]
        );
    }
}
