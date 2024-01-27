<?php

namespace WPCT_REMOTE_CPT;

use WP_Block_Template;
use WP_Query;

class Templates
{
    const PLUGIN_SLUG = 'wpct/remote-cpt';

    private static function supports_block_templates($template_type = 'wp_template')
    {
        $is_fse = (bool) wp_is_block_theme();
        if ('wp_template_part' === $template_type && $is_fse || current_theme_supports('block-template-parts')) {
            return true;
        } else if ('wp_template' === $template_type && $is_fse) {
            return true;
        }

        return false;
    }

    public static function register_block_templates($plugin_path, $post_type)
    {
        add_action('template_redirect', function () use ($post_type) {
            if (is_embed() || !self::supports_block_templates()) return;

            if (is_singular($post_type) && self::is_available('single-' . $post_type)) {
                $valid_slugs = ['single-' . $post_type];
                $templates = get_block_templates(['slug__in' => $valid_slugs]);
                if (count($templates) > 0 && !self::theme_has_template('single-' . $post_type)) {
                    // do something
                }
            } else if (is_post_type_archive($post_type)) {
                $templates = get_block_templates(['slug__in' => ['archive-' . $post_type]]);
                if (count($templates) > 0 && !self::theme_has_template('archive-' . $post_type)) {
                    // do someting
                }
            }
        });

        add_filter('get_block_templates', function (
            $query_result,
            $query,
            $template_type
        ) use ($post_type) {
            $post_type = isset($query['post_type']) ? $query['post_type'] : '';
            $slugs = isset($query['slug__in']) ? $query['slug__in'] : [];
            $template_files = self::get_block_templates($slugs, $template_type);

            foreach ($template_files as $template_file) {
                if ($post_type && !in_array($post_type, $template_file->post_types, true)) {
                    continue;
                }

                if ('custom' !== $template_file->source) {
                    $template = self::build_from_file($template_file,  $template_type);
                } else {
                    $template_file->title = $template_file->slug;
                    $query_result[] = $template_file;
                    continue;
                }

                $is_not_custom = false === array_search(
                    wp_get_theme()->get_stylesheet() . '//' . $template_file->slug,
                    array_column($query_result, 'id'),
                    true
                );
                $fits_area = !isset($query['area']) || (property_exists($template_file, 'area') && $template_file->area === $query['area']);
                if ($is_not_custom && $fits_area) {
                    $query_result[] = $template;
                }
            }

            return $query_result;
        }, 10, 3);

        add_filter('pre_get_block_file_template', function ($template, $id, $template_type) {
            $name_parts = explode('//', $id);
            if (count($name_parts) < 2) return $template;

            list($template_id, $template_slug) = $name_parts;

            if (self::PLUGIN_SLUG !== $template_id) {
                return $template;
            }

            if (!self::is_available($template_slug, $template_type)) {
                return $template;
            }

            $directory = self::get_templates_directory($template_type);
            $template_file = $directory . '/' . $template_slug . '.html';
            $object = self::file_to_object($template_file, $template_type, $template_slug);
            $_template = self::build_from_file($object, $template_type);

            if (null !== $_template) return $_template;
            return $template;
        }, 10, 3);
    }

    private static function theme_has_template($template_name)
    {
        return !!self::get_theme_template_path($template_name, 'wp_template');
    }

    private static function theme_has_template_part($template_name)
    {
        return !!self::get_theme_template_path($template_name, 'wp_template_part');
    }

    private static function get_theme_template_path($template_slug, $template_type = 'wp_template')
    {
        $template_file = $template_slug . '.html';
        $directory = $template_type === 'wp_template' ? 'templates' : 'parts';
        $template_path = get_stylesheet_directory() . '/' . $directory . '/' . $template_file;
        if (is_readable($template_path)) return $template_path;
        return null;
    }

    private static function is_available($template_name, $template_type = 'wp_template')
    {
        if (!$template_name) return false;

        $file = self::get_templates_directory($template_type) . '/' . $template_name . '.html';
        return is_readable($file) || self::get_block_templates([$template_name], $template_type);
    }

