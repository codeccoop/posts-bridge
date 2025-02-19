<?php

namespace POSTS_BRIDGE;

use WP_Error;

if (!defined('ABSPATH')) {
    exit();
}

class Odoo_Post_Bridge extends Post_Bridge
{
    /**
     * Handle active rpc session data.
     *
     * @var array $session Tuple with session and user id.
     */
    private static $session;

    /**
     * RPC payload decorator.
     *
     * @param int $session_id RPC session ID.
     * @param string $service RPC service name.
     * @param string $method RPC method name.
     * @param array $args RPC request arguments.
     *
     * @return array JSON-RPC conformant payload.
     */
    private static function rpc_payload($session_id, $service, $method, $args)
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

    /**
     * Handle RPC responses and catch errors on the application layer.
     *
     * @param array $response Request response.
     * @param boolean $is_single Should the result be an entity or an array.
     *
     * @return mixed|WP_Error Request result.
     */
    private static function rpc_response($res, $single = false)
    {
        if (is_wp_error($res)) {
            return $res;
        }

        if (isset($res['data']['error'])) {
            return new WP_Error(
                $res['data']['error']['code'],
                $res['data']['error']['message'],
                $res['data']['error']['data']
            );
        }

        $data = $res['data'];

        if (empty($data['result'])) {
            return new WP_Error(
                'rpc_api_error',
                'An unkown error has ocurred with the RPC API',
                ['response' => $res]
            );
        }

        if ($single) {
            return $data['result'][0];
        }

        return $data['result'];
    }

    /**
     * JSON RPC login request.
     *
     * @param Odoo_DB $db Current db instance.
     * @param string $ednpoint JSON-RPC API endpoint.
     *
     * @return array Tuple with RPC session id and user id.
     */
    private static function rpc_login($relation)
    {
        if (self::$session) {
            return self::$session;
        }

        $session_id = Posts_Bridge::slug() . '-' . time();
        $db = $relation->database;
        $backend = $db->backend;

        $payload = self::rpc_payload($session_id, 'common', 'login', [
            $db->name,
            $db->user,
            $db->password,
        ]);

        $user_id = self::rpc_response(
            $backend->post($relation->endpoint, $payload)
        );

        if (is_wp_error($user_id)) {
            return $user_id;
        }

        self::$session = [$session_id, $user_id];
        return self::$session;
    }

    public function __construct($data, $api)
    {
        parent::__construct(
            array_merge($data, [
                'foreign_key' => 'id',
                'endpoint' => '/jsonrpc',
            ]),
            $api
        );
    }

    public function __get($name)
    {
        switch ($name) {
            case 'database':
                return $this->database();
            case 'backend':
                return $this->backend();
            default:
                return parent::__get($name);
        }
    }

    private function database()
    {
        return apply_filters(
            'posts_bridge_odoo_db',
            null,
            $this->data['database']
        );
    }

    protected function backend()
    {
        return $this->database()->backend;
    }

    public function do_fetch($foreign_id)
    {
        $session = self::rpc_login($this);

        if (is_wp_error($session)) {
            return $session;
        }

        [$sid, $uid] = $session;

        $database = $this->database();
        $payload = self::rpc_payload($sid, 'object', 'execute', [
            $database->name,
            $uid,
            $database->password,
            $this->model,
            'read',
            [(int) $foreign_id],
        ]);

        $response = $this->backend->post($this->endpoint, $payload);

        $result = self::rpc_response($response, true);
        if (is_wp_error($result)) {
            return $result;
        }

        return $response;
    }

    public function foreign_ids()
    {
        $session = self::rpc_login($this);

        if (is_wp_error($session)) {
            return [];
        }

        [$sid, $uid] = $session;

        $database = $this->database();
        $payload = self::rpc_payload($sid, 'object', 'execute', [
            $database->name,
            $uid,
            $database->password,
            $this->model,
            'search',
            [],
        ]);

        $response = $this->backend->post($this->endpoint, $payload);

        $result = self::rpc_response($response);
        if (is_wp_error($result)) {
            return [];
        }

        return $result;
    }
}
