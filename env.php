<?php

if (!defined('WPCT_REMOTE_CPT_POST_TYPE')) {
    define('WPCT_REMOTE_CPT_POST_TYPE', 'remote-cpt');
}

define('WPCT_REMOTE_CPT_ENDPOINT', '/api/private/posts');

define('WPCT_REMOTE_CPT_META', [
    'ref_code' => [
        'type' => 'string',
        'description' => 'ERP Internal code',
        'single' => true,
        // 'sanitize_callback' => 'sanitize_meta',
        'show_in_rest' => true
    ],
    'price' => [
        'type' => 'number',
        'description' => 'Net price + taxes',
        'single' => true,
        // 'sanitize_callback' => 'sanitize_meta',
        'show_in_rest' => true
    ],
    'colors' => [
        'type' => 'array',
        'description' => 'Available colors',
        'single' => true,
        // 'sanitize_callback' => 'sanitize_meta',
        'show_in_rest' => [
            'schema' => [
                'type' => 'array',
                'items' => [
                    'type' => 'string'
                ]
            ]
        ]
    ]
]);
