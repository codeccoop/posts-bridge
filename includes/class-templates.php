<?php

namespace WPCT_RCPT;

use WP_Block_Template;
use WP_Query;

class TemplateUtils
{

    const PLUGIN_SLUG = 'wpct-remote-cpt/wpct-remote-cpt';

    public static function supports_block_templates($type = 'wp_template')
    {
        $is_fse = (bool) wp_is_block_theme();
        if ('wp_template_part' === $type && $is_fse || current_theme_supports('block-template-parts')) {
            return true;
        } else if ('wp_template' === $type && $is_fse) {
            return true;
        }

        return false;
    }

    public static function get_block_template($id, $type)
    {
        if (function_exists('get_block_template')) {
            return get_block_template($id, $type);
        }

        if (function_exists('gutenberg_get_block_template')) {
            return gutenberg_get_block_template($id, $type);
        }

        return null;
    }

    public static function build_template_from_post($post)
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
        $template->description = $post->post_excerpt;
        $template->title = $post->post_title;
        $template->status = $post->post_status;
        $template->has_theme_file = $has_theme_file;
        $template->is_custom = false;
        $template->post_types = [];

        if ('wp_template_part' === $post->post_type) {
            $area_terms = get_the_terms($post, 'wp_template_part_area');
            if (!is_wp_error($area_terms) && false !== $area_terms) {
                $template->area = $area_terms[0]->name;
            }
        }

        if (self::PLUGIN_SLUG === $theme) {
            $template->origin = 'plugin';
        }

        return $template;
    }

    public static function get_templates_directory($type = 'wp_template')
    {
        $root = dirname(__DIR__, 1);
        if ('wp_template_part' === $type) {
            return $root . '/parts';
        }

        return $root . '/templates';
    }

    public static function get_theme_template_path($slug, $type = 'wp_template')
    {
        $template_file = $slug . '.html';
        $directory = $type === 'wp_template' ? 'templates' : 'parts';
        $possible_paths = [
            get_stylesheet_directory() . '/' . $directory . '/' . $template_file,
            get_template_directory() . '/' . $directory . '/' . $template_file,
        ];

        foreach ($possible_paths as $path) {
            if (is_readable($path))
                return $path;
        }

        return null;
    }

    public static function theme_has_template($name)
    {
        return !!self::get_theme_template_path($name, 'wp_template');
    }

    public static function thene_has_template_part($name)
    {
        return !!self::get_theme_template_path($name, 'wp_template_part');
    }

    public static function create_file_object($file_path, $type, $slug, $from_theme = false)
    {
        $theme_name = wp_get_theme()->get('TextDomain');

        return (object) [
            'slug' => $slug,
            'id' => $from_theme ? $theme_name . '//' . $slug : self::PLUGIN_SLUG . '//' . $slug,
            'path' => $file_path,
            'type' => $type,
            'theme' => $from_theme ? $theme_name : TemplateUtils::PLUGIN_SLUG,
            'source' => $from_theme ? 'theme' : 'plugin',
            'title' => self::get_template_title($slug),
            'description' => self::get_template_description($slug),
            'post_types' => [],
        ];
    }

    public static function template_has_title($template)
    {
        return !empty($template->title) && $template->title !== $template->slug;
    }

    public static function get_template_title($slug)
    {
        $plugin_template_types = self::get_plugin_template_types();
        if (isset($plugin_template_types[$slug])) {
            return $plugin_template_types[$slug]['title'];
        }

        return ucwords(preg_replace('/[\-_]/', '', $slug));
    }

    public static function get_template_description($slug)
    {
        $plugin_template_types = self::get_plugin_template_types();
        if (isset($plugin_template_types[$slug])) {
            return $plugin_template_types[$slug]['description'];
        }

        return '';
    }

    public static function get_plugin_template_types()
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
        ];
    }

    public static function build_from_file($file, $type)
    {
        $file = (object) $file;

        $from_theme = 'theme' === $file->source;
        $theme_name = wp_get_theme()->get('TextDomain');

        $content = file_get_contents($file->path);
        $template = new WP_Block_Template();
        $template->id = $from_theme ? $theme_name . '//' . $file->slug : self::PLUGIN_SLUG . '//' . $file->slug;
        $template->theme = $from_theme ? $theme_name : self::PLUGIN_SLUG;
        $template->content = self::inject_theme_attribute($content);
        $template->source = $file->source ? $file->source : 'plugin';
        $template->slug = $file->slug;
        $template->type = $type;
        $template->title = !empty($file->title) ? $file->title : self::get_template_title($file->slug);
        $template->description = !empty($file->description) ? $file->description : self::get_template_description($file->slug);
        $template->status = 'publish';
        $template->has_theme_file = true;
        $template->origin = $file->source;
        $template->is_custom = false;
        $template->post_types = [];
        $template->area = 'uncategorized';

        return $template;
    }

    public static function inject_theme_attribute($content)
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

    public static function flatten_blocks(&$blocks)
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

    public static function remove_theme_templates_with_custom_alternatives($templates)
    {
        $custom_slugs = array_map(function ($template) {
            return $template->slug;
        }, array_values(array_filter($templates, function ($template) {
            return 'custom' === $template->source;
        })));

        return array_values(array_filter($templates, function ($template) use ($custom_slugs) {
            return !('theme' === $template->source && in_array($template->slug, $custom_slugs, true));
        }));
    }
}

