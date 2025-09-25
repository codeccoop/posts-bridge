<?php

if (!defined('ABSPATH')) {
    exit();
}

add_filter(
    'posts_bridge_bridge_schema',
    function ($schema, $addon) {
        if ($addon !== 'wp') {
            return $schema;
        }

        $schema['properties']['endpoint']['default'] = '/wp-json/wp/v2/posts';
        $schema['properties']['foreign_key']['const'] = 'id';
        $schema['properties']['method']['const'] = 'GET';

        return $schema;
    },
    10,
    2
);

add_filter(
    'posts_bridge_template_defaults',
    function ($defaults, $addon, $schema) {
        if ($addon !== 'wp') {
            return $defaults;
        }

        return wpct_plugin_merge_object(
            [
                'fields' => [
                    [
                        'ref' => '#credential',
                        'name' => 'name',
                        'label' => __('Name', 'posts-bridge'),
                        'type' => 'text',
                        'required' => true,
                    ],
                    [
                        'ref' => '#credential',
                        'name' => 'schema',
                        'type' => 'text',
                        'value' => 'Basic',
                    ],
                    [
                        'ref' => '#credential',
                        'name' => 'client_id',
                        'label' => __('User login', 'posts-bridge'),
                        'description' => __(
                            'User name or email',
                            'posts-bridge'
                        ),
                        'type' => 'text',
                        'required' => true,
                    ],
                    [
                        'ref' => '#credential',
                        'name' => 'client_secret',
                        'description' => __(
                            'Application password',
                            'posts-bridge'
                        ),
                        'label' => __('Password', 'posts-bridge'),
                        'type' => 'text',
                        'required' => true,
                    ],
                    [
                        'ref' => '#backend',
                        'name' => 'name',
                        'default' => 'WP',
                    ],
                    [
                        'ref' => '#bridge',
                        'name' => 'foreign_key',
                        'value' => 'id',
                    ],
                    [
                        'ref' => '#bridge',
                        'name' => 'method',
                        'label' => __('Method', 'posts-bridge'),
                        'type' => 'text',
                        'value' => 'GET',
                    ],
                ],
                'bridge' => [
                    'foreign_key' => 'id',
                    'backend' => 'WP',
                    'endpoint' => '',
                    'method' => 'GET',
                ],
                'backend' => [
                    'name' => 'WP',
                    'headers' => [
                        [
                            'name' => 'Accept',
                            'value' => 'application/json',
                        ],
                    ],
                ],
                'credential' => [
                    'name' => '',
                    'schema' => 'Basic',
                    'client_id' => '',
                    'client_secret' => '',
                ],
            ],
            $defaults,
            $schema
        );
    },
    10,
    3
);
