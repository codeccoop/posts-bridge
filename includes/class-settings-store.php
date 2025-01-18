<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\SettingsStore as BaseSettingsStore;

use function WPCT_ABSTRACT\is_list;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Plugin settings.
 */
class Settings extends BaseSettingsStore
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

        add_filter(
            'wpct_validate_setting',
            static function ($data, $setting) {
                return self::validate_setting($data, $setting);
            },
            10,
            2
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
                    'debug' => ['type' => 'boolean'],
                    'whitelist' => ['type' => 'boolean'],
                    'backends' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => false,
                            'properties' => [
                                'name' => ['type' => 'string'],
                                'base_url' => ['type' => 'string'],
                                'headers' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'additionalProperties' => false,
                                        'properties' => [
                                            'name' => ['type' => 'string'],
                                            'value' => ['type' => 'string'],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
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
                    'whitelist' => false,
                    'backends' => [],
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
     * Sanitize setting data before database inserts.
     *
     * @param array $data Setting data.
     * @param Setting $setting Setting instance.
     *
     * @return array $value Sanitized setting data.
     */
    protected static function validate_setting($data, $setting)
    {
        if ($setting->group() !== self::group()) {
            return $data;
        }

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

        $data['backends'] = \HTTP_BRIDGE\SettingsStore::validate_backends(
            $data['backends']
        );

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
