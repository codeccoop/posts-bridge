<?php

if (!defined('ABSPATH')) {
    exit();
}

add_filter(
    'posts_bridge_bridge_schema',
    function ($schema, $addon) {
        if ($addon !== 'dolibarr') {
            return $schema;
        }

        $schema['properties']['endpoint']['default'] = '/api/index.php/users';
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
        if ($addon !== 'dolibarr') {
            return $defaults;
        }

        return wpct_plugin_merge_object(
            [
                'fields' => [
                    [
                        'ref' => '#backend',
                        'name' => 'name',
                        'default' => 'Dolibarr',
                    ],
                    [
                        'ref' => '#backend/headers[]',
                        'name' => 'DOLAPIKEY',
                        'label' => __('API key', 'forms-bridge'),
                        'type' => 'text',
                        'required' => true,
                    ],
                    [
                        'ref' => '#bridge',
                        'name' => 'method',
                        'value' => 'GET',
                    ],
                    [
                        'ref' => '#bridge',
                        'name' => 'foreign_key',
                        'value' => 'id',
                    ],
                ],
                'backend' => [
                    'name' => 'Dolibarr',
                    'headers' => [
                        [
                            'name' => 'Accept',
                            'value' => 'application/json',
                        ],
                    ],
                ],
            ],
            $defaults,
            $schema
        );
    },
    10,
    3
);
