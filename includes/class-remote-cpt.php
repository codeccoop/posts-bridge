<?php

namespace POSTS_BRIDGE;

use ValueError;
use WP_Post;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Remote_CPT post wrapper.
 */
class Remote_CPT
{
    /**
     * Foreign key meta key handle.
     *
     * @var string Meta key.
     */
    public const _foreign_key_handle = '_posts_bridge_foreign_key';

    /**
     * Handles remote cpt locale.
     *
     * @var string $locale
     */
    private $locale;

    /**
     * Handle value of the remote model foreign key.
     *
     * @var string $foreign_id Foreign key value.
     */
    private $foreign_id;

    /**
     * Handle remote data as in memory cache.
     *
     * @var array|null $remote_data Cached remote data.
     */
    private $remote_data = null;

    /**
     * Handle the wrapped WP_Post instance.
     *
     * @var WP_Post $post WP_Post instance.
     */
    private $post;

    /**
     * Plugin handled post types getter.
     *
     * @param string|null $api Filter post types by API slug.
     *
     * @return array<string> Handled post type slugs.
     */
    public static function post_types($api = null)
    {
        $relations = apply_filters('posts_bridge_relations', []);
        return array_values(
            array_unique(
                array_map(
                    static function ($rel) {
                        return $rel->post_type;
                    },
                    array_filter($relations, static function ($rel) use ($api) {
                        return $api !== null ? $rel->api === $api : true;
                    })
                )
            )
        );
    }

    /**
     * Do the `posts_bridge_remote_fields` shortcode fetching remote data of the current Remote CPT
     *
     * @param string $content Shortcode content.
     *
     * @return string $html Rendered output.
     */
    public static function do_shortcode($content)
    {
        global $posts_bridge_remote_cpt;

        // Exit if global post is not Remote CPT
        if (empty($posts_bridge_remote_cpt)) {
            return $content;
        }

        // Gets replacement marks and exit if not found
        preg_match_all('/{{([^}]+)}}/', $content, $matches);
        if (empty($matches)) {
            return $content;
        }

        // Filters empty replace marks and trim its content
        $fields = array_values(
            array_filter(
                array_map(static function ($match) {
                    return trim($match);
                }, $matches[1]),
                static function ($field) {
                    return $field;
                }
            )
        );

        // Exit if no fields is defined
        if (empty($fields)) {
            return $content;
        }

        // Checks if there are values for the fields and exits if it isn't
        $is_empty = array_reduce(
            $fields,
            static function ($handle, $field) {
                global $posts_bridge_remote_cpt;
                return $handle &&
                    $posts_bridge_remote_cpt->get($field) === null;
            },
            false
        );
        if ($is_empty) {
            return $content;
        }

        // Get remote field values
        $values = array_map(static function ($field) {
            global $posts_bridge_remote_cpt;
            return $posts_bridge_remote_cpt->get($field, '');
        }, $fields);

        try {
            // Replace anchors on the shortcode content with values
            for ($i = 0; $i < count($fields); $i++) {
                $field = $fields[$i];
                $value = (string) $values[$i];
                $content = preg_replace(
                    '/{{' . preg_quote($field, '/') . '}}/',
                    $value,
                    $content
                );
            }

            return wp_kses_post($content);
        } catch (ValueError $e) {
            return $e->getMessage();
        }
    }

    /**
     * Do the `posts_bridge_remote_callback` shortcode ussing the current remote cpt as the first param.
     * This shortcode pass control of the fetch process to the user's function.
     *
     * @param array $atts Shortcode's attributes.
     * @param string $content Shortcode's content.
     *
     * @return string $html Rendered output.
     */
    public static function do_remote_callback($atts, $content)
    {
        global $posts_bridge_remote_cpt;
        if (empty($posts_bridge_remote_cpt)) {
            return $content;
        }

        $callback = isset($atts['fn']) ? $atts['fn'] : null;

        if (empty($callback)) {
            return $content;
        } else {
            unset($atts['fn']);
        }

        if (!function_exists($callback)) {
            return $content;
        }

        return $callback($posts_bridge_remote_cpt, $atts, $content);
    }

