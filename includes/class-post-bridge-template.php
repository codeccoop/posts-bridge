<?php

namespace POSTS_BRIDGE;

use Exception;
use Error;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Custom exception for fine grained error handling during template implementations.
 */
class Post_Bridge_Template_Exception extends Exception
{
    /**
     * Handles the error's string code.
     *
     * @var string.
     */
    private $string_code;

    /**
     * Recives a code as string and a message and store the string code
     * as a custom attribute.
     *
     * @param string $string_code String code compatible with WP_Error codes.
     * @param string $message Error message.
     */
    public function __construct($string_code, $message)
    {
        $this->string_code = $string_code;
        parent::__construct($message);
    }

    /**
     * String code getter.
     *
     * @return string
     */
    public function getStringCode()
    {
        return $this->string_code;
    }
}

/**
 * Post Bridge template class. Handles the config data validation
 * and the use of template as post bridge creation strategy.
 */
class Post_Bridge_Template
{
    /**
     * Handles the template api name.
     *
     * @var string
     */
    protected $api;

    /**
     * Handles the template file name.
     *
     * @var string
     */
    private $file;

    /**
     * Handles the template name.
     *
     * @var string
     */
    private $name;

    /**
     * Handles the template config data.
     *
     * @var array
     */
    private $config;

    /**
     * Handles the template default values.
     *
     * @var array
     */
    protected static $default = [];

