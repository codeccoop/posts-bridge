<?php

namespace POSTS_BRIDGE;

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
                'cron' => [
                    'type' => 'object',
                    'properties' => [
                        'enabled' => ['type' => 'boolean'],
                        'recurrence' => ['type' => 'string'],
                        'next_run' => ['type' => 'string'],
                    ],
                ],
            ],
            [
                'base_url' => 'https://erp.' . $host,
                'api_key' => '',
                'cron' => [
                    'enabled' => false,
                    'recurrence' => '',
                    'time' => '',
                ],
            ],
        );

        $this->register_setting(
            'rest-api',
            [
                'relations' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'post_type' => ['type' => 'string'],
                            'endpoint' => ['type' => 'string'],
                            'field' => ['type' => 'string'],
                        ],
                    ],
                ],
            ],
            [
                'relations' => [
                    [
                        'post_type' => 'remote-cpt',
                        'endpoint' => '/remote-cpt',
                        'field' => 'id',
                    ],
                ],
            ],
        );

        $this->register_setting(
            'rpc-api',
            [
                'endpoint' => [
                    'type' => 'string',
                ],
                'user' => [
                    'type' => 'string',
                ],
                'password' => [
                    'type' => 'string',
                ],
                'database' => [
                    'type' => 'string',
                ],
                'relations' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'post_type' => ['type' => 'string'],
                            'model' => ['type' => 'string'],
                        ],
                    ],
                ],
            ],
            [
                'endpoint' => '/jsonrpc',
                'user' => 'admin',
                'password' => 'admin',
                'database' => 'erp',
                'relations' => [
                    [
                        'post_type' => 'remote-cpt',
                        'model' => 'remote-model',
                    ],
                ],
            ],
        );
    }

    protected function input_render($setting, $field, $value)
    {
        if (preg_match('/password$/', $field)) {
            return $this->password_input_render($setting, $field, $value);
        } elseif (preg_match('/recurrence$/', $field)) {
            return $this->recurrence_input_render($setting, $field, $value);
        } elseif (preg_match('/next_run$/', $field)) {
            return $this->time_input_render($setting, $field, $value);
        }

        return parent::input_render($setting, $field, $value);
    }

    private function password_input_render($setting, $field, $value)
    {
        $setting_name = $this->setting_name($setting);
        return "<input type='password' name='{$setting_name}[{$field}]' value='{$value}' />";
    }

    private function recurrence_input_render($setting, $field, $value)
    {
        $options = [
            'hourly' => __('Hourly', 'posts-bridge'),
            'twicedaily' => __('Twice Daily', 'posts-bridge'),
            'daily' => __('Daily', 'posts-bridge'),
            'weekly' => __('Weekly', 'posts-bridge'),
        ];

        if (!isset($options[$value])) {
            $value = '';
        }

        $setting_name = $this->setting_name($setting);
        $input = "<select name='{$setting_name}[{$field}]'>";
        foreach ($options as $opt => $label) {
            $input .= "<option value='{$opt}'" . ($opt === $value ? ' selected' : '') . ">{$label}</option>";
        }

        $input .= '</select>';
        return $input;
    }

    private function time_input_render($setting, $field, $value)
    {
        $setting_name = $this->setting_name($setting);
        return "<input type='time' name='{$setting_name}[{$field}]' value='{$value}' />";
    }
}
