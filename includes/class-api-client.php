<?php

namespace WPCT_RCPT;

use WPCT_HB\Http_Client;

class ApiClient extends Abstract\Singleton
{
    private $base_url;

    public function __construct($base_url)
    {
        $this->base_url = $base_url;
    }

    public function get_data($post_id, $post_type, $locale = null)
    {
        $endpoint = $this->get_endpoint($post_id, $post_type);

        if ($locale) {
            add_option('wpct_remote_cpt_api_language', $locale);
            add_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99, 2);
        }

        if (WPCT_REMOTE_CPT_ENV === 'development') {
            $file = fopen($endpoint, 'r');
            $data = json_decode(fread($file, filesize($endpoint)), true);
            fclose($file);
        } else {
            $response = Http_Client::get($endpoint);
            if (!$response || $response['response']['code'] !== 200) {
                throw new \Exception('Unable to connect to Odoo', 500);
            }
            $data = json_decode($response['body'], true);
        }

        return $data;
    }

    private function get_endpoint($post_id, $post_type)
    {
        if (WPCT_REMOTE_CPT_ENV === 'development') {
            return apply_filters('wpct_remote_cpt_endpoint', dirname(__FILE__, 2) . "/data/{$post_type}.json", $post_id);
        } else {
            return apply_filters('wpct_remote_cpt_endpoint', $this->base_url . '/' . $post_id, $post_id);
        }
    }


    private function language_interceptor($language, $format = null)
    {
        $api_language = get_option('wpct_remote_cpt_api_language');
        if ($api_language) {
            $language = $api_language;
        }

        remove_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99, 2);
        delete_option('wpct_remote_cpt_api_locale');

        return $language;
    }
}
