<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Settings_Store as Base_Settings_Store;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Plugin settings.
 */
class Settings_Store extends Base_Settings_Store
{
    /**
     * Handles the plugin's settings rest controller class name.
     *
     * @var string REST Settings Controller class name.
     */
    protected static $rest_controller_class = '\POSTS_BRIDGE\REST_Settings_Controller';

    /**
     * Inherits the parent constructor and sets up setting validation callbacks.
     */
    protected function construct(...$args)
    {
        parent::construct(...$args);

        $slug = Posts_Bridge::slug();

        // Patch http bridge default settings to plugin settings
        add_filter(
            'wpct_setting_default',
            static function ($default, $name) use ($slug) {
                if ($name !== $slug . '_general') {
                    return $default;
                }

                $http = \HTTP_BRIDGE\Settings_Store::setting('general');

                $data = [];
                foreach (['backends', 'whitelist'] as $key) {
                    $data[$key] = $http->$key;
                }

                return array_merge($default, $data);
            },
            10,
            2
        );

        // Patch http bridge settings to plugin settings
        add_filter(
            "option_{$slug}_general",
            static function ($value) {
                if (!is_array($value)) {
                    return $value;
                }

                $http = \HTTP_BRIDGE\Settings_Store::setting('general');

                $data = [];
                foreach (['backends', 'whitelist'] as $key) {
                    $data[$key] = $http->$key;
                }

                return array_merge($value, $data);
            },
            10,
            1
        );
    }

    /**
     * Plugin's settings configuration.
     */
    public static function config()
    {
        return [
            [
                'general',
                [
                    'synchronize' => [
                        'type' => 'object',
                        'additionalProperties' => false,
                        'properties' => [
                            'enabled' => ['type' => 'boolean'],
                            'recurrence' => [
                                'type' => 'string',
                                'enum' => [
                                    'minutly',
                                    'quarterly',
                                    'twicehourly',
                                    'hourly',
                                    'twicedaily',
                                    'daily',
                                    'weekly',
                                ],
                            ],
                        ],
                        'required' => ['enabled', 'recurrence'],
                    ],
                ],
                [
                    'synchronize' => [
                        'enabled' => false,
                        'recurrence' => 'hourly',
                    ],
                ],
            ],
        ];
    }

    /**
     * Validates setting data before database inserts.
     *
     * @param array $data Setting data.
     * @param Setting $setting Setting instance.
     *
     * @return array $value Validated setting data.
     */
    protected static function validate_setting($data, $setting)
    {
        if ($setting->name() !== 'general') {
            return $data;
        }

        $http_settings = [
            'whitelist' => boolval($data['whitelist'] ?? false),
            'backends' => \HTTP_BRIDGE\Settings_Store::validate_backends(
                $data['backends'] ?? []
            ),
        ];

        $http = \HTTP_BRIDGE\Settings_Store::setting('general');
        $http->update(array_merge($http->data(), $http_settings));

        foreach (array_keys($http_settings) as $field) {
            unset($data[$field]);
        }

        return $data;
    }
}
