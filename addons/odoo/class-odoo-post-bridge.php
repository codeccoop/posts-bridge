<?php

namespace POSTS_BRIDGE;

use HTTP_BRIDGE\Http_Client;
use WP_Error;

if (!defined('ABSPATH')) {
    exit();
}

class Odoo_Post_Bridge extends Post_Bridge
{
    /**
     * Handles the Odoo JSON-RPC well known endpoint.
     *
     * @var string
     */
    private const endpoint = '/jsonrpc';

    /**
     * Handle active rpc session data.
     *
     * @var array Tuple with session and user ids.
     */
    private static $session;

    private static $request;

    /**
     * RPC payload decorator.
     *
     * @param int $session_id RPC session ID.
     * @param string $service RPC service name.
     * @param string $method RPC method name.
     * @param array $args RPC request arguments.
     * @param array $more_args RPC additional arguments.
     *
     * @return array JSON-RPC conformant payload.
     */
    private static function rpc_payload(
        $session_id,
        $service,
        $method,
        $args,
        $more_args = []
    ) {
        if (!empty($more_args)) {
            $args[] = $more_args;
        }

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

    /**
     * Handle RPC responses and catch errors on the application layer.
     *
     * @param array $response Request response.
     * @param boolean $is_single Should the result be an entity or an array.
     *
     * @return mixed|WP_Error Request result.
     */
    private static function rpc_response($res)
    {
        if (is_wp_error($res)) {
            return $res;
        }

        if (empty($res['data'])) {
            $content_type =
                Http_Client::get_content_type($res['headers']) ?? 'undefined';

            return new WP_Error(
                'unkown_content_type',
                /* translators: %s: Content-Type header value */
                sprintf(
                    __('Unkown HTTP response content type %s', 'posts-bridge'),
                    sanitize_text_field($content_type)
                ),
                $res
            );
        }

        if (isset($res['data']['error'])) {
            $error = new WP_Error(
                'response_code_' . $res['data']['error']['code'],
                $res['data']['error']['message'],
                $res['data']['error']['data']
            );

            $error_data = ['response' => $res];
            if (self::$request) {
                $error_data['request'] = self::$request;
            }

            $error->add_data($error_data);
            return $error;
        }

        $data = $res['data'];

        if (empty($data['result'])) {
            $error = new WP_Error('not_found');

            $error_data = ['response' => $res];
            if (self::$request) {
                $error_data['request'] = self::$request;
            }

            $error->add_data($error_data);
            return $error;
        }

        return $data['result'];
    }

    /**
     * JSON RPC login request.
     *
     * @param Odoo_DB $db Bridge's database instance.
     *
     * @return array|WP_Error Tuple with RPC session id and user id.
     */
    private static function rpc_login($login, $backend)
    {
        if (self::$session) {
            return self::$session;
        }

        $session_id = 'posts-bridge-' . time();

        $payload = self::rpc_payload($session_id, 'common', 'login', $login);

        $response = $backend->post(self::endpoint, $payload);

        $user_id = self::rpc_response($response);

        if (is_wp_error($user_id)) {
            return $user_id;
        }

        self::$session = [$session_id, $user_id];
        return self::$session;
    }

    public function __construct($data)
    {
        parent::__construct($data, 'odoo');

        if ($this->is_valid && isset($data['method'])) {
            $this->data['method'] = $data['method'];
        }
    }

    /**
     * Fetches remote data for a given foreign id.
     *
     * @param int|string $foreign_id Foreig key value.
     *
     * @return array|WP_Error Remote data for the given id.
     */
    public function fetch($foreign_id = null, $params = [], $headers = [])
    {
        if (!$this->is_valid) {
            return new WP_Error('invalid_bridge');
        }

        $backend = $this->backend();

        if (!$backend) {
            return new WP_Error(
                'invalid_backend',
                'The bridge does not have a valid backend'
            );
        }

        $credential = $backend->credential;
        if (!$credential) {
            return new WP_Error(
                'invalid_credential',
                'The bridge does not have a valid credential'
            );
        }

        add_filter(
            'http_bridge_request',
            static function ($request) {
                self::$request = $request;
                return $request;
            },
            10,
            1
        );

        $login = $credential->authorization();
        $session = self::rpc_login($login, $backend);

        if (is_wp_error($session)) {
            return $session;
        }

        [$sid, $uid] = $session;
        $login[1] = $uid;

        $fields = [];
        $foreigns = array_keys($this->remote_fields());
        foreach ($foreigns as $foreign) {
            $fields[] = preg_replace('/(\[|\.).*$/', '', $foreign);
        }

        $args = array_merge($login, [$this->endpoint, $this->method]);
        $args[] = array_filter([(int) $foreign_id]);

        $payload = self::rpc_payload($sid, 'object', 'execute', $args, $fields);

        $response = $backend->post(self::endpoint, $payload);

        $result = self::rpc_response($response);
        if (is_wp_error($result)) {
            return $result;
        }

        if ($this->method === 'read') {
            $response['data'] = $response['data']['result'][0];
        }

        return $response;
    }

    public function foreign_ids()
    {
        $bridge = $this->patch([
            'name' => '__odoo-search',
            'method' => 'search',
            'mappers' => [],
        ]);

        $response = $bridge->fetch();
        return $response['data']['result'];
    }
}
