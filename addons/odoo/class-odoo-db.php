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
                return $this->data[$name] ?? null;
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
        $relations = Odoo_Remote_Relation::relations();
        return array_values(
            array_filter($relations, function ($rel) {
                return $rel->database === $this->data['name'];
            })
        );
    }
}
