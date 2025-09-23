<?php

namespace POSTS_BRIDGE;

use HTTP_BRIDGE\Http_Client;
use WP_Error;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Post bridge implamentation for the REST API protocol.
 */
class Rest_Post_Bridge extends Post_Bridge
{
    /**
     * Handles the post bridge's template class.
     *
     * @var string
     */
    protected static $template_class = '\POSTS_BRIDGE\Rest_Post_Bridge_Template';

    /**
     * Intherit from parent and adds custom endpoint getter.
     *
     * @param string $name Attribute name.
     *
     * @return mixed Attribute value or null.
     */
    public function __get($name)
    {
        switch ($name) {
            case 'endpoint':
                return $this->endpoint();
            default:
                return parent::__get($name);
        }
    }

    /**
     * Relation's endpoint getter.
     *
     * @return string Endpoint path.
     */
    private function endpoint($foreign_id = null)
    {
        $endpoint = $this->data['endpoint'] ?? '';
        $parsed = wp_parse_url($endpoint);

        $endpoint = $parsed['path'] ?? '';

        if ($foreign_id) {
            $endpoint .= '/' . $foreign_id;
        }

        if (isset($parsed['query'])) {
            $endpoint .= '?' . $parsed['query'];
        }

        return apply_filters(
            'posts_bridge_rest_endpoint',
            $endpoint,
            $foreign_id,
            $this
        );
    }

    /**
     * Retrives the bridge's remote key values.
     *
     * @return array List of foreign ids.
     */
    public function foreign_ids()
    {
        $endpoint = $this->endpoint();
        $backend = $this->backend();

        $response = $backend->get($endpoint);

        if (is_wp_error($response)) {
            return $response;
        }

        if (empty($response['data'])) {
            $content_type =
                Http_Client::get_content_type($response['headers']) ??
                'undefined';

            return new WP_Error(
                'unkown_content_type',
                /* translators: %s: Content-Type header value */
                sprintf(
                    __('Unkown HTTP response content type %s', 'posts-bridge'),
                    sanitize_text_field($content_type)
                ),
                $response
            );
        }

        if (!is_array($response['data'])) {
            return new WP_Error(
                'not_iterable_response',
                __('HTTP response data is not iterable', 'posts-bridge'),
                $response['data']
            );
        }

        return array_map(function ($resource) {
            return (new JSON_Finger($resource))->get($this->foreign_key);
        }, (array) $response['data']);
    }

    public function do_fetch($foreign_id)
    {
        $endpoint = $this->endpoint($foreign_id);
        $response = $this->backend()->get($endpoint);

        if (is_wp_error($response)) {
            return $response;
        }

        if (empty($response['data'])) {
            $content_type =
                Http_Client::get_content_type($response['headers']) ??
                'undefined';

            return new WP_Error(
                'unkown_content_type',
                /* translators: %s: Content-Type header value */
                sprintf(
                    __('Unkown HTTP response content type %s', 'posts-bridge'),
                    sanitize_text_field($content_type)
                ),
                $response
            );
        }

        return $response['data'];
    }
}
