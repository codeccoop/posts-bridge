<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

class Odoo_Post_Bridge_Template extends Post_Bridge_Template
{
    private $database_data = null;

    /**
     * Handles the template default values.
     *
     * @var array
     */
    protected static $default = [
        'fields' => [
            [
                'ref' => '#database',
                'name' => 'name',
                'label' => 'Name',
                'type' => 'string',
                'required' => true,
            ],
            [
                'ref' => '#database',
                'name' => 'user',
                'label' => 'User',
                'type' => 'string',
            ],
            [
                'ref' => '#database',
                'name' => 'password',
                'label' => 'Password',
                'type' => 'string',
            ],
            [
                'ref' => '#backend',
                'name' => 'name',
                'label' => 'Name',
                'type' => 'string',
                'required' => true,
                'default' => 'Odoo',
            ],
            [
                'ref' => '#backend',
                'name' => 'base_url',
                'label' => 'Base URL',
                'type' => 'string',
            ],
        ],
        'bridge' => [
            'name' => '',
            'post_type' => '',
            'database' => '',
            'model' => '',
        ],
        'backend' => [
            'name' => 'Odoo',
            'headers' => [
                [
                    'name' => 'Content-Type',
                    'value' => 'application/json',
                ],
                [
                    'name' => 'Accept',
                    'value' => 'application/json',
                ],
            ],
        ],
        'database' => [
            'name' => '',
            'backend' => 'Odoo',
            'user' => '',
            'password' => '',
        ],
    ];

    /**
     * Sets the template api, extends the common schema and inherits the parent's
     * constructor.
     *
     * @param string $file Source file path of the template config.
     * @param array $config Template config data.
     * @param string $api Template's API name.
     */
    public function __construct($file, $config, $api)
    {
        add_filter(
            'posts_bridge_template_schema',
            function ($schema, $template_name) {
                if ($template_name === $this->name) {
                    $schema = $this->extend_schema($schema);
                }

                return $schema;
            },
            10,
            2
        );

        parent::__construct($file, $config, $api);

        add_filter(
            'posts_bridge_template_data',
            function ($data, $template_name) {
                if ($template_name === $this->name) {
                    $this->database_data = array_merge($data['database'], [
                        'backend' => $data['backend']['name'],
                    ]);

                    $data['bridge']['database'] = $data['database']['name'];
                }

                return $data;
            },
            10,
            2
        );

        add_action(
            'posts_bridge_before_template_bridge',
            function ($data, $template_name) {
                if ($template_name === $this->name && $this->database_data) {
                    $database_exists = $this->database_exists(
                        $this->database_data['name']
                    );

                    if ($database_exists) {
                        return;
                    }

                    $result = $this->create_database($this->database_data);

                    if (!$result) {
                        throw new Post_Bridge_Template_Exception(
                            'database_creation_error',
                            __(
                                'Posts Bridge can\'t create the database',
                                'posts-bridge'
                            )
                        );
                    }
                }
            },
            10,
            2
        );
    }

    /**
     * Extends the common schema and adds custom properties.
     *
     * @param array $schema Common template data schema.
     *
     * @return array
     */
    private function extend_schema($schema)
    {
        $schema['database'] = [
            'type' => 'object',
            'properties' => [
                'name' => ['type' => 'string'],
                'user' => ['type' => 'string'],
                'password' => ['type' => 'string'],
                'backend' => ['type' => 'string'],
            ],
            'required' => ['name', 'user', 'password', 'backend'],
            'additionalProperties' => false,
        ];

        $schema['bridge']['properties'] = array_merge(
            $schema['bridge']['properties'],
            [
                'database' => ['type' => 'string'],
                'model' => ['type' => 'string'],
            ]
        );

        $schema['bridge']['required'][] = 'database';
        $schema['bridge']['required'][] = 'model';

        return $schema;
    }

    /**
     * Checks if a backend with the given name exists on the settings store.
     *
     * @param string $name Backend name.
     *
     * @return boolean
     */
    private function database_exists($name)
    {
        $databases = Posts_Bridge::setting($this->api)->databases ?: [];
        return array_search($name, array_column($databases, 'name')) !== false;
    }

    /**
     * Stores the database data on the settings store.
     *
     * @param array $data Database data.
     *
     * @return boolean Creation result.
     */
    private function create_database($data)
    {
        $setting = Posts_Bridge::setting($this->api);
        $databases = $setting->databases;

        do_action('posts_bridge_before_template_database', $data, $this->name);

        $setting->databases = array_merge($databases, [$data]);
        $setting->flush();

        $is_valid = $this->database_exists($data['name']);

        if (!$is_valid) {
            return false;
        }

        do_action('forms_bridge_template_database', $data, $this->name);

        return true;
    }
}
