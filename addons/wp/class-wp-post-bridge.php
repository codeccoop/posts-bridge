<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

class WP_Post_Bridge extends Post_Bridge
{
    public function __get($name)
    {
        switch ($name) {
            case 'foreign_key':
                return 'id';
            case 'endpoint':
                return $this->endpoint();
            default:
                return parent::__get($name);
        }
    }

    private function endpoint($foreign_id = null)
    {
        $post_type = get_post_type_object($this->post_type);
        $rest_base = $post_type->rest_base ?? $post_type;

        $endpoint = '/wp-json/wp/v2/' . $rest_base;

        if ($foreign_id) {
            $endpoint .= '/' . $foreign_id;
        }

        return $endpoint;
    }

    public function do_fetch($foreign_id)
    {
        $endpoint = $this->endpoint($foreign_id);
        $res = $this->backend->get(
            $endpoint,
            [
                'context' => 'edit',
            ],
            [
                'Authorization' => $this->authorization(),
                'Accept' => 'application/json',
            ]
        );

        if (is_wp_error($res)) {
            return $res;
        }

        return $this->remote_data($res['data']);
    }

    public function foreign_ids()
    {
        return $this->get_paged();
    }

    private function get_paged($page = 1)
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

        return array_map(function ($post) {
            return (new JSON_Finger($post))->get($this->foreign_key);
        }, (array) $posts);
    }

    private function remote_data($data)
    {
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
            $res = http_bridge_get($attachment['href']);
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
            $res = http_bridge_get(
                $data['_links']['wp:featuredmedia'][0]['href']
            );
            if (!is_wp_error($res)) {
                $attachment = $res['data'];
                $data['featured_media'] = $attachment['source_url'];
            }
        }

        $taxonomies = $data['_links']['wp:term'] ?? [];
        foreach ($taxonomies as $tax) {
            if (!in_array($tax['taxonomy'], ['category', 'post_tag'])) {
                continue;
            }

            if ($tax['taxonomy'] === 'category' && empty($data['categories'])) {
                continue;
            }

            if ($tax['taxonomy'] === 'post_tag' && empty($data['tags'])) {
                continue;
            }

            $field = $tax['taxonomy'] === 'post_tag' ? 'tags' : 'categories';
            $pk = $tax['taxonomy'] === 'post_tag' ? 'name' : 'term_id';

            $res = http_bridge_get($tax['href']);
            if (is_wp_error($res)) {
                continue;
            }

            $terms = $res['data'];
            foreach ($terms as $term) {
                $ids = [];
                foreach ($data[$field] as $term_id) {
                    if ((int) $term_id === (int) $term['id']) {
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

    private function authorization()
    {
        $credentials = Posts_Bridge::setting('wp-api')->credentials;
        return 'Basic ' .
            base64_encode(
                "{$credentials['username']}:{$credentials['password']}"
            );
    }
}