    private static function get_block_templates($slugs = [], $template_type = 'wp_template')
    {
        $db_templates = self::get_templates_from_db($slugs, $template_type);
        $file_templates = self::get_templates_from_files($slugs, $db_templates, $template_type);
        $templates = array_merge($db_templates, $file_templates);

        return $templates;
    }

    private static function get_templates_directory($template_type = 'wp_template')
    {
        $root = dirname(__DIR__, 1);
        if ('wp_template_part' === $template_type) {
            return $root . '/parts';
        }

        return $root . '/templates';
    }

    private static function get_templates_from_files($slugs, $db_templates, $template_type)
    {
        $directory = self::get_templates_directory($template_type);
        $template_files = glob($directory . '/*.html');
        $templates = [];

        foreach ($template_files as $template_file) {
            $template_slug = basename($template_file, '.html');
            if (is_array($slugs) && count($slugs) > 0 && !in_array($template_slug, $slugs, true)) {
                continue;
            }

            $db_template = array_filter($db_templates, function ($template) use ($template_slug) {
                $template = (object) $template;
                return $template->slug === $template_slug;
            });

            if (count($db_template) > 0) continue;

            $theme = wp_get_theme();
            $theme_template = file_exists($theme->theme_root . '/' . $theme->stylesheet . '/templates/' . $template_slug . '.html');
            if ($theme_template) continue;

            $templates[] = self::file_to_object($template_file, $template_type, $template_slug);
        }

        return $templates;
    }

    private static function get_templates_from_db($slugs = [], $template_type = 'wp_template')
    {
        $args = [
            'post_type' => $template_type,
            'posts_per_page' => -1,
            'no_found_rows' => true,
            'tax_query' => [
                [
                    'taxonomy' => 'wp_theme',
                    'field' => 'name',
                    'terms' => [get_stylesheet()]
                ],
            ],
        ];

        if (is_array($slugs) && count($slugs) > 0) {
            $args['post_name__in'] = $slugs;
        }

        $query = new WP_Query($args);
        $posts = $query->posts;

        return array_map(function ($post) {
            return self::build_from_post($post);
        }, $posts);
    }

    private static function file_to_object($template_file, $template_type, $template_slug, $from_theme = false)
    {
        $theme_name = wp_get_theme()->get('TextDomain');

        return (object) [
            'slug' => $template_slug,
            'id' => $from_theme ? $theme_name . '//' . $template_slug : self::PLUGIN_SLUG . '//' . $template_slug,
            'path' => $template_file,
            'type' => $template_type,
            'theme' => $from_theme ? $theme_name : self::PLUGIN_SLUG,
            'source' => $from_theme ? 'theme' : 'plugin',
            'title' => self::get_template_title($template_slug),
            'description' => self::get_template_description($template_slug),
            'post_types' => [],
        ];
    }

    private static function build_from_file($template_file, $template_type)
    {
        $template_file = (object) $template_file;

        $from_theme = 'theme' === $template_file->source;
        $theme_name = wp_get_theme()->get('TextDomain');

        $content = file_get_contents($template_file->path);
        $template = new WP_Block_Template();
        $template->id = $from_theme ? $theme_name . '//' . $template_file->slug : self::PLUGIN_SLUG . '//' . $template_file->slug;
        $template->theme = $from_theme ? $theme_name : self::PLUGIN_SLUG;
        $template->content = self::inject_theme_attribute($content);
        $template->source = $template_file->source ? $template_file->source : 'plugin';
        $template->slug = $template_file->slug;
        $template->type = $template_type;
        $template->title = !empty($template_file->title) ? $template_file->title : self::get_template_title($template_file->slug);
        $template->description = !empty($template_file->description) ? $template_file->description : self::get_template_description($template_file->slug);
        $template->status = 'publish';
        $template->has_theme_file = true;
        $template->origin = $template_file->source;
        $template->si_custom = false;
        $template->post_types = [];
        $template->area = 'uncategorized';

        return $template;
    }

