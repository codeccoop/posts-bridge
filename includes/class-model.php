<?php

namespace POSTS_BRIDGE;

class Remote_CPT
{
    private static $api_client;

    private $remote_id = null;
    private $remote_data = null;
    private $post = null;

    public function __construct($post)
    {
        if (is_int($post)) {
            $post = get_post($post);
        }

        $this->post = $post;
        $this->api_client = new ApiClient($this);
    }

    public function fetch()
    {
        $locale = apply_filters('wpct_i18n_post_language', $this->ID, 'locale');

        if ($this->remote_data) {
            return $this->remote_data;
        }

        $this->remote_data = apply_filters('posts_bridge_fetch', $this->api_client->get_data($locale), $this, $locale);
        return $this->remote_data;
    }

    public function endpoint()
    {
        $rel = $this->relation();
        if ($rel['type'] === 'rest') {
            $endpoint = $rel['endpoint'];
            $endpoint .= '/' . $this->remote_id;
            $endpoint = apply_filters('posts_bridge_endpoint', $endpoint, $this->remote_id, $this);
        } else {
            $endpoint = Settings::get_setting('posts-bridge', 'rpc-api', 'endpoint');
        }

        return $endpoint;
    }

    public function relation()
    {
        $rest_api = Settings::get_setting('posts-bridge', 'rest-api', 'relations');
        $rpc_api = Settings::get_setting('posts-bridge', 'rpc-api', 'relations');

        $endpoint = null;
        foreach ($rest_api as $rel) {
            if ($rel['post_type'] === $this->post_type) {
                return ['rel' => $rel, 'proto' => 'rest'];
            }
        }

        if (empty($endpoint)) {
            foreach ($rpc_api as $rel) {
                if ($rel['post_type'] === $this->post_type) {
                    return ['rel' => $rel, 'proto' => 'rpc'];
                }
            }
        }
    }

    public function __get($attr)
    {
        if ($attr === 'remote_id') {
            if (empty($this->remote_id)) {
                $this->remote_id = get_post_meta($this->post, '_rcpt_remote_id', true);
            }

            return $this->remote_id;
        }

        $post_data = wp_slash((array) $this->post);
        if (isset($post_data[$attr])) {
            return $post_data[$attr];
        }

        return null;
    }

    public function get($attr, $default = null)
    {
        $data = $this->fetch();

        if (isset($data[$attr])) {
            return $data[$attr];
        }

        return $default;
    }

    public function get_terms($tax)
    {
        return get_the_terms($this->ID, $tax);
    }

    public function get_meta($field, $single = true)
    {
        return get_post_meta($this->ID, $field, $single);
    }
}
