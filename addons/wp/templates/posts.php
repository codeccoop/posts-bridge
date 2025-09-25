<?php

if (!defined('ABSPATH')) {
    exit();
}

return [
    'title' => __('Posts', 'posts-bridge'),
    'fields' => [
        [
            'ref' => '#bridge',
            'name' => 'endpoint',
            'value' => '/wp-json/wp/v2/posts',
        ],
        [
            'ref' => '#bridge',
            'name' => 'post_type',
            'default' => 'post',
        ],
    ],
    'bridge' => [
        'endpoint' => '/wp-json/wp/v2/posts',
        'mappers' => [
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
                'name' => 'post_date',
                'foreign' => 'date',
            ],
            [
                'name' => 'featured_media',
                'foreign' => 'featured_media',
            ],
            [
                'name' => 'post_category',
                'foreign' => 'categories',
            ],
            [
                'name' => 'tags_input',
                'foreign' => 'tags',
            ],
            [
                'name' => 'post_status',
                'foreign' => 'status',
            ],
        ],
    ],
];
