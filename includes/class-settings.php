<?php

namespace WPCT_RCPT;

use WPCT_ABSTRACT\Settings as BaseSettings;

class Settings extends BaseSettings
{
    public function register()
    {
        $host = parse_url(get_bloginfo('url'))['host'];
        $this->register_setting(
            'general',
            [
                'base_url' => [
                    'type' => 'string',
                ],
                'api_key' => [
                    'type' => 'string',
                ],
                'post_types' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'string',
                    ]
                ]
            ],
            [
                'base_url' => 'https://erp.' . $host,
                'api_key' => '',
                'post_types' => ['remote-cpt'],
            ],
        );
    }
}
