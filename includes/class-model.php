<?php

namespace WPCT_RCPT;

class Model
{
    private static $api_client;

    private $remote_data = null;
    private $post = null;

    public static function init()
    {
        self::$api_client = ApiClient::get_instance();
    }

    public function __construct($post)
    {
        if (is_int($post)) {
            $post = get_post($post);
        }

        $this->post = $post;
    }

    public function fetch()
    {
        $locale = apply_filters('wpct_i18n_post_language', $this->ID, 'locale');

        if ($this->remote_data) {
            return $this->remote_data;
        }

        $this->remote_data = apply_filters('wpct_rcpt_fetch', self::$api_client->get_data($this, $locale), $this, $locale);
        return $this->remote_data;
    }

    public function __get($attr)
    {
        $post_data = wp_unslash(object_get_vars($this->post));
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

Model::init();
