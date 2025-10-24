<?php

if (!defined('ABSPATH')) {
    exit();
}

return [
    'title' => __('Job Offers', 'posts-bridge'),
    'fields' => [
        [
            'ref' => '#bridge',
            'name' => 'endpoint',
            'value' => 'hr.job',
        ],
    ],
    'bridge' => [
        'endpoint' => 'hr.job',
        'tax_mappers' => [
            [
                'name' => 'post_category',
                'foreign' => 'contract_type_id[1]',
            ],
        ],
        'field_mappers' => [
            [
                'name' => 'post_content',
                'foreign' => 'description',
            ],
            [
                'name' => 'post_title',
                'foreign' => 'display_name',
            ],
            [
                'name' => 'post_name',
                'foreign' => 'name',
            ],
            [
                'name' => 'post_date',
                'foreign' => 'create_date',
            ],
            [
                'name' => 'no_of_recruitment',
                'foreign' => 'no_of_recruitment',
            ],
            [
                'name' => 'email_to',
                'foreign' => 'alias_email',
            ],
        ],
    ],
];
