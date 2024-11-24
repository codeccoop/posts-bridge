<?php

namespace POSTS_BRIDGE;

use WP_Error;

use function HTTP_BRIDGE\http_bridge_post;
use function HTTP_BRIDGE\http_bridge_get;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Remote_CPT HTTP client.
 */
class HTTP_Client
{
    /**
     * Handle instance of the owner Remote_CPT.
     *
     * @var Remote_CPT $rcpt Instance of the owner Remote_CPT.
     */
    private $rcpt;

    /**
     * Performs a RPC call.
     *
     * @param string $endpoint RPC API gateway endpoint.
     * @param array $args RPC call target service.
     * @param array $args RPC call method.
     * @param array $args RPC call arguments.
     * @param array $headers HTTP headers.
     *
     * @return array|WP_Error RPC call result or WP_Error.
     */
    private static function json_rpc($endpoint, $service, $method, $args, $headers = [])
    {
        $payload = [
            'jsonrpc' => '2.0',
            'method' => 'call',
            'params' => [
                'service' => $service,
                'method' => $method,
                'args' => $args,
            ]
        ];

        $response = http_bridge_post($endpoint, ['data' => $payload, 'headers' => $headers]);
        if (is_wp_error($response)) {
            return $response;
        }

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

    /**
     * Performs a RPC loginc call.
     *
     * @param string $endpoint RPC API gateway endpoint.
     * @param array $headers HTTP headers.
     *
     * @return array|WP_Error RPC login call result or WP_Error.
     */
    private static function login($endpoint, $headers)
    {
        global $_posts_bridge_rpc_uid;
        if (!empty($_posts_bridge_rpc_uid)) {
            return $_posts_bridge_rpc_uid;
        }

        $opts = Settings::get_setting('posts-bridge', 'rpc-api');
        $_posts_bridge_rpc_uid = self::json_rpc(
            $endpoint,
            'common',
            'login',
            [$opts['database'], $opts['user'], $opts['password']],
            $headers,
        );

        return $_posts_bridge_rpc_uid;
    }

    /**
     * Performs a RPC search call.
     *
     * @param string $endpoint RPC API gateway endpoint.
     * @param string $model Target model to search for.
     * @param array $headers HTTP headers.
     *
     * @return array<int>|WP_Error Collection of the backend models ids.
     */
    public static function search($endpoint, $model, $headers = [])
    {
        $uid = self::login($endpoint, $headers);
        if (is_wp_error($uid)) {
            return $uid;
        }

        $opts = Settings::get_setting('posts-bridge', 'rpc-api');
        return self::json_rpc(
            $endpoint,
            'object',
            'execute',
            [$opts['database'], $uid, $opts['password'], $model, 'search', []],
            $headers,
        );
    }

    /**
     * Performs a RPC read call.
     *
     * @param string $endpoint RPC API gateway endpoint.
     * @param string $model Target model to search for.
     * @param string|int $id Target model ID.
     * @param array $headers HTTP headers.
     *
     * @return array|WP_Error Target model data.
     */
    public static function read($endpoint, $model, $id, $headers = [])
    {
        $uid = self::login($endpoint, $headers);
        if (is_wp_error($uid)) {
            return $uid;
        }

        $opts = Settings::get_setting('posts-bridge', 'rpc-api');
        $data = self::json_rpc(
            $endpoint,
            'object',
            'execute',
            [$opts['database'], $uid, $opts['password'], $model, 'read', [(int) $id]],
            $headers,
        );

        if (is_wp_error($data)) {
            return $data;
        }

        return $data[0];
    }

    /**
     * Performs HTTP GET requests.
     *
     * @param string $url Target URL.
     * @param array<string, string> $headers HTTP headers.
     *
     * @return array|WP_Error Request response.
     */
    public static function fetch($url, $headers = [])
    {
        $response = http_bridge_get($url, ['headers' => $headers]);
        if (is_wp_error($response)) {
            return $response;
        }

        return (array) json_decode($response['body'], true);
    }


    /**
     * Binds owner Remote_CPT instance and construct the client.
     */
    public function __construct($rcpt)
    {
        $this->rcpt = $rcpt;
    }

    /**
     * Fetches the post remote data.
     *
     * @param string|null $locale Language of the API requests.
     *
     * @return array|WP_Error Remote_CPT data or WP_Error.
     */
    public function get_data($locale = null)
    {
        $rel = $this->rcpt->get_relation();
        $endpoint = $this->rcpt->get_endpoint();
        $backend = $rel->get_backend();

        $url = $backend->get_endpoint_url($endpoint);
        $headers = $backend->get_headers();

        // If locale is declared, intercept i18n hooks with this value.
        if ($locale) {
            add_option('posts_bridge_api_language', $locale);
            add_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99);
        }

        if ($rel->get_proto() === 'rest') {
            $response = http_bridge_get($url, ['headers' => $headers]);
            if (is_wp_error($response)) {
                return $response;
            }

            $data = (array) json_decode($response['body'], true);
        } else {
            $data = self::read($url, $rel->get_model(), $this->rcpt->get_foreign_id(), $headers);
        }

        return $data;
    }

    /**
     * I18n current language interceptor.
     *
     * @param string $lang API language locale.
     */
    public function language_interceptor($lang)
    {
        $api_lang = get_option('posts_bridge_api_language');
        if ($api_lang) {
            $lang = $api_lang;
        }

        remove_filter('wpct_i18n_current_language', [$this, 'language_interceptor'], 99);
        delete_option('posts_bridge_api_language');

        return $lang;
    }
}

/**
 * Handle RPC session id.
 */
$_posts_bridge_rpc_uid = null;
