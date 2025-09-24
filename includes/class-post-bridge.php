<?php

namespace POSTS_BRIDGE;

use PBAPI;
use WP_Error;
use HTTP_BRIDGE\Http_Backend;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Post bridge object.
 */
class Post_Bridge
{
    /**
     * Handles WP_Post model fields.
     *
     * @var string[]
     */
    public const post_model = [
        'ID',
        'post_title',
        'post_name',
        'post_excerpt',
        'post_content',
        'post_content_filtered',
        'post_status',
        'post_mime_type',
        'post_date',
        'post_date_gmt',
        'post_modified',
        'post_modified_gmt',
        'post_parent',
        'post_password',
        'post_parent',
        'comment_status',
        'post_author',
        'pinged',
        'menu_order',
        'post_mime_type',
        'guid',
        'import_id',
        'post_category',
        'tags_input',
        'tax_input',
        'meta_input',
        'page_template',
        # custom
        'featured_media',
    ];

    /**
     * Bridge data common schema.
     *
     * @var array
     */
    public static function schema($addon = null)
    {
        $schema = [
            '$schema' => 'http://json-schema.org/draft-04/schema#',
            'title' => 'post-bridge',
            'type' => 'object',
            'properties' => [
                'post_type' => [
                    'title' => _x('Post type', 'Bridge schema', 'posts-bridge'),
                    'description' => __(
                        'Post type of the bridge',
                        'posts-bridge'
                    ),
                    'type' => 'string',
                    'minLength' => 1,
                ],
                'foreign_key' => [
                    'title' => _x(
                        'Foreign key',
                        'Bridge schema',
                        'posts-bridge'
                    ),
                    'description' => __(
                        'Name of the primary key of the remote objects',
                        'posts-birdge'
                    ),
                    'type' => 'string',
                ],
                'backend' => [
                    'title' => _x('Backend', 'Bridge schema', 'posts-bridge'),
                    'description' => __('Backend name', 'posts-bridge'),
                    'type' => 'string',
                    // 'default' => '',
                ],
                'endpoint' => [
                    'title' => _x('Endpoint', 'Bridge schema', 'posts-bridge'),
                    'description' => __('HTTP API endpoint', 'posts-bridge'),
                    'type' => 'string',
                    'default' => '/',
                ],
                'method' => [
                    'title' => _x('Method', 'Bridge schema', 'posts-bridge'),
                    'description' => __('HTTP method', 'posts-bridge'),
                    'type' => 'string',
                    'enum' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                    'default' => 'GET',
                ],
                'mappers' => [
                    'description' => __(
                        'Array of bridge\'s remote field mappings',
                        'posts-bridge'
                    ),
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
                                'validate_callback' =>
                                    '\POSTS_BRIDGE\JSON_Finger::validate',
                            ],
                        ],
                        'additionalProperties' => false,
                        'required' => ['name', 'foreign'],
                    ],
                    'default' => [],
                ],
                'is_valid' => [
                    'description' => __(
                        'Validation result of the bridge setting',
                        'posts-bridge'
                    ),
                    'type' => 'boolean',
                    'default' => true,
                ],
                'enabled' => [
                    'description' => __(
                        'Boolean flag to enable/disable a bridge',
                        'posts-bridge'
                    ),
                    'type' => 'boolean',
                    'default' => true,
                ],
            ],
            'required' => [
                'post_type',
                'foreign_key',
                'backend',
                'method',
                'endpoint',
                'mappers',
                'is_valid',
                'enabled',
            ],
            'additionalProperties' => false,
        ];

        if (!$addon) {
            return $schema;
        }

        return apply_filters('posts_bridge_bridge_schema', $schema, $addon);
    }

    /**
     * Handles bridge's data.
     *
     * @var array $data Settings data of the bridge.
     */
    protected $data;

    protected $id;

    /** Handles post bridge's addon slug.
     *
     * @var string
     */
    protected $addon;

    /**
     * Stores the post bridge's data as a private attribute.
     */
    public function __construct($data, $addon)
    {
        $this->data = wpct_plugin_sanitize_with_schema(
            $data,
            static::schema($addon)
        );
        $this->addon = $addon;

        if ($this->is_valid) {
            $this->id = $addon . '-' . $data['name'];
        }
    }

    public function data()
    {
        if (!$this->is_valid) {
            return;
        }

        return array_merge($this->data, [
            'id' => $this->id,
            'name' => $this->name,
            'addon' => $this->addon,
        ]);
    }

    /**
     * Magic method to proxy public attributes to method getters.
     *
     * @param string $name Attribute name.
     *
     * @return mixed Attribute value or null.
     */
    public function __get($name)
    {
        switch ($name) {
            case 'id':
                return $this->id;
            case 'addon':
                return $this->addon;
            case 'backend':
                return $this->backend();
            case 'content_type':
                return $this->content_type();
            case 'is_valid':
                return !is_wp_error($this->data) &&
                    $this->data['is_valid'] &&
                    Addon::addon($this->addon) !== null;
            default:
                if (!$this->is_valid) {
                    return;
                }

                return $this->data[$name] ?? null;
        }
    }

    /**
     * Retrives the bridge's backend instance.
     *
     * @return Http_Backend|null
     */
    protected function backend()
    {
        if (!$this->is_valid) {
            return;
        }

        return PBAPI::get_backend($this->data['backend']);
    }

    /**
     * Gets bridge's default body encoding schema.
     *
     * @return string|null
     */
    protected function content_type()
    {
        if (!$this->is_valid) {
            return;
        }

        $backend = PBAPI::get_backend($this->data['backend']);
        if (!$backend) {
            return;
        }

        return $backend->content_type;
    }

    /**
     * Fetches remote data for a given foreign id.
     *
     * @param int|string|null $foreign_id Foreig key value.
     *
     * @return array|WP_Error Remote data for the given id.
     */
    final public function fetch($foreign_id = null)
    {
        if (!$this->is_valid) {
            return new WP_Error('invalid_bridge');
        }

        $schema = $this->schema();

        if (
            !in_array(
                $this->method,
                $schema['properties']['method']['enum'],
                true
            )
        ) {
            return new WP_Error(
                'method_not_allowed',
                sprintf(
                    /* translators: %s: method name */
                    __('HTTP method %s is not allowed', 'posts-bridge'),
                    sanitize_text_field($this->method)
                ),
                ['method' => $this->method]
            );
        }

        $backend = $this->backend();
        $method = $this->method;

        $endpoint = $this->endpoint($foreign_id);

        return $backend->$method($endpoint);
    }

    protected function endpoint($foreign_id = null)
    {
        $endpoint = $this->data['endpoint'] ?? '';
        $parsed = wp_parse_url($endpoint);

        $endpoint = $parsed['path'] ?? '';

        if ($foreign_id) {
            $endpoint .= '/' . $foreign_id;
        }

        if (isset($parsed['query'])) {
            $endpoint .= '?' . $parsed['query'];
        }

        return apply_filters(
            'posts_bridge_endpoint',
            $endpoint,
            $foreign_id,
            $this
        );
    }

    public function foreign_ids()
    {
        $response = $this->fetch();

        if (is_wp_error($response)) {
            return $response;
        }

        $ids = [];
        foreach ($response['data'] as $item_data) {
            $finger = new JSON_Finger($item_data);
            $id = $finger->get($this->foreign_key);

            if ($id) {
                $ids[] = $id;
            }
        }

        return $ids;
    }

    // /**
    //  * Retrives the bridge's remote key values.
    //  *
    //  * @return array List of foreign ids.
    //  */
    // abstract public function foreign_ids();

    /**
     * Bridge's remote fields getter.
     *
     * @return array Map of remote fields with foreign as keys and names as values.
     */
    final public function remote_fields()
    {
        return array_merge(
            $this->remote_post_fields(),
            $this->remote_custom_fields()
        );
    }

    /**
     * Bridge's remote post fields getter.
     *
     * @return array Map of remote fields with foreign as keys and names as values.
     */
    final public function remote_post_fields()
    {
        $fields = [];
        foreach ($this->mappers as $mapper) {
            if (empty($mapper['name']) || empty($mapper['foreign'])) {
                continue;
            }

            if (in_array($mapper['name'], self::post_model)) {
                $fields[$mapper['foreign']] = $mapper['name'];
            }
        }

        return $fields;
    }

    /**
     * Bridge's remote custom fields getter.
     *
     * @return array Map of remote fields with foreign as keys and names as values.
     */
    final public function remote_custom_fields()
    {
        $fields = [];
        foreach ($this->mappers as $mapper) {
            if (empty($mapper['foreign']) || empty($mapper['name'])) {
                continue;
            }

            if (!in_array($mapper['name'], self::post_model)) {
                $fields[$mapper['foreign']] = $mapper['name'];
            }
        }

        return $fields;
    }

    /**
     * Apply fields mapping to a given data.
     *
     * @param array $data Data to apply fields mappings.
     *
     * @return array Data with remote fields mappeds.
     */
    final public function map_remote_fields($data)
    {
        $finger = new JSON_Finger($data);
        $post_fields = $this->remote_post_fields();
        $custom_fields = $this->remote_custom_fields();

        foreach ($post_fields as $foreign => $name) {
            if ($foreign === $name) {
                continue;
            }

            if ($value = $finger->get($foreign)) {
                $finger->set($name, $value);
            }

            $finger->unset($foreign);
        }

        foreach ($custom_fields as $foreign => $name) {
            if ($value = $finger->get($foreign)) {
                // wordpress can't serialize list arrays...
                if (wp_is_numeric_array($value)) {
                    $serializable = [];
                    for ($i = 0; $i < count($value); $i++) {
                        $serializable[(string) $i] = $value[$i];
                    }
                    $value = $serializable;
                }

                $finger->set('meta_input.' . $name, $value);
            }

            $finger->unset($foreign);
        }

        $data = $finger->data();

        // Prepare tags value for post insert
        if (isset($data['tags_input'])) {
            $data['tags_input'] = $this->get_post_tags($data['tags_input']);
        }

        // Prepare categories value for post insert
        if (isset($data['post_category'])) {
            $data['post_category'] = $this->get_post_categories(
                $data['post_category']
            );
        }

        // post type should not be user declarable
        unset($data['post_type']);

        // fallback to publish status
        if (!isset($data['post_status'])) {
            $data['post_status'] = 'publish';
        }

        return $data;
    }

    /**
     * On inserts, WordPress wants categories as an array of existing terms' ids.
     * Loop over the categories, create them if they doesn't exists, an return
     * its ids.
     *
     * @param array|string $categories Array with category names.
     *
     * @return array Array with valid categories ids.
     */
    private function get_post_categories($categories)
    {
        if (!wp_is_numeric_array($categories)) {
            $categories = $this->get_post_tags($categories);
        }

        $terms = get_terms(['taxonomy' => 'category', 'hide_empty' => false]);
        $term_names = [];
        foreach ($terms as $term) {
            $term_names[$term->name] = $term->term_id;
        }

        $ids = [];
        foreach ($categories as $cat) {
            if (is_int($cat)) {
                $ids[] = (int) $cat;
            } elseif (is_string($cat)) {
                if (isset($term_names[$cat])) {
                    $ids[] = $term_names[$cat];
                } else {
                    $term = wp_insert_term($cat, 'category');
                    if (!is_wp_error($term)) {
                        $ids[] = $term['term_id'];
                    }
                }
            }
        }

        return $ids;
    }

    /**
     * On inserts, WordPress wants tags as an array of strings with tag names.
     *
     * @param array|string $tags Array with post tags, or string with comma separated values.
     *
     * @return array Tag names as array.
     */
    private function get_post_tags($tags)
    {
        if (!is_array($tags)) {
            if (!is_string($tags)) {
                return [];
            }

            $tags = explode(',', $tags);
        }

        return array_filter(
            array_map(function ($tag) {
                return trim((string) $tag);
            }, $tags)
        );
    }

    /**
     * Register remote fields as post's meta and show on the REST API. This is
     * needed to load this fields on the editor.
     */
    final public function register_meta()
    {
        $fields = $this->remote_fields();
        foreach (array_keys($fields) as $foreign) {
            register_post_meta($this->post_type, $foreign, [
                'show_in_rest' => true,
                'single' => true,
                'type' => 'string',
                'sanitize_callback' => 'wp_kses_post',
            ]);
        }
    }

    /**
     * Returns a clone of the bridge instance with its data patched by
     * the partial array.
     *
     * @param array $partial Bridge data.
     *
     * @return Post_Bridge
     */
    public function patch($partial = [])
    {
        if (!$this->is_valid) {
            return $this;
        }

        $data = array_merge($this->data, $partial);
        return new static($data, $this->addon);
    }

    public function save()
    {
        if (!$this->is_valid) {
            return false;
        }

        $setting = Settings_Store::setting($this->addon);
        if (!$setting) {
            return false;
        }

        $bridges = $setting->bridges ?: [];

        $index = array_search($this->name, array_column($bridges, 'name'));

        if ($index === false) {
            $bridges[] = $this->data;
        } else {
            $bridges[$index] = $this->data;
        }

        $setting->bridges = $bridges;

        return true;
    }

    public function delete()
    {
        if (!$this->is_valid) {
            return false;
        }

        $setting = Settings_Store::setting($this->addon);
        if (!$setting) {
            return false;
        }

        $bridges = $setting->bridges ?: [];

        $index = array_search($this->name, array_column($bridges, 'name'));

        if ($index === false) {
            return false;
        }

        array_splice($bridges, $index, 1);
        $setting->bridges = $bridges;

        return true;
    }
}
