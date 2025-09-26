<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-odoo-post-bridge.php';
require_once 'hooks.php';

/**
 * Odoo Addon class.
 */
class Odoo_Addon extends Addon
{
    /**
     * Handles the addon name.
     *
     * @var string
     */
    public const title = 'Odoo';

    /**
     * Handles the addon's API name.
     *
     * @var string
     */
    public const name = 'odoo';

    /**
     * Handles the addom's custom relation class.
     *
     * @var string
     */
    public const bridge_class = '\POSTS_BRIDGE\Odoo_Post_Bridge';

    /**
     * Performs a request against the backend to check the connexion status.
     *
     * @param string $backend Target backend name.
     *
     * @return boolean
     */
    public function ping($backend)
    {
        $bridge = new Odoo_Post_Bridge([
            'post_type' => '_',
            'foreign_key' => 'id',
            'method' => 'search',
            'endpoint' => 'res.users',
            'backend' => $backend,
        ]);

        $response = $bridge->fetch();
        return !is_wp_error($response);
    }

    /**
     * Performs a GET request against the backend model and retrive the response data.
     *
     * @param string $endpoint Target model name.
     * @param string $backend Target backend name.
     *
     * @return array|WP_Error
     */
    public function fetch($endpoint, $backend)
    {
        $bridge = new Odoo_Post_Bridge([
            'post_type' => '_',
            'method' => 'search_read',
            'endpoint' => $endpoint,
            'backend' => $backend,
        ]);

        return $bridge->fetch([], ['id', 'name']);
    }

    /**
     * Performs an introspection of the backend model and returns API fields
     * and accepted content type.
     *
     * @param string $model Target model name.
     * @param string $backend Target backend name.
     *
     * @return array List of fields and content type of the model.
     */
    public function get_endpoint_schema($model, $backend)
    {
        $bridge = new Odoo_Post_Bridge([
            'post_type' => '_',
            'foreign_key' => 'id',
            'method' => 'fields_get',
            'endpoint' => $model,
            'backend' => $backend,
        ]);

        $response = $bridge->fetch();

        if (is_wp_error($response)) {
            return [];
        }

        $fields = [];
        foreach ($response['data']['result'] as $name => $spec) {
            if ($spec['readonly']) {
                continue;
            }

            if ($spec['type'] === 'char' || $spec['type'] === 'html') {
                $schema = ['type' => 'string'];
            } elseif ($spec['type'] === 'float') {
                $schema = ['type' => 'number'];
            } elseif (
                in_array(
                    $spec['type'],
                    ['one2many', 'many2one', 'many2many'],
                    true
                )
            ) {
                $schema = [
                    'type' => 'array',
                    'items' => [['type' => 'integer'], ['type' => 'string']],
                    'additionalItems' => false,
                ];
            } else {
                $schema = ['type' => $spec['type']];
            }

            $schema['required'] = $spec['required'];

            $fields[] = [
                'name' => $name,
                'schema' => $schema,
            ];
        }

        return $fields;
    }
}

Odoo_Addon::setup();
