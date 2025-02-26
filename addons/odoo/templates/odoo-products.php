<?php

if (!defined('ABSPATH')) {
    exit();
}

return [
    'title' => __('Odoo Products', 'posts-bridge'),
    'fields' => [
        [
            'ref' => '#post_type',
            'name' => 'name',
            'label' => __('Post type', 'posts-bridge'),
            'type' => 'string',
            'required' => true,
            'default' => 'odoo-product',
        ],
    ],
    'bridge' => [
        'model' => 'product',
        'fields' => [
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
