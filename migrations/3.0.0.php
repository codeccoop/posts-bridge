<?php

$setting_names = ['rest-api', 'odoo', 'wp', 'google-sheets'];

foreach ($setting_names as $setting_name) {
    $option = 'posts-bridge_' . $setting_name;
    $deprecated_option = $option . '-api';

    $data = get_option($deprecated_option);
    if (is_array($data)) {
        update_option($option, $data);
        delete_option($deprecated_option);
    }

    $data = get_option($option, []);

    if (isset($data['relations'])) {
        $data['bridges'] = $data['relations'];
        unset($data['relations']);
        update_option($option, $data);
    }
}

// wp rest setting rename
$wp = get_option('posts-bridge_wp');
if (is_array($wp)) {
    add_option('posts-bridge_wp-rest', $wp);
    delete_option('posts-bridge_wp');
}
