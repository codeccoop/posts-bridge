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
                'enabled' => false,
                'recurrence' => 'hourly',
            ],
        ]);

        self::ready(function ($store) {
            $store::use_getter('general', function ($data) {
                $http = Http_Store::setting('general');
                foreach (['backends', 'whitelist'] as $key) {
                    $data[$key] = $http->$key;
                }

                return $data;
            });

            $store::use_setter(
                'general',
                function ($data) {
                    $http = Http_Store::setting('general');
                    foreach (['backends', 'whitelist'] as $key) {
                        if (!isset($data[$key])) {
                            continue;
                        }

                        $http->$key = $data[$key];
                        unset($data[$key]);
                    }

                    return $data;
                },
                9
            );
        });
    }
}
