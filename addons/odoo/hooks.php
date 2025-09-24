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
        ];

        $schema['properties']['method']['const'] = 'read';

        return $schema;
    },
    10,
    2
);
