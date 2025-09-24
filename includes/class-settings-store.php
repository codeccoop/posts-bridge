<?php

namespace POSTS_BRIDGE;

use WPCT_PLUGIN\Settings_Store as Base_Settings_Store;
use HTTP_BRIDGE\Settings_Store as Http_Store;

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
    protected const rest_controller_class = '\POSTS_BRIDGE\REST_Settings_Controller';

    /**
     * Inherits the parent constructor and sets up setting validation callbacks.
     */
    protected function construct(...$args)
    {
        parent::construct(...$args);

        self::register_setting([
            'name' => 'general',
            'properties' => [
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
            'required' => ['synchronize'],
            'default' => [
                'synchronize' => [
                    'enabled' => false,
                    'recurrence' => 'hourly',
                ],
            ],
        ]);

        self::register_setting([
            'name' => 'http',
            'properties' => [],
            'default' => [],
        ]);

        self::ready(function ($store) {
            $store::use_getter('http', static function () {
                $setting = Http_Store::setting('general');
                return $setting->data();
            });

            $store::use_setter(
                'http',
                function ($data) {
                    if (
                        isset($data['backends']) &&
                        isset($data['credentials'])
                    ) {
                        $setting = Http_Store::setting('general');
                        $setting->update($data);
                    }

                    return [];
                },
                9
            );

            $store::use_cleaner('general', static function () {
                $setting = Http_Store::setting('general');
                $setting->update(['backends' => [], 'credentials' => []]);
            });
        });
    }
}