    /**
     * Bounds the post and returns the instance.
     *
     * @param WP_Post|int $post Instance of the post.
     */
    public function __construct($post, $foreign_id = null)
    {
        if (is_int($post)) {
            $post = get_post($post);
        }

        $this->post = $post;
        $this->foreign_id = $foreign_id;

        $this->locale = apply_filters(
            'wpct_i18n_post_language',
            null,
            $this->ID,
            'locale'
        );
    }

    /**
     * Fetches post remote data.
     *
     * @return array|null $remote_data Remote data.
     */
    public function fetch()
    {
        if (is_wp_error($this->remote_data)) {
            return [];
        } elseif ($this->remote_data) {
            return $this->remote_data;
        }

        add_filter(
            'wpct_i18n_current_language',
            [$this, 'language_interceptor'],
            99
        );

        do_action('posts_bridge_before_fetch', $this->rcpt);
        $data = $this->relation()->fetch($this->foreign_id());
        do_action('posts_bridge_after_fetch', $data, $this->rcpt);

        if (is_wp_error($data)) {
            $this->remote_data = $data;
            return [];
        }

        $this->remote_data = (array) apply_filters(
            'posts_bridge_remote_data',
            $data,
            $this,
            $this->locale
        );

        return $this->remote_data;
    }

    /**
     * Proxy of the private getters and wrapped posts attributes.
     *
     * @param string $name Attribute name.
     *
     * @return mixed Attribute value or null if attribute does not exists.
     */
    public function __get($name)
    {
        switch ($name) {
            case 'relation':
                return $this->relation();
                break;
            case 'foreign_id':
                return $this->foreign_id();
                break;
            default:
                $post_data = wp_slash((array) $this->post);
                return $post_data[$name] ?? null;
        }
    }

    /**
     * Remote data attributes getter.
     *
     * @param string $attr Remote attribute name.
     * @param mixed $default Default value if attribute does not have value.
     *
     * @return mixed Remote value.
     */
    public function get($attr, $default = null)
    {
        $data = $this->fetch();

        if (is_wp_error($data)) {
            return null;
        }

        if ($value = (new JSON_Finger($data))->get($attr)) {
            return $value;
        }

        return $default;
    }

    /**
     * Gets remote relation instance.
     *
     * @return Remote_Relation Remote relation instance.
     */
    private function relation()
    {
        return apply_filters('posts_bridge_relation', null, $this->post_type);
    }

    /**
     * Foreign key value getter.
     *
     * @return string|int Remote relation foreign key value.
     */
    private function foreign_id()
    {
        if (empty($this->foreign_id)) {
            $this->foreign_id = get_post_meta(
                $this->post->ID,
                self::_foreign_key_handle,
                true
            );
        }

        return $this->foreign_id;
    }

    /**
     * Wrapped post taxonomy terms getter.
     *
     * @param string $tax Taxonomy name.
     *
     * @return array|WP_Error Terms of the taxonomy attacheds to the post.
     */
    public function terms($tax)
    {
        return get_the_terms($this->ID, $tax);
    }

    /**
     * Wrapped post custom fields getter.
     *
     * @param string $field Custom field name.
     * @param boolean $single Retrive a single value.
     *
     * @return mixed Custom field value or false.
     */
    public function meta($field, $single = true)
    {
        return get_post_meta($this->ID, $field, $single);
    }

    /**
     * I18n current language interceptor.
     *
     * @param string $lang API language locale.
     */
    public function language_interceptor($locale)
    {
        if ($this->locale) {
            $locale = $this->locale;
        }

        remove_filter(
            'wpct_i18n_current_language',
            [$this, 'language_interceptor'],
            99
        );

        return $locale;
    }
}
