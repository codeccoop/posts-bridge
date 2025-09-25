<?php

namespace POSTS_BRIDGE;

use WP_Error;

if (!defined('ABSPATH')) {
    exit();
}

class GSheets_Post_Bridge extends Post_Bridge
{
    /**
     * Handles spreadhseet rows data in memory.
     *
     * @var array
     */
    private static $rows = [];

    private function value_range($values)
    {
        $range = rawurlencode($this->tab);

        if (empty($values)) {
            return $range;
        }

        $abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        $len = strlen($abc);

        $columns = [];
        for ($row = 0; $row < count($values); $row++) {
            $rowcols = [];
            $i = -1;

            for ($col = 0; $col < count($values[$row]); $col++) {
                if ($col > 0 && $col % $len === 0) {
                    $i++;
                }

                if ($col >= $len) {
                    $index = $col % $len;
                    $rowcols[] = $abc[$i] . $abc[$index];
                } else {
                    $rowcols[] = $abc[$col];
                }
            }

            if (count($rowcols) > count($columns)) {
                $columns = $rowcols;
            }
        }

        $range .= '!' . $columns[0] . '1';
        $range .= ':' . $columns[count($columns) - 1] . $row;

        return $range;
    }

    public function get_headers($backend = null)
    {
        if (!$this->is_valid) {
            return new WP_Error('invalid_bridge');
        }

        if (!$backend) {
            $backend = $this->backend;
        }

        $range = rawurlencode($this->tab) . '!1:1';

        $response = $backend->get($this->endpoint . '/values/' . $range);

        if (is_wp_error($response)) {
            return $response;
        }

        return $response['data']['values'][0] ?? [];
    }

    private function add_sheet($index, $title, $backend)
    {
        $response = $backend->post($this->endpoint . ':batchUpdate', [
            'requests' => [
                [
                    'addSheet' => [
                        'properties' => [
                            'sheetId' => time(),
                            'index' => $index,
                            'title' => $title,
                            'sheetType' => 'GRID',
                            'gridProperties' => [
                                'rowCount' => 1000,
                                'columnCount' => 26,
                            ],
                            'hidden' => false,
                        ],
                    ],
                ],
            ],
        ]);

        if (is_wp_error($response)) {
            return $response;
        }

        return $response['data'];
    }

    private function get_sheets($backend)
    {
        $response = $backend->get($this->endpoint);

        if (is_wp_error($response)) {
            return $response;
        }

        $sheets = [];
        foreach ($response['data']['sheets'] as $sheet) {
            $sheets[] = strtolower($sheet['properties']['title']);
        }

        return $sheets;
    }

    public function fetch($foreign_id = null, $params = [], $headers = [])
    {
        if (!$this->is_valid) {
            return new WP_Error('invalid_bridge');
        }

        $rows = $this->get_rows();
        if (is_wp_error($rows)) {
            return $rows;
        }

        foreach ($rows as $row) {
            if ($row[$this->foreign_key] === $foreign_id) {
                return $row;
            }
        }

        return new WP_Error('not_found');
    }

    private function get_rows()
    {
        if (self::$rows) {
            return self::$rows;
        }

        $backend = $this->backend;

        $sheets = $this->get_sheets($backend);
        if (is_wp_error($sheets)) {
            return $sheets;
        }

        if (!in_array(strtolower($this->tab), $sheets, true)) {
            $result = $this->add_sheet(count($sheets), $this->tab, $backend);
            if (is_wp_error($result)) {
                return $result;
            }
        }

        $endpoint = $this->endpoint . '/values';

        $response = $this->backend->get($endpoint);
        if (is_wp_error($response)) {
            return $response;
        }

        self::$rows = $response['data'];
    }

    public function foreign_ids()
    {
        if (!$this->is_valid) {
            return new WP_Error('invalid_bridge');
        }

        $rows = $this->get_rows();
        if (is_wp_error($rows)) {
            return [];
        }

        $ids = [];
        foreach ($rows as $row) {
            if ($id = $row[$this->foreign_key] ?? null) {
                $ids[] = $id;
            }
        }

        return $ids;
    }
}
