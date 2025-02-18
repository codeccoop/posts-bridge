<?php

namespace POSTS_BRIDGE;

use WP_Error;

if (!defined('ABSPATH')) {
    exit();
}

class Google_Sheets_Post_Bridge extends Post_Bridge
{
    private $rows = [];

    public function __get($name)
    {
        switch ($name) {
            case 'backend':
                return null;
            case 'endpoint':
                return null;
            default:
                return parent::__get($name);
        }
    }

    public function fetch($foreign_id)
    {
        $foreign_ids = $this->foreign_ids();
        if (!in_array($foreign_id, $foreign_ids)) {
            // return null;
            return new WP_Error(
                'gs_row_not_found',
                __('Foreign ID not found on the spreadsheet', 'posts-bridge'),
                [
                    'foreign_id' => $foreign_id,
                    'spreadsheet' => $this->spreadsheet,
                    'tab' => $this->tab,
                ]
            );
        }

        foreach ($this->rows as $row) {
            if ($row[$this->foreign_key] === $foreign_id) {
                return $row;
            }
        }
    }

    public function foreign_ids()
    {
        if (empty($this->rows)) {
            $this->rows = Google_Sheets_Service::read_rows(
                $this->spreadsheet,
                $this->tab,
                array_values($this->remote_fields())
            );
        }

        if (is_wp_error($this->rows)) {
            return [];
        }

        return array_filter(
            array_map(function ($row) {
                return $row[$this->foreign_key] ?? null;
            }, $this->rows)
        );
    }
}
