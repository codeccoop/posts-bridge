<?php

if (!defined('ABSPATH')) {
    exit();
}

return [
    'title' => __('Knowledge Pages', 'posts-bridge'),
    'fields' => [
        [
            'ref' => '#bridge',
            'name' => 'endpoint',
            'value' => 'document.page',
        ],
    ],
    'bridge' => [
        'endpoint' => 'document.page',
        'mappers' => [
            [
                'name' => 'post_title',
                'foreign' => 'name',
            ],
            [
                'name' => 'post_date',
                'foreign' => 'content_date',
            ],
            [
                'name' => 'post_content',
                'foreign' => 'content',
            ],
            [
                'name' => 'post_category',
                'foreign' => 'parent_id[1]',
            ],
        ],
    ],
];
