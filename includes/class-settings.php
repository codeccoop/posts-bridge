<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Settings as BaseSettings;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-rest-settings-controller.php';

/**
 * Plugin settings.
 */
class Settings extends BaseSettings
{
    /**
     * Handle REST Settings Controller class name.
     *
     * @var string $rest_controller_class REST Settings Controller class name.
     */
    protected static $rest_controller_class = '\POSTS_BRIDGE\REST_Settings_Controller';

    protected function construct(...$args)
    {
        parent::construct(...$args);

        add_filter(
            'wpct_sanitize_setting',
            function ($value, $setting) {
                return $this->sanitize_setting($value, $setting);
            },
            10,
            2
        );
    }

    /**
     * Register plugin settings.
     */
    public function register()
    {
        // Register general settings
        $this->register_setting(
            'general',
            [
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
                'whitelist' => false,
                'backends' => [],
                'synchronize' => [
                    'enabled' => false,
                    'recurrence' => 'hourly',
                ],
            ]
        );

        // Register REST API settings
        $this->register_setting(
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
            ]
        );
    }

    /**
     * Sanitize setting data before database inserts.
     *
     * @param array $value Setting data.
     * @param Setting $setting Setting instance.
     *
     * @return array $value Sanitized setting data.
     */
    protected function sanitize_setting($value, $setting)
    {
        if ($setting->group() !== $this->group()) {
            return $value;
        }

        $name = $setting->name();
        switch ($name) {
            case 'general':
                $value = $this->validate_general($value);
                $this->update_addons($value);
                break;
            case 'rest-api':
                $value = $this->validate_api($value);
                break;
        }

        return $value;
    }

    /**
     * Apply updates on APIs settings on general setting updates.
     *
     * @param array $value General setting data.
     *
     * @return array General setting data.
     */
    private function validate_general($value)
    {
        $value['whitelist'] = (bool) $value['whitelist'];

        $value['synchronize'] = array_merge((array) $value['synchronize'], [
            'enabled' => false,
            'recurrence' => 'hourly',
        ]);

        $value['synchronize']['enabled'] =
            (bool) $value['synchronize']['enabled'];

        $value['synchronize']['recurrence'] = in_array(
            $value['synchronize']['recurrence'],
            [
                'minutly',
                'twicehourly',
                'hourly',
                'twicedaily',
                'daily',
                'weekly',
            ]
        )
            ? $value['synchronize']['recurrence']
            : 'hourly';

        $value['backends'] = \HTTP_BRIDGE\Settings::validate_backends(
            $value['backends']
        );

        return $value;
    }

    /*+
     * Apply API setting validations before db updates.
     *
     * @param array $value API setting data.
     *
     * @return array Validated API setting data.
     */
    private function validate_api($value)
    {
        $backends = self::get_setting($this->group(), 'general')->backends;

        $value['relations'] = $this->validate_relations(
            $value['relations'],
            $backends
        );

        return $value;
    }

    /**
     * Validate API setting remote relations.
     *
     * @param array $relations List of API remote relations data.
     * @param array $backends List of available backends data.
     *
     * @return array List of valid API remote relations.
     */
    protected function validate_relations($relations, $backends)
    {
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
                $ref['fields'] = isset($ref['fields'])
                    ? (array) $ref['fields']
                    : [];
                $rel['fields'] = array_values(
                    array_filter($rel['fields'], static function ($field) {
                        return $field['foreign'] && $field['name'];
                    })
                );

                $rel['backend'] = sanitize_text_field($rel['backend']);
                if (isset($rel['foreign_key'])) {
                    $rel['endpoint'] = sanitize_text_field($rel['endpoint']);
                    $rel['foreign_key'] = sanitize_text_field(
                        $rel['foreign_key']
                    );
                } else {
                    $rel['model'] = sanitize_text_field($rel['model']);
                }

                $fields = [];
                foreach ($rel['fields'] as $field) {
                    $field['name'] = sanitize_text_field($field['name']);
                    $field['foreign'] = sanitize_text_field($field['foreign']);
                    $fields[] = $field;
                }
                $rel['fields'] = $fields;

                $valid_relations[] = $rel;
            }
        }

        return $valid_relations;
    }

    private function update_addons($value)
    {
        $addons = isset($value['addons']) ? $value['addons'] : [];
        $addons_dir = dirname(__FILE__, 2) . '/addons';
        $enableds = "{$addons_dir}/enabled";

        foreach ($addons as $addon => $enabled) {
            $index = "{$enableds}/{$addon}";
            if ($enabled && !is_file($index)) {
                $fp = fopen($index, 'w');
                fclose($fp);
            } elseif (!$enabled && is_file($index)) {
                unlink($index);
            }
        }
    }
}
