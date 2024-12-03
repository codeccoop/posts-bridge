<?php

namespace POSTS_BRIDGE;

use WP_Post;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Remote_CPT post wrapper.
 */
class Remote_CPT
{
    /**
     * Foreign key meta key handle.
     *
     * @var string Meta key.
     */
    public const _foreign_key_handle = '_posts_bridge_foreign_key';

    /**
     * Handle instance of the HTTP_Client.
     *
     * @var HTTP_Client $http_client Own instance of the HTTP_Client;
     */
    private $http_client;

    /**
     * Handle value of the remote model foreign key.
     *
     * @var string $foreign_id Foreign key value.
     */
    private $foreign_id;

    /**
     * Handle remote data as in memory cache.
     *
     * @var array|null $remote_data Cached remote data.
     */
    private $remote_data = null;

    /**
     * Handle the wrapped WP_Post instance.
     *
     * @var WP_Post $post WP_Post instance.
     */
    private $post;

    /**
     * Wraps the post and gets its own HTTP_Client instance.
     *
     * @param WP_Post|int $post Instance of the post.
     */
    public function __construct($post)
    {
        if (is_int($post)) {
            $post = get_post($post);
        }

        $this->post = $post;
        $this->http_client = new HTTP_Client($this);
    }

    /**
     * Fetches post remote data.
     *
     * @return array|null $remote_data Remote data.
     */
    public function fetch()
    {
        if ($this->remote_data) {
            return $this->remote_data;
        }

        $locale = apply_filters(
            'wpct_i18n_post_language',
            null,
            $this->ID,
            'locale'
        );

        $this->remote_data = apply_filters(
            'posts_bridge_fetch',
            $this->http_client->get_data($locale),
            $this,
            $locale
        );
        return $this->remote_data;
    }

    /**
     * Proxy of the wrapped posts attributes.
     *
     * @param string $attr Attribute name.
     *
     * @return mixed Attribute value or null if attribute does not exists.
     */
    public function __get($attr)
    {
        $post_data = wp_slash((array) $this->post);
        if (isset($post_data[$attr])) {
            return $post_data[$attr];
        }

        return null;
    }

    /**
     * Remote data attributes getter.
     *
     * @param string $attr Remote attribute name.
     * @param mixed $default Default value if attribute does not have value.
     *
     * @return mixed Remote value.
     */
    public function get($attr, $default = null)
    {
        $data = $this->fetch();

        if (is_wp_error($data)) {
            return $default;
        }

        $finger = new JSON_Finger($data);
        if ($value = $finger->get($attr)) {
            return $value;
        }

        return $default;
    }

    /**
     * Gets the post's remote relation endpoint.
     *
     * @return string Post's relation endpoint.
     */
    public function get_endpoint()
    {
        $rel = $this->get_relation();
        if ($rel->get_proto() === 'rest') {
            $endpoint = $rel->get_endpoint();
        } else {
            $endpoint = Settings::get_setting(
                'posts-bridge',
                'rpc-api',
                'endpoint'
            );
        }

        $url = parse_url($endpoint);
        $endpoint = preg_replace('/\/$/', '', $url['path']);
        $endpoint .= '/' . $this->foreign_id;

        if (isset($url['query'])) {
            $endpoint .= '?' . $url['query'];
        }

        return apply_filters(
            'posts_bridge_endpoint',
            $endpoint,
            $this->foreign_id,
            $this
        );
    }

    /**
     * Gets remote relation data.
     *
     * @return Remote_Relation Remote relation data.
     */
    public function get_relation()
    {
        $relations = Settings::get_relations();
        foreach ($relations as $rel) {
            if ($rel->get_post_type() === $this->post_type) {
                return $rel;
            }
        }
    }

    /**
     * Foreign key value getter.
     *
     * @return string|int Remote relation foreign key value.
     */
    public function get_foreign_id()
    {
        if (empty($this->foreign_id)) {
            $this->foreign_id = get_post_meta(
                $this->post->ID,
                self::_foreign_key_handle,
                true
            );
        }

        return $this->foreign_id;
    }

    /**
     * Wrapped post taxonomy terms getter.
     *
     * @param string $tax Taxonomy name.
     *
     * @return array<WP_Term>|WP_Error Terms of the taxonomy attacheds to the post.
     */
    public function get_terms($tax)
    {
        return get_the_terms($this->ID, $tax);
    }

    /**
     * Wrapped post custom fields getter.
     *
     * @param string $field Custom field name.
     * @param boolean $single Retrive a single value.
     *
     * @return mixed Custom field value or false.
     */
    public function get_meta($field, $single = true)
    {
        return get_post_meta($this->ID, $field, $single);
    }
}
