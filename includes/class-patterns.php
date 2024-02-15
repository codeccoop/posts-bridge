<?php

namespace WPCT_RCPT;

use WP_Block_Patterns_Registry;

class Patterns
{
    private static $slug_regex = '/^[A-z0-9\/_-]+$/';
    private static $comma_separated_regex = '/[,]+/';
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
            $_data = get_file_data($file, self::$default_headers);

            if (empty($_data['slug']) || empty($_data['title'])) continue;
            if (!preg_match(self::$slug_regex, $_data['slug'])) continue;
            if (WP_Block_Patterns_Registry::get_instance()->is_registered($_data['slug'])) continue;

            self::parse_data($_data, ['categories', 'keywords', 'blockTypes'], function ($val) {
                return array_map(function ($item) {
                    return trim($item);
                }, preg_split(
                    self::$comma_separated_regex,
                    (string) $val,
                ));
            });

            self::parse_data($_data, ['viewportWidth'], function ($val) {
                return (int) $val;
            });

            self::parse_data($_data, ['inserter'], function ($val) {
                return in_array(strtolower($val), ['yes', 'true'], true);
            });

            $_data['title'] = translate_with_gettext_context($_data['title'], 'Pattern title', 'wpct-remote-cpt');
            if (!empty($_data['description'])) {
                $_data['description'] = translate_with_gettext_context($_data['description'], 'Pattern description', 'wpct-remote-cpt');
            }

            ob_start();
            include $file;
            $_data['content'] = ob_get_clean();

            if (!$_data['content']) continue;

            if (!isset($_data['categories'])) $_data['categories'] = [];

            foreach ($_data['categories'] as $key => $cat) {
                $slug = _wp_to_kebab_case($cat);
                $_data['categories'][$key] = $slug;
                register_block_pattern_category(
                    $slug,
                    ['label' => __($cat, 'scaffolding')]
                );
            }

            register_block_pattern($_data['slug'], $_data);
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
