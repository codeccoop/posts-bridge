<?php

namespace POSTS_BRIDGE;

use WP_Error;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Remote_CPT HTTP client.
 */
class HTTP_Client
{
    private static $rpc_session = null;

    /**
     * Handle instance of the owner Remote_CPT.
     *
     * @var Remote_CPT $rcpt Instance of the owner Remote_CPT.
     */
    private $rcpt;

    public static function rpc_response($response, $single = false)
    {
        if (is_wp_error($response)) {
            return $response;
        }

        $data = $response['data'];

        if (isset($data['error'])) {
            return new WP_Error(
                $data['error']['code'],
                $data['error']['message'],
                $data['error']['data']
            );
        }

        if (empty($data['result'])) {
            return new WP_Error(
                'rpc_api_error',
                'An unkown error has ocurred with the RPC API',
                ['response' => $response]
            );
        }

        if ($single) {
            return $data['result'][0];
        }

        return $data['result'];
    }

    public static function rpc_payload($session_id, $service, $method, $args)
    {
        return [
            'jsonrpc' => '2.0',
            'method' => 'call',
            'id' => $session_id,
            'params' => [
                'service' => $service,
                'method' => $method,
                'args' => $args,
            ],
        ];
    }

    public static function rpc_login($url, $headers = [])
    {
        $session_id = 'posts-bridge-' . time();
        if (!empty(static::$rpc_session)) {
            return static::$rpc_session;
        }

        $rpc = Settings::get_setting('posts-bridge', 'rpc-api');
        $payload = static::rpc_payload($session_id, 'common', 'login', [
            $rpc->database,
            $rpc->user,
            $rpc->password,
        ]);

        do_action('posts_bridge_before_rpc_login', $url, $payload, $headers);
        $res = http_bridge_post($url, $payload, $headers);
        do_action('posts_bridge_after_rpc_login', $res);

        $result = static::rpc_response($res);

        if (is_wp_error($result)) {
            return $result;
        }

        static::$rpc_session = [$session_id, $result];
        return static::$rpc_session;
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
    public function fetch($locale = null)
    {
        $rel = $this->rcpt->relation();

        // If locale is declared, intercept i18n hooks with this value.
        if ($locale) {
            add_option('posts_bridge_api_language', $locale);
            add_filter(
                'wpct_i18n_current_language',
                [$this, 'language_interceptor'],
                99
            );
        }

        if ($rel->proto() === 'rest') {
            return $this->rest_fetch();
        } else {
            return $this->rpc_fetch();
        }
    }

    private function rest_fetch()
    {
        $backend = $this->rcpt->relation()->backend();
        $endpoint = $this->rcpt->endpoint();

        do_action('posts_bridge_before_fetch', $this);
        $res = $backend->get($endpoint);
        do_action('posts_bridge_after_fetch', $res, $this);

        if (is_wp_error($res)) {
            return $res;
        }

        return $res['data'];
    }

    private function rpc_fetch()
    {
        $rpc = Settings::get_setting('posts-bridge', 'rpc-api');
        $rel = $this->rcpt->relation();
        $endpoint = $this->rcpt->endpoint();
        $backend = $rel->backend();

        $result = static::rpc_login(
            $backend->url($endpoint),
            $backend->headers()
        );

        if (is_wp_error($result)) {
            return $result;
        }

        [$sid, $uid] = $result;

        $payload = static::rpc_payload($sid, 'object', 'execute', [
            $rpc->database,
            $uid,
            $rpc->password,
            $rel->model(),
            'read',
            [(int) $this->rcpt->foreign_id()],
        ]);

        do_action('posts_bridge_before_fetch', $this);
        $res = $backend->post($endpoint, $payload);
        do_action('posts_bridge_after_fetch', $res, $this);

        return static::rpc_response($res, true);
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

        remove_filter(
            'wpct_i18n_current_language',
            [$this, 'language_interceptor'],
            99
        );
        delete_option('posts_bridge_api_language');

        return $lang;
    }
}
