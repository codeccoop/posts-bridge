<?php

if (!defined('ABSPATH')) {
    exit();
}

return [
    'title' => __('Sample', 'posts-bridge'),
    'fielfs' => [],
    'bridge' => [
        'tax_mappers' => [
            [
                'name' => 'tags_input',
                'foreign' => 'tags',
            ],
        ],
        'field_mappers' => [
            [
                'name' => 'post_title',
                'foreign' => 'title',
            ],
            [
                'name' => 'post_excerpt',
                'foreign' => 'excerpt',
            ],
            [
                'name' => 'post_content',
                'foreign' => 'content',
            ],
        ],
    ],
];
