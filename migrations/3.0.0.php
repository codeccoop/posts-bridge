<?php

$setting_names = ['rest-api', 'odoo', 'wp', 'google-sheets'];

foreach ($setting_names as $setting_name) {
    $option = 'forms-bridge_' . $setting_name;
    $deprecated_opton = $option . '-api';

    $data = get_option($deprecated_name);
    if (is_array($data)) {
        update_option($option, $data);
        delete_option($deprecated_opton);
    }

    $data = get_option($option, []);

    if (isset($data['relations'])) {
        $data['bridges'] = $data['relations'];
        unset($data['relations']);
        update_option($option, $data);
    }
}
