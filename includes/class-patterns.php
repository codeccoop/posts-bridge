<?php

namespace WPCT_REMOTE_CPT;

use WP_Block_Patterns_Registry;

class Patterns
{
    private static $slug_regex = '/^[A-z0-9\/_-]+$/';
    private static $comma_separated_regex = '/[\s,]+/';
    private static $default_headers = [
        'title' => 'Title',
        'slug' => 'Slug',
        'description' => 'Description',
        'viewportWidth' => 'Viewport Width',
        'categories' => 'Categories',
        'keywords' => 'Keywords',
        'blockTypes' => 'Block Types',
        'inserter' => 'Inserter',
    ];

    public static function register_block_patterns($plugin_path)
    {
        if (!class_exists('WP_Block_Patterns_Registry')) return;

        $patterns_path = $plugin_path . 'patterns';
        $files = glob($patterns_path . '/*.php');
        if (!$files) return;

        foreach ($files as $file) {
            $data = get_file_data($file, self::$default_headers);

            if (empty($data['slug']) || empty($data['title'])) continue;
            if (!preg_match(self::$slug_regex, $data['slug'])) continue;
            if (WP_Block_Patterns_Registry::get_instance()->is_registered($data['slug'])) continue;

            self::parse_data($data, ['categories', 'keywords', 'blockTypes'], function ($val) {
                return preg_split(
                    self::$comma_separated_regex,
                    (string) $val,
                );
            });

            self::parse_data($data, ['viewportWidth'], function ($val) {
                return (int) $val;
            });

            self::parse_data($data, ['inserter'], function ($val) {
                return in_array(strtolower($val), ['yes', 'true'], true);
            });

            $data['title'] = translate_with_gettext_context($data['title'], 'Pattern title', 'wpct-remote-cpt');
            if (!empty($data['description'])) {
                $data['description'] = translate_with_gettext_context($data['description'], 'Pattern description', 'wpct-remote-cpt');
            }

            ob_start();
            include $file;
            $data['content'] = ob_get_clean();

            if (!$data['content']) continue;

            if (!isset($data['categories'])) $data['categories'] = [];

            foreach ($data['categories'] as $key => $cat) {
                $slug = _wp_to_kebab_case($cat);
                $data['categories'][$key] = $slug;
                register_block_pattern_category(
                    $slug,
                    ['label' => __($cat, 'wpct-remote-cpt')]
                );
            }

            register_block_pattern($data['slug'], $data);
        }
    }

    private static function parse_data(&$data, $props, $parser)
    {
        foreach ($props as $prop) {
            if (!empty($data[$prop])) {
                $data[$prop] = $parser($data[$prop]);
            } else {
                unset($data[$prop]);
            }
        }
    }
}