    /**
     * Handles the common template data json schema. The schema is common for all
     * Post_Bridge_Templates.
     *
     * @var array
     */
    private static $schema = [
        'title' => ['type' => 'string'],
        'fields' => [
            'type' => 'array',
            'items' => [
                'type' => 'object',
                'properties' => [
                    'ref' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'label' => ['type' => 'string'],
                    'description' => ['type' => 'string'],
                    'type' => [
                        'type' => 'string',
                        'enum' => ['string', 'number', 'options', 'boolean'],
                    ],
                    'required' => ['type' => 'boolean'],
                    'value' => [
                        'type' => [
                            'integer',
                            'number',
                            'string',
                            'boolean',
                            'array',
                            // 'object',
                            // 'null',
                        ],
                    ],
                    'default' => [
                        'type' => [
                            'integer',
                            'number',
                            'string',
                            'boolean',
                            'array',
                            // 'object',
                            // 'null',
                        ],
                    ],
                    'options' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'properties' => [
                                'label' => ['type' => 'string'],
                                'value' => [
                                    'type' => [
                                        'integer',
                                        'number',
                                        'string',
                                        'boolean',
                                    ],
                                ],
                            ],
                        ],
                        'uniqueItems' => true,
                    ],
                    'enum' => [
                        'type' => 'array',
                        'items' => [
                            'type' => ['integer', 'number', 'string'],
                        ],
                        'uniqueItems' => true,
                    ],
                    'min' => ['type' => 'integer'],
                    'max' => ['type' => 'integer'],
                    'multiple' => ['type' => 'boolean'],
                    // 'attributes' => ['type' => 'object'],
                ],
                'required' => ['ref', 'name', 'label', 'type'],
                'additionalProperties' => true,
            ],
        ],
        'bridge' => [
            'type' => 'object',
            'properties' => [
                'name' => ['type' => 'string'],
                'post_type' => ['type' => 'string'],
                'fields' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'name' => [
                                'type' => 'string',
                                'minLength' => 1,
                            ],
                            'foreign' => [
                                'type' => 'string',
                                'minLength' => 1,
                            ],
                        ],
                        'additionalProperties' => false,
                        'required' => ['name', 'foreign'],
                    ],
                ],
            ],
            'required' => ['name', 'post_type', 'fields'],
            'additionalProperties' => false,
        ],
        'backend' => [
            'type' => 'object',
            'properties' => [
                'name' => ['type' => 'string'],
                'base_url' => ['type' => 'string'],
                'headers' => [
                    'type' => 'array',
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'name' => ['type' => 'string'],
                            'value' => ['type' => 'string'],
                        ],
                        'required' => ['name', 'value'],
                        'additionalProperties' => false,
                    ],
                ],
            ],
            'required' => ['name' /*, 'base_url', 'headers'*/],
            'additionalProperties' => false,
        ],
        'post_type' => [
            'type' => 'object',
            'properties' => [
                'name' => ['type' => 'string'],
                'label' => ['type' => 'string'],
                'singular_label' => ['type' => 'string'],
                'description' => ['type' => 'string'],
                'public' => ['type' => 'boolean'],
                'exclude_from_search' => ['type' => 'boolean'],
                'publicly_queryable' => ['type' => 'boolean'],
                'show_ui' => ['type' => 'boolean'],
                'show_in_menu' => ['type' => 'boolean'],
                'show_in_nav_menus' => ['type' => 'boolean'],
                'show_in_admin_bar' => ['type' => 'boolean'],
                'show_in_rest' => ['type' => 'boolean'],
                'rest_base' => ['type' => 'string'],
                'menu_position' => ['type' => 'integer'],
                'capability_type' => ['type' => 'string'],
                'map_meta_cap' => ['type' => 'boolean'],
                'supports' => [
                    'typ' => 'array',
                    'items' => [
                        'type' => 'string',
                        'enum' => [
                            'title',
                            'editor',
                            'comments',
                            'revisions',
                            'trackbacks',
                            'author',
                            'excerpt',
                            'page-attributes',
                            'thumbnail',
                            'custom-fields',
                            'post-formats',
                        ],
                    ],
                ],
                'taxonomies' => ['type' => 'string'],
                'has_archive' => ['type' => 'boolean'],
                'rewrite' => ['type' => 'string'],
                'query_var' => ['type' => 'string'],
            ],
            'additionalProperties' => false,
            'required' => ['name'],
        ],
    ];

    /**
     * Validates input config against the template schema.
     *
     * @param string $name Template name.
     * @param array $config Input config.
     *
     * @return array|WP_Error Validated config.
     */
    private static function validate_config($name, $config)
    {
        $schema = [
            '$schema' => 'https://json-schema.org/draft/2020-12/schema',
            'type' => 'object',
            // 'additionalProperties' => true,
            'properties' => apply_filters(
                'posts_bridge_template_schema',
                static::$schema,
                $name
            ),
            'required' => ['title', 'fields', 'bridge', 'post_type'],
        ];

        $config = self::with_defaults($config, $schema);

        $is_valid = rest_validate_value_from_schema($config, $schema);
        if (is_wp_error($is_valid)) {
            return $is_valid;
        }

        return rest_sanitize_value_from_schema($config, $schema);
    }

    /**
     * Apply defaults to the given config.
     *
     * @param array $config Input config.
     * @param array $schema Template data schema.
     *
     * @return array Config fullfilled with defaults.
     */
    private static function with_defaults($config, $schema)
    {
        $post_type_schema = Custom_Post_Type::schema();
        $post_type_fields = [];

        foreach ($post_type_schema['properties'] as $prop => $defn) {
            $field = [
                'ref' => '#post_type',
                'name' => $prop,
                'label' => $prop,
                'description' => $defn['description'],
                'type' => $defn['type'],
                'required' => $defn['required'] ?? false,
            ];

            if (isset($defn['default'])) {
                $field['default'] = $defn['default'];
            }

            if ($defn['type'] === 'integer') {
                $field['type'] = 'number';
            }

            if (is_array($defn['type'])) {
                $field['type'] = 'string';
            }

            if (isset($defn['items'], $defn['enum'])) {
                $field['options'] = array_map(function ($value) {
                    return [
                        'label' => $value,
                        'value' => $value,
                    ];
                }, $defn['enum']);

                $field['type'] = 'options';
                $field['multiple'] = true;
            }

            $post_type_fields[] = $field;
        }

        // merge template defaults with common defaults
        $default = self::merge_array(
            static::$default,
            [
                'fields' => array_merge(
                    [
                        [
                            'ref' => '#bridge',
                            'name' => 'name',
                            'label' => __('Bridge name', 'posts-bridge'),
                            'type' => 'string',
                            'required' => true,
                        ],
                        // [
                        //     'ref' => '#post_type',
                        //     'name' => 'name',
                        //     'label' => __('Name', 'posts-bridge'),
                        //     'description' => __(
                        //         'Custom post type key',
                        //         'posts-bridge'
                        //     ),
                        //     'type' => 'string',
                        //     'required' => true,
                        // ],
                    ],
                    $post_type_fields
                ),
                'bridge' => [
                    'name' => '',
                    'post_type' => '',
                    'fields' => [],
                ],
                'backend' => [
                    'name' => '',
                    'base_url' => '',
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
                'post_type' => array_merge(
                    ['name' => ''],
                    array_reduce(
                        array_keys($post_type_schema['properties']),
                        function ($props, $prop) use ($post_type_schema) {
                            $props[$prop] =
                                $post_type_schema['properties'][$prop][
                                    'default'
                                ] ?? '';
                            return $props;
                        },
                        []
                    )
                ),
            ],
            $schema
        );

        // merge config with defaults
        return self::merge_array($config, $default, $schema);
    }

    /**
     * Merge numeric arrays with default values and returns the union of
     * the two arrays without repetitions.
     *
     * @param array $list Numeric array with values.
     * @param array $default Default values for the list.
     *
     * @return array
     */
    private static function merge_list($list, $default)
    {
        return array_values(array_unique(array_merge($list, $default)));
    }

    /**
     * Merge collection of arrays with its defaults, apply defaults to
     * each item of the collection and return the collection without
     * repetitions.
     *
     * @param array $collection Input collection of arrays.
     * @param array $default Default values for the collection.
     * @param array $schema JSON schema of the collection.
     *
     * @return array
     */
    private static function merge_collection($collection, $default, $schema)
    {
        if (!isset($schema['type'])) {
            return $collection;
        }

        if (!in_array($schema['type'], ['array', 'object'])) {
            return self::merge_list($collection, $default);
        }

        if ($schema['type'] === 'object') {
            foreach ($default as $item) {
                $col_item = null;
                for ($i = 0; $i < count($collection); $i++) {
                    $col_item = $collection[$i];

                    if (
                        $col_item['name'] === $item['name'] &&
                        ($col_item['ref'] ?? false) === ($item['ref'] ?? false)
                    ) {
                        break;
                    }
                }

                if ($i === count($collection)) {
                    $collection[] = $item;
                } else {
                    $collection[$i] = self::merge_array(
                        $col_item,
                        $default,
                        $schema
                    );
                }
            }
        } elseif ($schema['type'] === 'array') {
            // TODO: Handle matrix case
        }

        return $collection;
    }

    /**
     * Generic array default values merger. Switches between merge_collection and merge_list
     * based on the list items' data type.
     *
     * @param array $array Input array.
     * @param array $default Default array values.
     * @param array $schema JSON schema of the array values.
     *
     * @return array Array fullfilled with defaults.
     */
    private static function merge_array($array, $default, $schema)
    {
        foreach ($default as $key => $default_value) {
            if (empty($array[$key])) {
                $array[$key] = $default_value;
            } else {
                $value = $array[$key];
                $type = $schema['properties'][$key]['type'] ?? null;
                if (!$type) {
                    continue;
                }

                if ($type === 'object') {
                    if (!is_array($value) || wp_is_numeric_array($value)) {
                        $array[$key] = $default_value;
                    } else {
                        $array[$key] = self::merge_array(
                            $value,
                            $default_value,
                            $schema['properties'][$key]
                        );
                    }
                } elseif ($type === 'array') {
                    if (!wp_is_numeric_array($value)) {
                        $array[$key] = $default_value;
                    } else {
                        $array[$key] = self::merge_collection(
                            $value,
                            $default_value,
                            $schema['properties'][$key]['items']
                        );
                    }
                }
            }
        }

        foreach ($array as $key => $value) {
            if (!isset($schema['properties'][$key])) {
                unset($array[$key]);
            }
        }

        return $array;
    }

    /**
     * Store template attribute values, validates config data and binds the
     * instance to custom posts bridge template hooks.
     *
     * @param string $file Source file path of the template config.
     * @param array $config Template config data.
     * @param string $api Bridge API name.
     */
    public function __construct($file, $config, $api)
    {
        $this->api = $api;
        $this->file = $file;
        $this->name = pathinfo(basename($file))['filename'];
        $this->config = self::validate_config($this->name, $config);

        add_filter(
            'posts_bridge_templates',
            function ($templates, $api = null) {
                if (!wp_is_numeric_array($templates)) {
                    $templates = [];
                }

                if (empty($this->api)) {
                    return $templates;
                }

                if ($api && $api !== $this->api) {
                    return $templates;
                }

                if (is_wp_error($this->config)) {
                    return $templates;
                }

                return array_merge($templates, [
                    [
                        'name' => $this->name,
                        'title' => $this->config['title'],
                    ],
                ]);
            },
            10,
            2
        );

        add_action('posts_bridge_use_template', function ($data) {
            if ($data['name'] === $this->name) {
                $this->use_template($data['fields']);
            }
        });
    }

    /**
     * Magic method to proxy private template attributes and config data.
     *
     * @param string $name Attribute name.
     *
     * @return mixed Attribute value or null.
     */
    public function __get($name)
    {
        switch ($name) {
            case 'name':
                return $this->name;
            case 'file':
                return $this->file;
            case 'config':
                return $this->config;
        }

        return $this->config[$name] ?? null;
    }

    /**
     * Decorates the template config data for REST responses.
     *
     * @return array REST config data.
     */
    public function to_json()
    {
        return [
            'fields' => array_values(
                array_filter($this->config['fields'], function ($field) {
                    return empty($field['value']);
                })
            ),
            'title' => $this->config['title'],
            'name' => $this->name,
        ];
    }

    /**
     * Applies the input fields with the template's config data to
     * create a a new bridge.
     *
     * @param array $fields User input fields data.
     */
    private function use_template($fields)
    {
        $template = $this->config;

        if (is_wp_error($template)) {
            return;
        }

        global $wp_post_types;
        $post_type = array_filter($fields, function ($field) {
            return $field['name'] === 'name' && $field['ref'] === '#post_type';
        })[0]['value'];

        if (isset($wp_post_types[$post_type])) {
            foreach ($fields as $field) {
                if ($field['ref'] !== '#post_type') {
                    continue;
                }

                $field['value'] = $wp_post_types[$post_type][$field['name']];
            }
        }

        // Add constants to the user fields
        foreach ($template['fields'] as $field) {
            if (!empty($field['value'])) {
                $fields[] = $field;
            }
        }

        $all_fields = self::merge_collection(
            $fields,
            $template['fields'],
            static::$schema['fields']['items']
        );

        $requireds = array_filter($all_fields, function ($field) {
            return ($field['required'] ?? false) && empty($field['value']);
        });

        if (
            count($fields) > count($all_fields) ||
            count($fields) < count($requireds)
        ) {
            throw new Post_Bridge_Template_Exception(
                'invalid_fields',
                __('Invalid template fields', 'forms-bridge')
            );
        }

        $data = $template;
        foreach ($fields as $field) {
            $is_valid = rest_validate_value_from_schema($field, [
                'type' => 'object',
                'properties' => [
                    'ref' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'value' => [
                        'type' => [
                            'number',
                            'integer',
                            'string',
                            'boolean',
                            'array',
                            'object',
                            'null',
                        ],
                    ],
                ],
                'required' => ['ref', 'name', 'value'],
            ]);

            if (is_wp_error($is_valid) || ($field['ref'][0] ?? '') !== '#') {
                throw new Post_Bridge_Template_Exception(
                    'invalid_field',
                    sprintf(
                        __(
                            /* translators: %s: Field name */
                            'Field `%s` does not match the schema',
                            'posts-bridge'
                        ),
                        $field['name'] ?? ''
                    )
                );
            }

            // Format backend headers' values
            if ($field['ref'] === '#backend/headers[]') {
                $field['value'] = [
                    'name' => $field['name'],
                    'value' => $field['value'],
                ];
            }

            $keys = explode('/', substr($field['ref'], 1));
            $leaf = &$data;
            foreach ($keys as $key) {
                $clean_key = str_replace('[]', '', $key);
                if (!isset($leaf[$clean_key])) {
                    throw new Post_Bridge_Template_Exception(
                        'invalid_ref',
                        sprintf(
                            __(
                                /* translators: %s: ref value */
                                'Invalid template field ref `%s`',
                                'posts-bridge'
                            ),
                            $field['ref']
                        )
                    );
                }

                $leaf = &$leaf[$clean_key];
            }

            if (substr($key, -2) === '[]') {
                if (isset($field['index'])) {
                    $leaf[$field['index']] = $field['value'];
                } else {
                    $leaf[] = $field['value'];
                }
            } else {
                $leaf[$field['name']] = $field['value'];
            }
        }

        $data['fields'] = $fields;
        $data = apply_filters('posts_bridge_template_data', $data, $this->name);

        try {
            $create_post_type = !$this->post_type_exists(
                $data['post_type']['name']
            );

            if ($create_post_type) {
                $result = $this->create_post_type($data['post_type']);
                if (!$result) {
                    throw new Post_Bridge_Template_Exception(
                        'post_type_creation_error',
                        __(
                            'Posts Bridge can\'t create the post type',
                            'posts-bridge'
                        )
                    );
                }
            }

            $create_backend =
                !empty($data['backend']['name']) &&
                !$this->backend_exists($data['backend']['name']);

            if ($create_backend) {
                $result = $this->create_backend($data['backend']);

                if (!$result) {
                    if ($create_post_type) {
                        $this->remove_post_type($data['post_type']['name']);
                    }

                    throw new Post_Bridge_Template_Exception(
                        'backend_creation_error',
                        __(
                            'Posts Bridge can\'t create the backend',
                            'posts-bridge'
                        )
                    );
                }
            }

            $result = $this->create_bridge(
                array_merge($data['bridge'], [
                    'post_type' => $data['post_type']['name'],
                    'template' => $this->name,
                ])
            );

            if (!$result) {
                if ($create_post_type) {
                    $this->remove_post_type($data['post_type']['name']);
                }

                if ($create_backend) {
                    $this->remove_backend($data['backend']['name']);
                }

                throw new Post_Bridge_Template_Exception(
                    'bridge_creation_error',
                    __(
                        'Posts Bridge can\'t create the form bridge',
                        'posts-bridge'
                    )
                );
            }
        } catch (Post_Bridge_Template_Exception $e) {
            throw $e;
        } catch (Error | Exception $e) {
            if (isset($create_post_type) && $create_post_type) {
                $this->remove_post_type($data['post_type']['name']);
            }

            if (isset($create_backend) && $create_backend) {
                $this->remove_backend($data['backend']['name']);
            }

            if (isset($result) && $result) {
                $this->remove_bridge($data['bridge']['name']);
            }

            throw new Post_Bridge_Template_Exception(
                'internal_server_error',
                $e->getMessage()
            );
        }
    }

    /**
     * Registers a new custom post type.
     *
     * @param array Post type data.
     *
     * @return boolean
     */
    private function create_post_type($data)
    {
        do_action('posts_bridge_before_template_post_type', $data, $this->name);

        Custom_Post_Type::register($data);
        Posts_Bridge::setting('general')->flush();

        $is_valid = $this->post_type_exists($data['name']);
        if (!$is_valid) {
            return false;
        }

        do_action('posts_bridge_template_post_type', $data, $this->name);

        return true;
    }

    /**
     * Unregisters a custom post type by name.
     *
     * @param string $name Custom post type name.
     */
    private function remove_post_type($name)
    {
        Custom_Post_Type::unregister($name);
        Posts_Bridge::setting('general')->flush();
    }

    /**
     * Checks if a custom post type is already registered by name.
     *
     * @param string $name Custom post type name.
     *
     * @return boolean
     */
    private function post_type_exists($name)
    {
        $name = sanitize_title($name);
        $post_types = array_values(get_post_types());
        return array_search($name, $post_types) !== false;
    }

    /**
     * Removes backend from the settings store by name.
     *
     * @param string $name Backend name.
     */
    private function remove_backend($name)
    {
        $setting = \HTTP_BRIDGE\Settings_Store::setting('general');
        $backends = $setting->backends ?: [];

        $setting->backends = array_filter($backends, static function (
            $backend
        ) use ($name) {
            return $backend['name'] !== $name;
        });
    }

    /**
     * Checks if a backend with the given name exists on the settings store.
     *
     * @param string $name Backend name.
     *
     * @return boolean
     */
    final protected function backend_exists($name)
    {
        $backends =
            \HTTP_BRIDGE\Settings_Store::setting('general')->backends ?: [];
        return array_search($name, array_column($backends, 'name')) !== false;
    }

    /**
     * Stores the backend data on the settings store.
     *
     * @param array $data Backend data.
     *
     * @return boolean
     */
    private function create_backend($data)
    {
        $setting = \HTTP_BRIDGE\Settings_Store::setting('general');
        $backends = $setting->backends;

        do_action('forms_bridge_before_template_backend', $data, $this->name);

        $setting->backends = array_merge($backends, [$data]);
        $setting->flush();

        $is_valid = $this->backend_exists($data['name']);

        if (!$is_valid) {
            return false;
        }

        do_action('forms_bridge_template_backend', $data, $this->name);

        return true;
    }

    /**
     * Removes a bridge from the settings store by name.
     *
     * @param string $post_type Bridge's post type key.
     */
    private function remove_bridge($post_type)
    {
        $setting = Posts_Bridge::setting($this->api);
        $bridges = $setting->bridges ?: [];

        $setting->bridges = array_filter($bridges, static function (
            $bridge
        ) use ($post_type) {
            return $bridge['post_type'] !== $post_type;
        });
    }

    /**
     * Stores the form bridge data on the settings store.
     *
     * @param array $data Form bridge data.
     *
     * @return boolean
     */
    private function create_bridge($data)
    {
        $name_conflict = $this->bridge_exists($data['post_type']);
        if ($name_conflict) {
            return false;
        }

        $setting = Posts_Bridge::setting($this->api);
        $bridges = $setting->bridges ?: [];

        do_action('forms_bridge_before_template_bridge', $data, $this->name);

        $setting->bridges = array_merge($bridges, [$data]);
        $setting->flush();

        $is_valid = $this->bridge_exists($data['post_type']);
        if (!$is_valid) {
            return false;
        }

        do_action('forms_bridge_template_bridge', $data, $this->name);

        return true;
    }

    /**
     * Checks if a registered bridge exists by name.
     *
     * @param string $name Bridge name
     *
     * @return boolean
     */
    private function bridge_exists($name)
    {
        $bridges = Posts_Bridge::setting($this->api)->bridges ?: [];
        return array_search($name, array_column($bridges, 'post_type')) !==
            false;
    }
}
