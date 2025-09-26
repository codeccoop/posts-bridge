<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

class Dolibarr_Post_Bridge extends Post_Bridge
{
    public function __construct($data)
    {
        parent::__construct($data, 'dolibarr');
    }

    public function __get($name)
    {
        switch ($name) {
            case 'foreign_key':
                return 'id';
            default:
                return parent::__get($name);
        }
    }

    public function foreign_ids()
    {
        $response = $this->fetch(null, ['properties' => 'id']);

        if (is_wp_error($response)) {
            return [];
        }

        $ids = [];
        foreach ($response['data'] as $item_data) {
            $ids[] = $item_data['id'];
        }

        return $ids;
    }
}
