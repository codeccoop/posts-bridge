<?php

namespace POSTS_BRIDGE;

use HTTP_BRIDGE\Http_Backend;

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
        'post_ID',
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
            : Settings::get_setting('posts-bridge', 'rpc-api', 'endpoint'));

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
    public function get_proto()
    {
        return empty($this->model) ? 'rest' : 'rpc';
    }

    /**
     * Relation's post type getter.
     *
     * @return string Post type slug.
     */
    public function get_post_type()
    {
        return $this->post_type;
    }

    /**
     * Relation's backend getter.
     *
     * @return Http_Backend Http_Backend instance.
     */
    public function get_backend()
    {
        return apply_filters('posts_bridge_backend', null, $this->backend);
    }

    /**
     * Relation's model getter.
     *
     * @return string Model name.
     */
    public function get_model()
    {
        return $this->model;
    }

    /**
     * Relation's foreign key getter.
     *
     * @return string Foreign key.
     */
    public function get_foreign_key()
    {
        return $this->foreign_key;
    }

    /**
     * Relation's endpoint getter.
     *
     * @return string Endpoint path.
     */
    public function get_endpoint()
    {
        return $this->endpoint;
    }

    /**
     * Relation's endpoint URL getter.
     *
     * @return string Endpoint full URL.
     */
    public function get_url()
    {
        $backend = $this->get_backend();
        return $backend->get_endpoint_url($this->endpoint);
    }

    /**
     * Proxy HTTP_Backend headers getter.
     *
     * @return array Backend HTTP headers.
     */
    public function get_headers()
    {
        return $this->get_backend()->get_headers();
    }

    /**
     * Relation's remote fields getter.
     *
     * @return array<string, string> Map of remote fields with foreign as keys and names as values.
     */
    public function get_remote_fields()
    {
        return array_merge(
            $this->get_remote_post_fields(),
            $this->get_remote_custom_fields()
        );
    }

    /**
     * Relation's remote post fields getter.
     *
     * @return array<string, string> Map of remote fields with foreign as keys and names as values.
     */
    public function get_remote_post_fields()
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
     * @return array<string, string> Map of remote fields with foreign as keys and names as values.
     */
    public function get_remote_custom_fields()
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
        $remote_fields = $this->get_remote_fields();

        foreach ($remote_fields as $foreign => $name) {
            if ($foreign === $name) {
                continue;
            }

            if ($value = $finger->get($foreign)) {
                $finger->set($name, $value);
            }

            $finger->unset($foreign);
        }

        $data = $finger->data();

        // standarize ID field
        if (isset($data['post_ID'])) {
            $data['ID'] = $data['post_ID'];
            unset($data['post_ID']);
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
     * Register remote fields as post's meta and show on the REST API. This is
     * needed to load this fields on the editor.
     */
    public function register_meta()
    {
        $fields = $this->get_remote_fields();
        foreach (array_keys($fields) as $foreign) {
            register_post_meta($this->get_post_type(), $foreign, [
                'show_in_rest' => true,
                'single' => true,
                'type' => 'string',
                'sanitize_callback' => 'wp_kses_post',
            ]);
        }
    }
}
