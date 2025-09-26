<?php

if (!defined('ABSPATH')) {
    exit();
}

return [
    'title' => __('Products', 'posts-bridge'),
    'fields' => [
        [
            'ref' => '#bridge',
            'name' => 'endpoint',
            'value' => '/api/index.php/products',
        ],
    ],
    'bridge' => [
        'endpoint' => '/api/index.php/products',
        'mappers' => [
            [
                'name' => 'post_title',
                'foreign' => 'label',
            ],
            [
                'name' => 'post_content',
                'foreign' => 'description',
            ],
            [
                'name' => 'post_date',
                'foreign' => 'date_creation',
            ],
            [
                'name' => 'price',
                'foreign' => 'price',
            ],
            [
                'name' => 'tva_tx',
                'foreign' => 'tva_tx',
            ],
        ],
    ],
];
