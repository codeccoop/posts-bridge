<?php

namespace POSTS_BRIDGE;

use WP_Error;

if (!defined('ABSPATH')) {
    exit();
}

class Google_Sheets_Post_Bridge extends Post_Bridge
{
    /**
     * Handles spreadhseet rows data in memory.
     *
     * @var array
     */
    private $rows = [];

    /**
     * Handles the post bridge's template class.
     *
     * @var string
     */
    protected static $template_class = '\POSTS_BRIDGE\Rest_Post_Bridge_Template';

    /**
     * Fetches remote data for a given foreign id.
     *
     * @param int|string $foreign_id Foreig key value.
     *
     * @return array|WP_Error Remote data for the given id.
     */
    public function do_fetch($foreign_id)
    {
        $foreign_ids = $this->foreign_ids();
        if (!in_array($foreign_id, $foreign_ids)) {
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

    /**
     * Retrives the bridge's remote key values.
     *
     * @return array List of foreign ids.
     */
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
