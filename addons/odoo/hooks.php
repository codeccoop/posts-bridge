<?php

if (!defined('ABSPATH')) {
    exit();
}

add_filter(
    'posts_bridge_bridge_schema',
    function ($schema, $addon) {
        if ($addon !== 'odoo') {
            return $schema;
        }

        $schema['properties']['endpoint']['title'] = __(
            'Model',
            'posts-bridge'
        );
        $schema['properties']['endpoint']['default'] = 'res.partner';

        $schema['properties']['foreign_key']['const'] = 'id';

        $schema['properties']['method']['enum'] = [
            'search',
            'read',
            'search_read',
            'fields_get',
        ];

        $schema['properties']['method']['const'] = 'read';

        return $schema;
    },
    10,
    2
);

add_filter(
    'posts_bridge_template_defaults',
    function ($defaults, $addon, $schema) {
        if ($addon !== 'odoo') {
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
                        'value' => 'RPC',
                    ],
                    [
                        'ref' => '#credential',
                        'name' => 'database',
                        'label' => __('Database', 'posts-bridge'),
                        'description' => __(
                            'Name of the database',
                            'posts-bridge'
                        ),
                        'type' => 'text',
                        'required' => true,
                    ],
                    [
                        'ref' => '#credential',
                        'name' => 'client_id',
                        'label' => __('User', 'posts-bridge'),
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
                        'description' => __('User password', 'posts-bridge'),
                        'label' => __('Password', 'posts-bridge'),
                        'type' => 'text',
                        'required' => true,
                    ],
                    [
                        'ref' => '#backend',
                        'name' => 'name',
                        'default' => 'Odoo',
                    ],
                    [
                        'ref' => '#bridge',
                        'name' => 'foreign_key',
                        'value' => 'id',
                    ],
                    [
                        'ref' => '#bridge',
                        'name' => 'endpoint',
                        'label' => __('Model', 'posts-bridge'),
                        'type' => 'text',
                        'required' => true,
                    ],
                    [
                        'ref' => '#bridge',
                        'name' => 'method',
                        'label' => __('Method', 'posts-bridge'),
                        'type' => 'text',
                        'value' => 'read',
                    ],
                ],
                'bridge' => [
                    'foreign_key' => 'id',
                    'backend' => 'Odoo',
                    'endpoint' => '',
                    'method' => 'read',
                ],
                'backend' => [
                    'name' => 'Odoo',
                    'headers' => [
                        [
                            'name' => 'Accept',
                            'value' => 'application/json',
                        ],
                    ],
                ],
                'credential' => [
                    'name' => '',
                    'schema' => 'RPC',
                    'client_id' => '',
                    'client_secret' => '',
                    'database' => '',
                ],
            ],
            $defaults,
            $schema
        );
    },
    10,
    3
);
