<?php

namespace WPCT_RCPT;

use WPCT_HTTP\Http_Client as Wpct_Http_Client;
use Exception;
use WP_Error;

class ApiClient
{
    private $rcpt = null;

    private static function json_rpc($endpoint, $service, $method, $args)
    {
        $payload = [
            'jsonrpc' => '2.0',
            'method' => 'call',
            'params' => [
                'service' => $service,
                'method' => $method,
                'args' => $args
            ]
        ];

        $response = Wpct_Http_Client::post($endpoint, $payload);
        $data = (array) json_decode($response['body'], true);
        if (isset($data['error'])) {
            return new WP_Error(
                $data['error']['code'],
                $data['error']['message'],
                $data['error']['data'],
            );
        }

        return $data['result'];
    }

    private static function login($endpoint)
    {
        global $_wpct_rcpt_rpc_uid;
        if (!empty($_wpct_rcpt_rpc_uid)) {
            return $_wpct_rcpt_rpc_uid;
        }

        $opts = Settings::get_setting('wpct-rcpt', 'rpc-api');
        $_wpct_rcpt_rpc_uid = self::json_rpc($endpoint, 'common', 'login', [$opts['database'], $opts['user'], $opts['password']]);
        return $_wpct_rcpt_rpc_uid;
    }

    public static function search($endpoint, $model)
    {
        $uid = self::login($endpoint);
        if (is_wp_error($uid)) {
            return $uid;
        }

        $opts = Settings::get_setting('wpct-rcpt', 'rpc-api');
        return self::json_rpc($endpoint, 'object', 'execute', [$opts['database'], $uid, $opts['password'], $model, 'search', []]);
    }

    public static function read($endpoint, $model, $id)
    {
        $uid = self::login($endpoint);
        if (is_wp_error($uid)) {
            return $uid;
        }

        $opts = Settings::get_setting('wpct-rcpt', 'rpc-api');
        $result = self::json_rpc($endpoint, 'object', 'execute', [$opts['database'], $uid, $opts['password'], $model, 'read', [$id]]);
        if (is_wp_error($result)) {
            return $result;
        }

        return $result[0];
    }

    public static function fetch($endpoint)
    {
        $response = Wpct_Http_Client::get($endpoint);
        if (is_wp_error($response)) {
            return $response;
        }

        $data = (array) json_decode($response['body'], true);
        return apply_filters('wpct_rcpt_rest_models', $data, $endpoint);
    }

    public function __construct($rcpt)
    {
        $this->rcpt = $rcpt;
    }

    public function get_data($locale = null)
    {
        $rel = $this->rcpt->relation();
        $endpoint = $this->rcpt->endpoint();

        if ($locale) {
            add_option('wpct_rcpt_api_language', $locale);
            add_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99);
        }

        if ($rel['type'] === 'rest') {
            $response = Wpct_Http_Client::get($endpoint);
        } else {
            $response = self::read($endpoint, $rel['model'], $this->rcpt->remote_id);
        }
        if (is_wp_error($response)) {
            throw new Exception('Unable to connect to the remote API', 500);
        }

        $data = (array) json_decode($response['body'], true);
        return $data;
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
