<?php

if (!defined('ABSPATH')) {
    exit();
}

return [
    'title' => __('Posts Mirror', 'posts-bridge'),
    'fields' => [
        [
            'ref' => '#bridge',
            'name' => 'remote_type',
            'label' => __('Remote post type', 'posts-bridge'),
            'type' => 'string',
            'required' => true,
            'default' => 'post',
        ],
    ],
    'bridge' => [
        'fields' => [
            [
                'name' => 'post_title',
                'foreign' => 'title.raw',
            ],
            [
                'name' => 'post_name',
                'foreign' => 'slug',
            ],
            [
                'name' => 'post_excerpt',
                'foreign' => 'excerpt.raw',
            ],
            [
                'name' => 'post_content',
                'foreign' => 'content.raw',
            ],
            [
                'name' => 'post_status',
                'foreign' => 'status',
            ],
            [
                'name' => 'featured_media',
                'foreign' => 'featured_media',
            ],
            [
                'name' => 'post_date',
                'foreign' => 'date',
            ],
            [
                'name' => 'categories',
                'foreign' => 'categories',
            ],
            [
                'name' => 'post_tag',
                'foreign' => 'tags',
            ],
        ],
    ],
];
