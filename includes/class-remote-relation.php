<?php

namespace POSTS_BRIDGE;

use HTTP_BRIDGE\Http_Backend;

use function WPCT_ABSTRACT\is_list;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Remote post relation data.
 */
class Remote_Relation
{
    /**
     * Handle WP_Post model fields.
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
     * Handle relation's post type slug.
     *
     * @var string $post_type Post type slug.
     */
    private $post_type;

    /**
     * Handle relation's backend name.
     *
     * @var string $backend Backend name.
     */
    private $backend;

    /**
     * Handle relation's model name.
     *
     * @var string $model Model name.
     */
    private $model;

    /**
     * Handle relation's API endpoint path.
     *
     * @var string $endpoint Endpoint path.
     */
    private $endpoint;

    /**
     * Handle relation's foreign key.
     *
     * @var string $foreing_key Relation foreign key.
     */
    private $foreign_key;

    /**
     * Handle relation's remote fields maps.
     *
     * @var array $fields Remote fields list.
     */
    private $fields = [];

    /**
     * Binds the relation data to the instance.
     */
    public function __construct($data)
    {
        $this->post_type = $data['post_type'];
        $this->backend = $data['backend'];
        $this->model = isset($data['model']) ? $data['model'] : null;
        $this->fields = (array) $data['fields'];
        $this->foreign_key = isset($data['foreign_key'])
            ? $data['foreign_key']
            : 'id';

        $this->endpoint = (string) (isset($data['endpoint'])
            ? $data['endpoint']
            : Settings::get_setting('posts-bridge', 'rpc-api')->endpoint);

        // remove host data from the endpoint
        if (!empty($this->endpoint)) {
            $url = parse_url($this->endpoint);
            if (isset($url['path'])) {
                $this->endpoint = $url['path'];
                if (isset($url['query'])) {
                    $this->endpoint .= '?' . $url['query'];
                }
            }
        }
    }

    /**
     * Realtion's API protocol getter.
     *
     * @return string API protocol.
     */
    public function proto()
    {
        return empty($this->model) ? 'rest' : 'rpc';
    }

    /**
     * Relation's post type getter.
     *
     * @return string Post type slug.
     */
    public function post_type()
    {
        return $this->post_type;
    }

    /**
     * Relation's backend getter.
     *
     * @return Http_Backend Http_Backend instance.
     */
    public function backend()
    {
        return apply_filters('http_bridge_backend', null, $this->backend);
    }

    /**
     * Relation's model getter.
     *
     * @return string Model name.
     */
    public function model()
    {
        return $this->model;
    }

    /**
     * Relation's foreign key getter.
     *
     * @return string Foreign key.
     */
    public function foreign_key()
    {
        return $this->foreign_key;
    }

    /**
     * Relation's endpoint getter.
     *
     * @return string Endpoint path.
     */
    public function endpoint()
    {
        return $this->endpoint;
    }

    /**
     * Relation's endpoint URL getter.
     *
     * @return string Endpoint full URL.
     */
    public function url()
    {
        $backend = $this->backend();
        return $backend->url($this->endpoint);
    }

    /**
     * Proxy HTTP_Backend headers getter.
     *
     * @return array Backend HTTP headers.
     */
    public function headers()
    {
        return $this->backend()->headers();
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
                if (is_list($value)) {
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
        if (!is_array($categories)) {
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
                return trim($tag);
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
            register_post_meta($this->post_type(), $foreign, [
                'show_in_rest' => true,
                'single' => true,
                'type' => 'string',
                'sanitize_callback' => 'wp_kses_post',
            ]);
        }
    }
}