    private static function build_from_post($post)
    {
        $terms = get_the_terms($post, 'wp_theme');
        if (is_wp_error($terms)) return $terms;

        if (!$terms) return new WP_Error('template_missing_theme', __('No theme is defined for this template', 'wpct-remote-cpt'));

        $theme = $terms[0]->name;
        $has_theme_file = true;

        $template = new WP_Block_Template();
        $template->wp_id = $post->ID;
        $template->id = $theme . '//' . $post->post_name;
        $template->theme = $theme;
        $template->content = $post->post_content;
        $template->slug = $post->post_name;
        $template->source = 'custom';
        $template->type = $post->post_type;
        $template->description = $post->description;
        $template->title = $post->post_title;
        $template->status = $post->post_status;
        $template->has_theme_file = $has_theme_file;
        $template->is_custom = false;
        $template->post_types = [];

        if ('wp_template_part' === $post->post_type) {
            $type_terms = get_the_terms($post, 'wp_template_part_area');
            if (!is_wp_error($type_terms) && false !== $type_terms) {
                $template->area = $type_terms[0]->name;
            }
        }

        if (self::PLUGIN_SLUG === $theme) {
            $template->origin = 'plugin';
        }

        return $template;
    }

    public static function is_site_edit($template_id)
    {
        $post_type = isset($_GET['postType']) ? $_GET['postType'] : null;
        $post_id = isset($_GET['postId']) ? $_GET['postId'] : null;
        $canvas = isset($_GET['canvas']) ? $_GET['canvas'] : null;
        return $post_type === 'wp_template' && $post_id === $template_id && $canvas === 'edit';
    }

    public static function is_edit_post_type($post_type)
    {
        $is_edit = isset($_GET['action']) && $_GET['action'] === 'edit';
        $post_id = isset($_GET['post']) ? (int) $_GET['post'] : 0;
        if ($is_edit && $post_id) {
            $post = get_post($post_id);
            return $post->post_type === $post_type;
        }

        return false;
    }


    private static function inject_theme_attribute($content)
    {
        $has_update = false;
        $new_content = '';
        $template_blocks = parse_blocks($content);
        $blocks = self::flatten_blocks($template_blocks);
        foreach ($blocks as &$block) {
            if ('core/template-part' === $block['blockName'] && !isset($block['attrs']['theme'])) {
                $block['attrs']['theme'] = wp_get_theme()->get_stylesheet();
                $has_update = true;
            }
        }

        if ($has_update) {
            foreach ($template_blocks as &$block) {
                $new_content .= serialize_block($block);
            }

            return $new_content;
        }

        return $content;
    }

    private static function flatten_blocks(&$blocks)
    {
        $all_blocks = [];
        $queue = [];
        foreach ($blocks as &$block) {
            $queue[] = &$block;
        }

        $queue_count = count($queue);

        while ($queue_count > 0) {
            $block = &$queue[0];
            array_shift($queue);
            $all_blocks[] = &$block;

            if (!empty($block['innerBlocks'])) {
                foreach ($block['innerBlocks'] as &$inner_block) {
                    $queue[] = &$inner_block;
                }
            }

            $queue_count = count($queue);
        }

        return $all_blocks;
    }

    private static function get_template_title($template_slug)
    {
        $plugin_template_types = self::get_plugin_template_types();
        if (isset($plugin_template_types[$template_slug])) {
            return $plugin_template_types[$template_slug]['title'];
        }

        return ucwords(preg_replace('/[\-_]/', '', $template_slug));
    }

    private static function get_template_description($template_slug)
    {
        $plugin_template_types = self::get_plugin_template_types();
        if (isset($plugin_template_types[$template_slug])) {
            return $plugin_template_types[$template_slug]['description'];
        }

        return '';
    }

    private static function get_plugin_template_types()
    {
        return [
            'single-remote-cpt' => [
                'title' => 'Single Remote CPT',
                'description' => ''
            ],
            'archive-remote-cpt' => [
                'title' => 'Archive Remote CPT',
                'description' => '',
            ],
            'archive-remote-cpt' => [
                'title' => 'Archive Remote CPT',
                'description' => ''
            ],
        ];
    }
}
