<?php

namespace POSTS_BRIDGE;

use WP_Error;

if (!defined('ABSPATH')) {
    exit();
}

class WP_Post_Bridge extends Post_Bridge
{
    public function __construct($data)
    {
        parent::__construct($data, 'wp');
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

    /**
     * Fetches remote data for a given foreign id.
     *
     * @param int|string|null $foreign_id Foreig key value.
     * @param array $params Request query params.
     * @param array $headers Request headers.
     *
     * @return array|WP_Error
     */
    public function fetch($foreign_id = null, $params = [], $headers = [])
    {
        if (!$this->is_valid) {
            return new WP_Error('invalid_bridge');
        }

        if ($foreign_id) {
            $params = ['context' => 'edit'];
        }

        $response = parent::fetch($foreign_id, $params, $headers);

        if (is_wp_error($response)) {
            return $response;
        }

        if ($foreign_id) {
            $response['data'] = $this->remote_data($response['data']);
        }

        return $response;
    }

    public function foreign_ids()
    {
        $posts = $this->get_paged_ids();

        $ids = [];
        foreach ($posts as $post_data) {
            $ids[] = $post_data['id'];
        }

        return $ids;
    }

    private function get_paged_ids($page = 1)
    {
        $pages = 1e10;
        $endpoint = $this->endpoint();
        $backend = $this->backend;

        $posts = [];
        while ($page <= $pages) {
            $res = $backend->get(
                $endpoint,
                [
                    'context' => 'embed',
                    '_fields' => 'id',
                    'per_page' => '100',
                    'page' => $page,
                ],
                [
                    'Accept' => 'application/json',
                ]
            );

            if (is_wp_error($res) || empty($res['data'])) {
                break;
            }

            $posts = array_merge($posts, (array) $res['data']);
            $pages = (int) $res['headers']['x-wp-totalpages'];
            $page += 1;
        }

        return $posts;
    }

    private function remote_data($data)
    {
        $backend = $this->backend();

        unset($data['id']);
        unset($data['guid']);
        unset($data['author']);

        $aliases = ['date_gmt', 'modified', 'modified_gmt', 'password'];
        foreach ($aliases as $alias) {
            $data['post_' . $alias] = $data[$alias];
            unset($data[$alias]);
        }

        $attachments = $data['_links']['wp:attachments'] ?? [];
        foreach ($attachments as $attachment) {
            $res = $backend->get($attachment['href']);
            $attachments = $res['data'];

            foreach ($attachments as $attachment) {
                $attachment_id = Remote_Featured_Media::handle(
                    $attachment['source_url']
                );

                $url = wp_get_attachment_url($attachment_id);
                $data['post_content'] = str_replace(
                    $attachment['source_url'],
                    $url,
                    $data['post_content']
                );
            }
        }

        if (isset($data['_links']['wp:featuredmedia'][0]['href'])) {
            $res = $backend->get(
                $data['_links']['wp:featuredmedia'][0]['href']
            );
            if (!is_wp_error($res)) {
                $attachment = $res['data'];
                $data['featured_media'] = $attachment['source_url'];
            }
        }

        $taxonomies = $data['_links']['wp:term'] ?? [];
        $known_taxonomies = array_keys(get_taxonomies());

        foreach ($taxonomies as $tax) {
            if (!in_array($tax['taxonomy'], $known_taxonomies)) {
                continue;
            }

            if ($tax['taxonomy'] === 'category') {
                if (empty($data['categories'])) {
                    continue;
                }
            } elseif ($tax['taxonomy'] === 'post_tag') {
                if (empty($data['tags'])) {
                    continue;
                }
            } elseif (empty($data[$tax['taxonomy']])) {
                continue;
            }

            $field =
                $tax['taxonomy'] === 'post_tag'
                    ? 'tags'
                    : ($tax['taxonomy'] === 'category'
                        ? 'categories'
                        : $tax['taxonomy']);

            $pk = $tax['taxonomy'] === 'post_tag' ? 'name' : 'term_id';

            $res = $backend->get($tax['href']);
            if (is_wp_error($res)) {
                continue;
            }

            $terms = $res['data'];
            foreach ($terms as $term) {
                $ids = [];
                foreach ($data[$field] as $term_id) {
                    if ($term_id == $term['id']) {
                        $wp_terms = get_terms([
                            'taxonomy' => $tax['taxonomy'],
                            'hide_empty' => false,
                        ]);

                        $exists = false;
                        foreach ($wp_terms as $wp_term) {
                            if ($wp_term->name === $term['name']) {
                                $exists = true;
                                break;
                            }
                        }

                        if (!$exists) {
                            $term = wp_insert_term(
                                $term['name'],
                                $tax['taxonomy']
                            );

                            if (!is_wp_error($term)) {
                                $ids[] = $term[$pk];
                            }
                        } else {
                            $ids[] = $wp_term->$pk;
                        }
                    }
                }

                $data[$field] = $ids;
            }
        }

        return $data;
    }
}
