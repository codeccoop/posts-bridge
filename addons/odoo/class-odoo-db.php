<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Odoo addon database
 */
class Odoo_DB
{
    /**
     * Handles database settings data.
     *
     * @var array|null
     */
    private $data = null;

    /**
     * Class constructor. Binds setting data to the instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Proxies class attributes to the database settings data.
     *
     * @param string $name Attribute name.
     *
     * @return mixed Attribute value.
     */
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

    /**
     * Database's backend instance getter.
     *
     * @return Http_Backend Http Backend instance.
     */
    private function backend()
    {
        return apply_filters(
            'http_bridge_backend',
            null,
            $this->data['backend']
        );
    }

    /**
     * Database's relation instances getter.
     *
     * @return Remote_Relation Remote relation sinstance.
     */
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
