<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

class WP_Remote_Relation extends Remote_Relation
{
    /**
     * Public remote relations getter.
     *
     * @return array Remote relation instances.
     */
    public static function relations()
    {
        $relations = apply_filters('posts_bridge_setting', null, 'wp-api')
            ->relations;
        return array_map(function ($rel) {
            return new WP_Remote_Relation($rel);
        }, $relations);
    }

    public function __construct($data)
    {
        parent::__construct(
            array_merge($data, [
                'foreign_key' => 'id',
            ])
        );
        $this->api = 'wp';
    }

    public function __get($name)
    {
        switch ($name) {
            case 'endpoint':
                $value = $this->endpoint();
                break;
            default:
                return parent::__get($name);
        }

        return apply_filters("posts_bridge_relation_{$name}", $value, $this);
    }

    private function endpoint($foreign_id = null)
    {
        $post_type = $this->post_type;
        if ($post_type === 'post') {
            $post_type = 'posts';
        } elseif ($post_type === 'page') {
            $post_type = 'pages';
        }

        $endpoint = '/wp-json/wp/v2/' . $post_type;

        if ($foreign_id) {
            $endpoint .= '/' . $foreign_id;
        }

        return $endpoint;
    }

    public function fetch($foreign_id)
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

        foreach ($data['_links']['wp:attachments'] as $attachment) {
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

        foreach ($data['_links']['wp:term'] as $tax) {
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
        $credentials = apply_filters('posts_bridge_setting', null, 'wp-api')
            ->credentials;
        return 'Basic ' .
            base64_encode(
                "{$credentials['username']}:{$credentials['password']}"
            );
    }
}
