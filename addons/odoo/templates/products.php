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
            'value' => 'product.variant',
        ],
    ],
    'bridge' => [
        'endpoint' => 'product.variant',
        'mappers' => [
            [
                'name' => 'post_title',
                'foreign' => 'display_name',
            ],
            [
                'name' => 'post_date',
                'foreign' => 'create_date',
            ],
            [
                'name' => 'post_category',
                'foreign' => 'categ_id[1]',
            ],
            [
                'name' => 'currency',
                'foreign' => 'currency_id[1]',
            ],
            [
                'name' => 'price',
                'foreign' => 'price',
            ],
        ],
    ],
];
