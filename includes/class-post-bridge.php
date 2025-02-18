<?php

namespace POSTS_BRIDGE;

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
     * @var array<string> WP_Post model fields.
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
     * Handles relation data.
     *
     * @var array $data Settings data of the relation.
     */
    protected $data;

    /** Handles relation api slug.
     *
     * @var string $api Api slug.
     */
    protected $api;

    protected static $template_class = '\POSTS_BRIDGE\Post_Bridge_Template';

    private static $templates = [];

    final public static function load_templates($templates_path, $api)
    {
        if (!is_dir($templates_path)) {
            $res = mkdir($templates_path);
            if (!$res) {
                return;
            }
        }

        if (!is_readable($templates_path)) {
            return;
        }

        $template_files = apply_filters(
            'posts_bridge_template_files',
            array_map(static function ($template_file) use ($templates_path) {
                return $templates_path . '/' . $template_file;
            }, array_diff(scandir($templates_path), ['.', '..'])),
            $api
        );

        foreach ($template_files as $template_path) {
            if (!is_file($templates_path) || !is_readable($templates_path)) {
                continue;
            }

            $template_file = basename($templates_path);
            $ext = pathinfo($template_file)['extension'];

            $config = null;
            if ($ext === 'php') {
                $config = include $templates_path;
            } elseif ($ext === 'json') {
                $content = file_get_contents($templates_path);
                $config = json_decode($content, true);
            }

            if (is_array($config)) {
                static::$templates[] = new static::$template_class(
                    $template_file,
                    $config,
                    $api
                );
            }
        }
    }

    final public static function get_template($name)
    {
        foreach (static::$templates as $template) {
            if ($template->name === $name) {
                return $template;
            }
        }
    }

    /**
     * Binds the bridge data to the instance and sets its api slug.
     */
    public function __construct($data, $api)
    {
        $this->api = $api;
        $this->data = $data;
    }

    /**
     * Proxies bridge private getters to public attributes.
     *
     * @param string $name Attribute name.
     *
     * @return mixed Instance attribute value.
     */
    public function __get($name)
    {
        switch ($name) {
            case 'api':
                return $this->api;
            case 'backend':
                return $this->backend();
            case 'endpoint':
                return $this->endpoint();
            default:
                return $this->data[$name] ?? null;
        }
    }

    /**
     * Retrives the bridge's backend instance.
     *
     * @return Http_Backend|null
     */
    private function backend()
    {
        $backend_name = $this->data['backend'] ?? null;
        if (!$backend_name) {
            return $backend_name;
        }

        return apply_filters('http_bridge_backend', null, $backend_name);
    }

    /**
     * Relation's endpoint getter.
     *
     * @return string Endpoint path.
     */
    private function endpoint($foreign_id = null)
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

    /**
     * Searches for relation's foreign key values.
     *
     * @return array List of foreign ids.
     */
    public function foreign_ids()
    {
        $endpoint = $this->endpoint();
        $backend = $this->backend();

        $res = $backend->get($endpoint);

        if (is_wp_error($res) || empty($res['data'])) {
            return [];
        }

        return array_map(function ($model) {
            return (new JSON_Finger($model))->get($this->foreign_key);
        }, (array) $res['data']);
    }

    /**
     * Fetches remote data for a given foreign key.
     *
     * @param int|string $foreign_id Foreig key value.
     *
     * @return array|WP_Error Remote data for the given id.
     */
    public function fetch($foreign_id)
    {
        $endpoint = $this->endpoint($foreign_id);
        $res = $this->backend()->get($endpoint);
        if (is_wp_error($res)) {
            return $res;
        }

        return $res['data'];
    }

    /**
     * Relation's remote fields getter.
     *
     * @return array Map of remote fields with foreign as keys and names as values.
     */
    public function remote_fields()
    {
        return array_merge(
            $this->remote_post_fields(),
            $this->remote_custom_fields()
        );
    }

    /**
     * Relation's remote post fields getter.
     *
     * @return array Map of remote fields with foreign as keys and names as values.
     */
    public function remote_post_fields()
    {
        $fields = [];
        foreach ($this->fields as $field) {
            extract($field);
            if (in_array($name, self::post_model)) {
                $fields[$foreign] = $name;
            }
        }

        return $fields;
    }

    /**
     * Relation's remote custom fields getter.
     *
     * @return array Map of remote fields with foreign as keys and names as values.
     */
    public function remote_custom_fields()
    {
        $fields = [];
        foreach ($this->fields as $field) {
            extract($field);
            if (!in_array($name, self::post_model)) {
                $fields[$foreign] = $name;
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
    public function map_remote_fields($data)
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
    public function register_meta()
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
}
