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
                $value = parent::__get($name);
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
        $res = $this->backend->get($endpoint);
        if (is_wp_error($res)) {
            return $res;
        }

        return $this->remote_data($res['data']);
    }

    public function foreign_ids()
    {
        return $this->get_pages();
    }

    private function get_pages($page = 1)
    {
        $pages = 1e10;
        $endpoint = $this->endpoint();
        $backend = $this->backend;

        // $endpoint .= '?context=embed&_fields=id&per_page=100&page=' . $page;

        $posts = [];
        while ($page <= $pages) {
            $res = $backend->get($endpoint, [
                'context' => 'embed',
                '_fields' => 'id',
                'per_page' => '100',
                'page' => $page,
            ]);

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

        $data['content'] = $data['content']['rendered'];
        $data['excerpt'] = $data['excerpt']['rendered'];
        $data['title'] = $data['title']['rendered'];

        foreach ($data['_links']['wp:attachments'] as $attachment) {
            $res = http_bridge_get($attachment['href']);
            $attachments = json_decode($res['body'], true);

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

        $res = http_bridge_get($data['_links']['wp:featuredmedia'][0]['href']);
        if (!is_wp_error($res)) {
            $attachment = json_decode($res['body'], true);
            $data['featured_media'] = $attachment['source_url'];
        }

        foreach ($data['_links']['wp:term'] as $tax) {
            if ($tax['taxonomy'] === 'category' && empty($data['categories'])) {
                continue;
            }

            if ($tax['taxonomy'] === 'post_tag' && empty($data['tags'])) {
                continue;
            }

            $res = http_bridge_get($tax['href']);
            if (is_wp_error($res)) {
                continue;
            }

            $terms = $res['data'];
            foreach ($terms as $term) {
                if ($tax['taxonomy'] === 'category') {
                    $ids = [];
                    foreach ($data['categories'] as $cat_id) {
                        if ($cat_id === $term['id']) {
                            $terms = get_terms([
                                'taxonomy' => 'category',
                                'hide_empty' => false,
                            ]);
                            $exists = false;
                            foreach ($terms as $wp_term) {
                                if ($wp_term->name === $term['name']) {
                                    $exists = true;
                                    break;
                                }
                            }

                            if (!$exists) {
                                $term = wp_insert_term(
                                    $term['name'],
                                    'category'
                                );
                                if (!is_wp_error($term)) {
                                    $ids[] = $term['term_id'];
                                }
                            } else {
                                $ids[] = $wp_term->term_id;
                            }
                        }
                    }

                    $data['categories'] = $ids;
                } elseif ($tax['taxonomy'] === 'post_tag') {
                    $ids = [];
                    foreach ($data['tags'] as $tag_id) {
                        if ($tag_id === $term['id']) {
                            $terms = get_terms([
                                'taxonomy' => 'post_tag',
                                'hide_empty' => false,
                            ]);
                            $exists = false;
                            foreach ($terms as $wp_term) {
                                if ($wp_term->name === $term['name']) {
                                    $exists = true;
                                    break;
                                }
                            }

                            if (!$exists) {
                                $term = wp_insert_term(
                                    $term['name'],
                                    'post_tag'
                                );
                                if (!is_wp_error($term)) {
                                    $ids[] = $term['term_id'];
                                }
                            } else {
                                $ids[] = $wp_term->term_id;
                            }
                        }
                    }

                    $data['tags'] = $ids;
                }
            }
        }

        return $data;
    }
}
