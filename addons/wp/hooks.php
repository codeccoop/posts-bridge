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
