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

    /**
     * Plugin handled post types getter.
     *
     * @param string|null $proto Filter post types by API protocol.
     *
     * @return array<string> Handled post type slugs.
     */
    public static function get_post_types($proto = null)
    {
        $relations = self::get_relations($proto);
        return array_values(
            array_unique(
                array_map(function ($rel) {
                    return $rel->get_post_type();
                }, $relations)
            )
        );
    }

    /**
     * Plugin's remote relations getter.
     *
     * @param string|null $proto Filter post types by API protocol.
     *
     * @return array<Remote_Relation> Remote relations.
     */
    public static function get_relations($proto = null)
    {
        $rest_rels = Settings::get_setting(
            'posts-bridge',
            'rest-api',
            'relations'
        );
        $rpc_rels = Settings::get_setting(
            'posts-bridge',
            'rpc-api',
            'relations'
        );
        $relations = array_map(function ($rel) {
            return new Remote_Relation($rel);
        }, array_merge($rest_rels, $rpc_rels));

        if ($proto) {
            $relations = array_filter($relations, function ($rel) use ($proto) {
                return $rel->get_proto() === $proto;
            });
        }

        return $relations;
    }

    /**
     * Register plugin settings.
     */
    public function register()
    {
        $host = parse_url(get_bloginfo('url'))['host'];

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
                'backends' => [
                    [
                        'name' => 'ERP',
                        'base_url' => 'https://erp.' . $host,
                        'headers' => [
                            [
                                'name' => 'Authorization',
                                'value' => 'Bearer <erp-api-token>',
                            ],
                        ],
                    ],
                ],
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
                'relations' => [
                    [
                        'post_type' => 'post',
                        'endpoint' => '/api/posts',
                        'foreign_key' => 'id',
                        'backend' => 'ERP',
                        'fields' => [],
                    ],
                ],
            ]
        );

        // Register RPC API settings
        $this->register_setting(
            'rpc-api',
            [
                'endpoint' => ['type' => 'string'],
                'user' => ['type' => 'string'],
                'password' => ['type' => 'string'],
                'database' => ['type' => 'string'],
                'relations' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'additionalProperties' => false,
                        'properties' => [
                            'post_type' => ['type' => 'string'],
                            'model' => ['type' => 'string'],
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
                'endpoint' => '/jsonrpc',
                'user' => 'admin',
                'password' => 'admin',
                'database' => 'erp',
                'relations' => [
                    [
                        'post_type' => 'post',
                        'model' => 'blog.post',
                        'backend' => 'ERP',
                        'fields' => [],
                    ],
                ],
            ]
        );
    }

    /**
     * Sanitize setting data before database inserts.
     *
     * @param string $option Setting name.
     * @param array $value Setting data.
     *
     * @return array $value Sanitized setting data.
     */
    protected function sanitize_setting($option, $value)
    {
        [$group, $setting] = explode('_', $option);
        switch ($setting) {
            case 'general':
                $value = $this->validate_general($value);
                break;
            case 'rest-api':
            case 'rpc-api':
                $value = $this->validate_api($value);
                break;
        }

        return parent::sanitize_setting($option, $value);
    }

    /**
     * Apply updates on APIs settings on general setting updates.
     *
     * @param array $setting General setting data.
     *
     * @return array General setting data.
     */
    private function validate_general($setting)
    {
        $rest = self::get_setting($this->get_group_name(), 'rest-api');
        $rpc = self::get_setting($this->get_group_name(), 'rpc-api');

        $relations = $this->validate_relations(
            $rest['relations'],
            $setting['backends']
        );
        if (count($relations) !== count($rest['relations'])) {
            $rest['relations'] = $relations;
            update_option($this->get_group_name() . '_' . 'rest-api', $rest);
        }

        $relations = $this->validate_relations(
            $rpc['relations'],
            $setting['backends']
        );
        if (count($relations) !== count($rpc['relations'])) {
            $rpc['relations'] = $relations;
            update_option($this->get_group_name() . '_' . 'rpc-api', $rpc);
        }

        return $setting;
    }

    /*+
     * Apply API setting validations before db updates.
     *
     * @param array $setting API setting data.
     *
     * @return array Validated API setting data.
     */
    private function validate_api($setting)
    {
        $backends = Settings::get_setting(
            $this->get_group_name(),
            'general',
            'backends'
        );
        $setting['relations'] = $this->validate_relations(
            $setting['relations'],
            $backends
        );
        return $setting;
    }

    /**
     * Validate API setting remote relations.
     *
     * @param array $relations List of API remote relations.
     * @param array $backends List of available backends.
     *
     * @return array List of valid API remote relations.
     */
    private function validate_relations($relations, $backends)
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

                $valid_relations[] = $rel;
            }
        }
        return $valid_relations;
    }
}
