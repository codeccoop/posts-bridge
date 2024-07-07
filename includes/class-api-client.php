<?php

namespace WPCT_RCPT;

use WPCT_HTTP\Http_Client as Wpct_Http_Client;
use Exception;

class ApiClient extends WPCT_ABSTRACT\Singleton
{
    public function get_data($post, $locale = null)
    {
        $endpoint = $this->get_endpoint($post);

        if ($locale) {
            add_option('wpct_rcpt_api_language', $locale);
            add_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99);
        }

        if (WPCT_RCPT_ENV === 'development') {
            $file = fopen($endpoint, 'r');
            $data = json_decode(fread($file, filesize($endpoint)), true);
            fclose($file);
        } else {
            $response = Wpct_Http_Client::get($endpoint);
            if (is_wp_error($response)) {
                throw new Exception('Unable to connect to the remote API', 500);
            } else if ($response['response']['code'] !== 200) {
                throw new Exception('Http error while connecting to the remote API', $response['response']['code']);
            }

            $data = json_decode($response['body'], true);
        }

        return $data;
    }

    private function get_endpoint($remote_cpt)
    {
        if (WPCT_RCPT_ENV === 'development') {
            return apply_filters('wpct_rcpt_endpoint', dirname(__FILE__, 2) . "/data/{$remote_cpt->post_type}.json", $remote_cpt);
        } else {
            return apply_filters('wpct_rcpt_endpoint', '/wp-json/wp/v2/' . $remote_cpt->post_type . '/' . $remote_cpt->ID, $remote_cpt);
        }
    }

    public function language_interceptor($lang)
    {
        $api_lang = get_option('wpct_rcpt_api_language');
        if ($api_lang) {
            $lang = $api_lang;
        }

        remove_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99);
        delete_option('wpct_rcpt_api_language');

        return $lang;
    }
}
