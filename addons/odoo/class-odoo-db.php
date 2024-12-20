<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

class Odoo_DB
{
    private $data = null;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function __get($name)
    {
        switch ($name) {
            case 'backend':
                return $this->backend();
            case 'relations':
                return $this->relations();
            default:
                return isset($this->data[$name]) ? $this->data[$name] : null;
        }
    }

    private function backend()
    {
        return apply_filters(
            'http_bridge_backend',
            null,
            $this->data['backend']
        );
    }

    private function relations()
    {
        $relations = apply_filter('posts_bridge_relations', [], 'odoo-api');
        return array_values(
            array_filter($relations, function ($rel) {
                return $rel->api === 'odoo' &&
                    $rel->database === $this->data['name'];
            })
        );
    }
}