class Templates
{
    public static function register_block_templates($plugin_path, $post_type)
    {
        // Short-circuit the query in Gutenberg
        add_filter('pre_get_block_file_template', function ($template, $id, $type) {
            $name_parts = explode('//', $id);
            if (count($name_parts) < 2) return $template;

            list($template_id, $slug) = $name_parts;

            if (TemplateUtils::PLUGIN_SLUG !== $template_id) return $template;
            if (!self::is_available($slug, $type)) return $template;

            $directory = TemplateUtils::get_templates_directory($type);
            $file_path = $directory . '/' . $slug . '.html';
            $file_object = TemplateUtils::create_file_object($file_path, $type, $slug);
            $_template = TemplateUtils::build_from_file($file_object, $type);

            if (null !== $_template) return $_template;
            return $template;
        }, 10, 3);

        // Add the block template objects to be used.
        add_filter('get_block_templates', function (
            $query_result,
            $query,
            $type
        ) use ($post_type) {
            if (!TemplateUtils::supports_block_templates($type)) return $query_result;

            $post_type = isset($query['post_type']) ? $query['post_type'] : '';
            $slugs = isset($query['slug__in']) ? $query['slug__in'] : [];
            $templates = self::get_block_templates($slugs, $type);

            if (count($templates) === 0) return $query_result;

            foreach ($templates as $template) {
                if (
                    $post_type &&
                    isset($template->post_type) &&
                    !in_array($post_type, $template->post_types, true)
                ) continue;

                if ('custom' !== $template->source) {
                    $template = TemplateUtils::build_from_file($template, $type);
                } else {
                    $template->title = TemplateUtils::get_template_title($template->slug);
                    $template->description = TemplateUtils::get_template_description($template->slug);
                    $query_result[] = $template;
                    continue;
                }

                $is_not_custom = false === array_search(
                    wp_get_theme()->get_stylesheet() . '//' . $template->slug,
                    array_column($query_result, 'id'),
                    true
                );
                $fits_slug_query = !isset($query['slug__in']) || in_array($template->slug, $query['slug__in'], true);
                $fits_area = !isset($query['area']) || (property_exists($template, 'area') && $template->area === $query['area']);
                if ($is_not_custom && $fits_area && $fits_slug_query) {
                    $query_result[] = $template;
                }
            }

            $query_result = TemplateUtils::remove_theme_templates_with_custom_alternatives($query_result);
            $query_result = array_map(function ($template) {
                if ('theme' === $template->origin && TemplateUtils::template_has_title($template)) {
                    return $template;
                }

                if (!$template->title === $template->slug) {
                    $template->title = TemplateUtils::get_template_title($template->slug);
                }

                if (!$template->description) {
                    $template->description = TemplateUtils::get_template_description($template->slug);
                }

                return $template;
            }, $query_result);

            return $query_result;
        }, 10, 3);

        add_filter('block_type_metadata_settings', function ($settings, $metadata) {
            if (
                isset($metadata['name'], $settings['render_callback']) &&
                'core/template-part' === $metadata['name'] &&
                in_array($settings['render_callback'], ['render_block_core_template_part', 'gutenberg_render_block_core_template_part'], true)
            ) {
                $settings['render_callback'] = [$this, 'render_template_part'];
            }

            return $settings;
        }, 10, 2);

        add_filter('block_type_metadata_settings', function ($settings, $metadata) {
            if (
                isset($metadata['name'], $settings['render_callback']) &&
                'core/shortcode' === $metadata['name']
            ) {
                $settings['original_render_callback'] = $settings['render_callback'];
                $settings['render_callback'] = function ($attributes, $content) use ($settings) {
                    if (strstr($content, 'remote_field')) return $content;

                    $render_callback = $settings['original_render_callback'];
                    return $render_callback($attributes, $content);
                };
            }

            return $settings;
        }, 10, 2);
    }

