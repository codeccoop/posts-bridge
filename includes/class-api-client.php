<?php

namespace WPCT_RCPT;

use WPCT_HB\Http_Client;
use Exception;

class ApiClient extends Abstract\Singleton
{
    public function get_data($post, $locale = null)
    {
        $endpoint = $this->get_endpoint($post);

        if ($locale) {
            add_option('wpct_remote_cpt_api_language', $locale);
            add_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99);
        }

        if (WPCT_REMOTE_CPT_ENV === 'development') {
            $file = fopen($endpoint, 'r');
            $data = json_decode(fread($file, filesize($endpoint)), true);
            fclose($file);
        } else {
            $response = Http_Client::get($endpoint);
            if (!$response || is_wp_error($response)) {
                throw new Exception('Unable to connect to the remote API', 500);
            } else if ($response['response']['code'] !== 200) {
                throw new Exception('Http error while connecting to the remote API', $response['response']['code']);
            }

            $data = json_decode($response['body'], true);
        }

        return $data;
    }

    private function get_endpoint($post)
    {
        if (WPCT_REMOTE_CPT_ENV === 'development') {
            return apply_filters('wpct_remote_cpt_endpoint', dirname(__FILE__, 2) . "/data/{$post->post_type}.json", $post);
        } else {
            return apply_filters('wpct_remote_cpt_endpoint', '/wp-json/wp/v2/' . $post->post_type . '/' . $post->ID, $post);
        }
    }

    public function language_interceptor($lang)
    {
        $api_lang = get_option('wpct_remote_cpt_api_language');
        if ($api_lang) {
            $lang = $api_lang;
        }

        remove_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99);
        delete_option('wpct_remote_cpt_api_language');

        return $lang;
    }
}
