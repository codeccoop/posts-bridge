<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Settings_Store as Base_Settings_Store;

use function WPCT_ABSTRACT\is_list;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Plugin settings.
 */
class Settings_Store extends Base_Settings_Store
{
    /**
     * Handle REST Settings Controller class name.
     *
     * @var string $rest_controller_class REST Settings Controller class name.
     */
    protected static $rest_controller_class = '\POSTS_BRIDGE\REST_Settings_Controller';

    /**
     * Class constructor. Inherits the parent constructor and setup settings validation
     * callbacks.
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
        add_filter("option_{$slug}_general", static function ($value) {
            $http = \HTTP_BRIDGE\Settings_Store::setting('general');

            $data = [];
            foreach (['backends', 'whitelist'] as $key) {
                $data[$key] = $http->$key;
            }

            return array_merge($value, $data);
        });
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
                                    'twicehourly',
                                    'hourly',
                                    'twicedaily',
                                    'daily',
                                    'weekly',
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    'debug' => false,
                    'synchronize' => [
                        'enabled' => false,
                        'recurrence' => 'hourly',
                    ],
                ],
            ],
            [
                'rest-api',
                [
                    'relations' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => false,
                            'properties' => [
                                'post_type' => ['type' => 'string'],
                                'endpoint' => ['type' => 'string'],
                                'foreign_key' => ['type' => 'string'],
                                'backend' => ['type' => 'string'],
                                'fields' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'additionalProperties' => false,
                                        'properties' => [
                                            'name' => ['type' => 'string'],
                                            'foreign' => ['type' => 'string'],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    'relations' => [],
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
        $name = $setting->name();
        switch ($name) {
            case 'general':
                $data = self::validate_general($data);
                break;
            case 'rest-api':
                $data = self::validate_api($data);
                break;
        }

        return $data;
    }

    /**
     * Apply updates on APIs settings on general setting updates.
     *
     * @param array $data General setting data.
     *
     * @return array General setting data.
     */
    private static function validate_general($data)
    {
        $data['synchronize'] = [
            'enabled' => $data['synchronize']['enabled'] ?? false,
            'recurrence' => $data['synchronize']['recurrence'] ?? 'hourly',
        ];

        $http_settings = [
            'whitelist' => boolval($data['whitelist'] ?? false),
            'backends' => \HTTP_BRIDGE\Settings_Store::validate_backends(
                isset($data['backends']) && is_array($data['backends'])
                    ? $data['backends']
                    : []
            ),
        ];

        $http = \HTTP_BRIDGE\Settings_Store::setting('general');
        $http->update(array_merge($http->data(), $http_settings));

        foreach (array_keys($http_settings) as $field) {
            unset($data[$field]);
        }

        return $data;
    }

    /*+
     * Apply settings' data validations before db updates.
     *
     * @param array $data Setting data.
     *
     * @return array Validated setting data.
     */
    private static function validate_api($data)
    {
        $backends = Posts_Bridge::setting('general')->backends;

        $data['relations'] = self::validate_relations(
            $data['relations'],
            $backends
        );

        return $data;
    }

    /**
     * Validate remote relations settings.
     *
     * @param array $relations List of API remote relations data.
     * @param array $backends List of available backends data.
     *
     * @return array List of valid API remote relations.
     */
    protected static function validate_relations($relations, $backends)
    {
        if (!is_list($relations)) {
            return [];
        }

        $post_types = get_post_types();

        $valid_relations = [];
        for ($i = 0; $i < count($relations); $i++) {
            $rel = $relations[$i];

            // Valid only if backend and post type exists
            $is_valid =
                array_reduce(
                    $backends,
                    function ($is_valid, $backend) use ($rel) {
                        return $rel['backend'] === $backend['name'] ||
                            $is_valid;
                    },
                    false
                ) && in_array($rel['post_type'], $post_types);

            if ($is_valid) {
                // filter empty fields
                $rel['fields'] = array_values(
                    array_filter((array) $rel['fields'], static function (
                        $field
                    ) {
                        return $field['foreign'] && $field['name'];
                    })
                );

                $valid_relations[] = $rel;
            }
        }

        $uniques = [];
        foreach ($valid_relations as $rel) {
            if (in_array($rel['post_type'], $post_types, true)) {
                $uniques[] = $rel;
                $index = array_search($rel['post_type'], $post_types);
                unset($post_types[$index]);
            }
        }

        return $uniques;
    }
}
