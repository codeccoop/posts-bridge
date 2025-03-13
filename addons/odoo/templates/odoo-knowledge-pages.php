<?php

if (!defined('ABSPATH')) {
    exit();
}

add_filter(
    'posts_bridge_remote_data',
    function ($data, $rcpt) {
        if (
            $rcpt->bridge->template === 'odoo-knowledge-pages' &&
            isset($data['content'])
        ) {
            $data['content'] = preg_replace('/\\n+/', '', $data['content']);
        }

        return $data;
    },
    10,
    2
);

return [
    'title' => __('Odoo Knowledge Pages', 'posts-bridge'),
    'fields' => [
        [
            'ref' => '#post_type',
            'name' => 'name',
            'label' => 'post_type',
            'type' => 'string',
            'required' => true,
            'default' => 'odoo-knowledge',
        ],
        [
            'ref' => '#post_type',
            'name' => 'label',
            'label' => 'label',
            'type' => 'string',
            'default' => 'Knowledge',
        ],
        [
            'ref' => '#post_type',
            'name' => 'singular_label',
            'label' => 'singular_label',
            'type' => 'string',
            'default' => 'Knowledge',
        ],
        [
            'ref' => '#post_type',
            'name' => 'taxonomies',
            'label' => 'taxonomies',
            'type' => 'string',
            'default' => 'category',
        ],
        [
            'ref' => '#post_type',
            'name' => 'rewrite',
            'label' => 'rewrite',
            'type' => 'string',
            'default' => 'knowledge',
        ],
        [
            'ref' => '#post_type',
            'name' => 'rest_base',
            'label' => 'rest_base',
            'type' => 'string',
            'default' => 'knowledge',
        ],
        [
            'ref' => '#post_type',
            'name' => 'query_var',
            'label' => 'query_var',
            'type' => 'string',
            'default' => 'knowledge',
        ],
        [
            'ref' => '#post_type',
            'name' => 'has_archive',
            'label' => 'has_archive',
            'type' => 'boolean',
            'default' => true,
        ],
    ],
    'bridge' => [
        'model' => 'document.page',
        'fields' => [
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