    private static function render_template_part($attributes)
    {
        if (isset($attributes['name']) && TemplateUtils::PLUGIN_SLUG === $attributes['theme']) {
            $template_part = TemplateUtils::get_block_template($attributes['theme'] . '//' . $attributes['slug'], 'wp_template_part');

            if ($template_part && !empty($template_part->content)) {
                return do_blocks($template_part->content);
            }
        }

        return function_exists('gutenberg_render_block_core_template_part') ? gutenberg_render_block_core_template_part($attributes) : render_block_core_template_part($attributes);
    }

    private static function is_available($template_name, $template_type = 'wp_template')
    {
        if (!$template_name) return false;

        $file = TemplateUtils::get_templates_directory($template_type) . '/' . $template_name . '.html';
        return is_readable($file) || self::get_block_templates([$template_name], $template_type);
    }

    private static function get_block_templates($slugs = [], $template_type = 'wp_template')
    {
        $db_templates = self::get_templates_from_db($slugs, $template_type);
        $file_templates = self::get_templates_from_files($slugs, $db_templates, $template_type);
        $templates = array_merge($db_templates, $file_templates);

        return $templates;
    }

    private static function get_templates_from_files($slugs, $db_templates, $type)
    {
        $directory = TemplateUtils::get_templates_directory($type);
        if (!file_exists($directory)) return [];

        $files = glob($directory . '/*.html');
        $templates = [];

        foreach ($files as $filename) {
            $slug = basename($filename, '.html');

            if (is_array($slugs) && count($slugs) > 0 && !in_array($slug, $slugs, true)) {
                continue;
            }

            $db_found = array_filter($db_templates, function ($template) use ($slug) {
                $template = (object) $template;
                return $template->slug === $slug;
            });

            if (count($db_found) > 0 || TemplateUtils::theme_has_template($slug)) continue;

            $templates[] = TemplateUtils::create_file_object($filename, $type, $slug);
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
                    'terms' => [TemplateUtils::PLUGIN_SLUG, get_stylesheet()]
                ],
            ],
        ];

        if (is_array($slugs) && count($slugs) > 0) {
            $args['post_name__in'] = $slugs;
        }

        $query = new WP_Query($args);
        $posts = $query->posts;

        return array_map(function ($post) {
            return TemplateUtils::build_template_from_post($post);
        }, $posts);
    }
}
