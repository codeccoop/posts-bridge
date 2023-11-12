<?php

/* serialize parsed block */
function _wpct_remote_cpt_serialize_block($block)
{
    return [
        $block['blockName'],
        $block['attrs'],
        array_map('_wpct_remote_cpt_parse_block', $block['innerBlocks'])
    ];
}

/* Parse html template to blocks */
function wpct_remote_cpt_parse_template($template_path)
{
    $content = file_get_contents($template_path);
    $blocks = parse_blocks($content);

    $blocks = array_map('_wpct_remote_cpt_serialize_block', $blocks);
}

/* Register plugin templates */
function wpct_remote_cpt_register_templates()
{
    $is_block_theme = wp_is_block_theme();
    if (!$is_block_theme) return;

    $theme_slug = get_stylesheet();
    _wpct_remote_cpt_register_templates($theme_slug);
}

function _wpct_remote_cpt_register_templates($theme_slug)
{
    $theme = wp_get_theme($theme_slug);
    $template_base_paths = get_block_theme_folders($theme_slug);

    $template_types = ['wp_template', 'wp_template_part'];
    foreach ($template_types as $template_type) {
        if (isset($template_base_paths[$template_type])) {
            $templates = _wpct_remote_cpt_get_template_files($template_type);
            $theme_dir = $theme->get_stylesheet_directory() . '/' . $template_base_paths[$template_type];
            _wpct_remote_cpt_register_template_files(
                $theme_dir,
                $templates,
            );
        }
    }
}

/* Unregister plugin templates */
function wpct_remote_cpt_unregister_templates()
{
    $is_block_theme = wp_is_block_theme();
    if (!$is_block_theme) return;

    $theme_slug = get_stylesheet();
    _wpct_remote_cpt_unregister_templates($theme_slug);
}

function _wpct_remote_cpt_unregister_templates($theme_slug)
{
    $theme = wp_get_theme($theme_slug);
    $template_base_paths = get_block_theme_folders($theme_slug);

    $template_types = ['wp_template', 'wp_template_part'];
    foreach ($template_types as $template_type) {
        if (isset($template_base_paths[$template_type])) {
            $registereds = _wpct_remote_cpt_get_template_files($template_type, false);
            $theme_dir = $theme->get_stylesheet_directory() . '/' . $template_base_paths[$template_type];
            _wpct_remote_cpt_register_template_files(
                $theme_dir,
                $registereds,
                false,
            );
        }
    }
}

/* Get plugin template files */
function _wpct_remote_cpt_get_template_files($template_type, $unregistereds = true)
{
    $directories = [
        'wp_template' => 'templates',
        'wp_template_part' => 'parts'
    ];
    $directory = WPCT_REMOTE_CPT_PLUGIN_PATH . $directories[$template_type];

    if (!is_dir($directory)) return [];
    $files = scandir($directory);

    return array_values(array_map(function ($file) use ($directory, $unregistereds) {
        if (!$unregistereds) {
            $file = preg_replace('/^\./', '', $file);
        }
        return $directory . '/' . $file;
    }, array_filter($files, function ($file) use ($unregistereds) {
        if ($unregistereds) {
            return preg_match('/^(?!\.).+\.html$/', $file);
        } else {
            return preg_match('/^\..+\.html$/', $file);
        }
    })));
}

/* Register plugin template files to the active theme */
function _wpct_remote_cpt_register_template_files($theme_dir, $templates, $register = true)
{
    $files = scandir($theme_dir);
    foreach ($templates as $template) {
        $template_file = basename($template);
        if (in_array($template_file, $files) !== $register) {
            _wpct_remote_cpt_register_template_file($template, $theme_dir, $register);
        }
    }
}

/* Register one plugin template file to the active theme */
function _wpct_remote_cpt_register_template_file($template_file, $dest_dir, $register = true)
{
    $copy_file = $dest_dir . '/' . basename($template_file);
    $registered_file = dirname($template_file) . '/.' . basename($template_file);
    if ($register) {
        copy($template_file, $copy_file);
        copy($template_file, $registered_file);
    } else {
        unlink($copy_file);
        unlink($registered_file);
    }
}

add_action('switch_theme', 'wpct_remote_cpt_update_template_registry', 1, 3);
function wpct_remote_cpt_update_template_registry($new_name, $to, $from)
{
    $to_slug = $to->get_stylesheet();
    $from_slug = $from->get_stylesheet();

    if ($from->is_block_theme()) {
        _wpct_remote_cpt_unregister_templates($from_slug);
    }
    if ($to->is_block_theme()) {
        _wpct_remote_cpt_register_templates($to_slug);
    }
}
