<?php

function noop()
{
}
/* /1* serialize parsed block *1/ */
/* function _wpct_remote_cpt_serialize_block($block) */
/* { */
/*     return [ */
/*         $block['blockName'], */
/*         $block['attrs'], */
/*         array_map('_wpct_remote_cpt_parse_block', $block['innerBlocks']) */
/*     ]; */
/* } */

/* /1* Parse html template to blocks *1/ */
/* function wpct_remote_cpt_parse_template($template_path) */
/* { */
/*     $content = file_get_contents($template_path); */
/*     $blocks = parse_blocks($content); */

/*     $blocks = array_map('_wpct_remote_cpt_serialize_block', $blocks); */
/* } */

/* /1* Register plugin templates *1/ */
/* function wpct_remote_cpt_register_templates() */
/* { */
/*     $theme_slug = get_stylesheet(); */
/*     $template_base_paths = get_block_theme_folders($theme_slug); */

/*     if (isset($template_base_paths['wp_template'])) { */
/*         $templates = _wpct_remote_cpt_get_template_files('template'); */
/*         _wpct_remote_cpt_register_templates( */
/*             $template_base_paths['wp_template'], */
/*             $templates, */
/*         ); */
/*     } */

/*     if (isset($template_base_paths['wp_template_part'])) { */
/*         $parts = _wpct_remote_cpt_get_template_files('template_part'); */
/*         _wpct_remote_cpt_register_templates( */
/*             $template_base_paths['wp_template_part'], */
/*             $parts, */
/*         ); */
/*     } */
/* } */

/* /1* Unregister plugin templates *1/ */
/* function wpct_remote_cpt_unregister_templates() */
/* { */
/*     $theme_slug = get_stylesheet(); */
/*     $template_base_paths = get_block_theme_folders($theme_slug); */

/*     if (isset($template_base_paths['wp_template'])) { */
/*         $registered_templates = _wpct_remote_cpt_get_template_files('template', false); */
/*         _wpct_remote_cpt_register_templates( */
/*             $template_base_paths['wp_template'], */
/*             $registered_templates, */
/*             false, */
/*         ); */
/*     } */

/*     if (isset($template_base_paths['wp_template_part'])) { */
/*         $registered_parts = _wpct_remote_cpt_get_template_files('template_part', false); */
/*         _wpct_remote_cpt_register_templates( */
/*             $template_base_paths['wp_template_part'], */
/*             $registered_parts, */
/*             false, */
/*         ); */
/*     } */
/* } */

/* /1* Get plugin template files *1/ */
/* function _wpct_remote_cpt_get_template_files($template_type, $unregistereds = true) */
/* { */
/*     $directories = [ */
/*         'wp_template' => 'templates', */
/*         'wp_template_part' => 'parts' */
/*     ]; */
/*     $directory = WPCT_REMOTE_CPT_PLUGIN_PATH . $directories[$template_type]; */
/*     $files = scandir($directory); */

/*     return array_map(function ($file) use ($directory, $unregistereds) { */
/*         if ($unregistereds) { */
/*             $file = preg_replace('/^\./', '', $file); */
/*         } */
/*         return $directory . '/' . $file; */
/*     }, array_filter($files, function ($file) use ($unregistereds) { */
/*         if ($unregistereds) { */
/*             return preg_match('/^(?!\.).+\.html$/', $file); */
/*         } else { */
/*             return preg_match('/^\..+\.html$/', $file); */
/*         } */
/*     })); */
/* } */

/* /1* Register plugin template files to the active theme *1/ */
/* function _wpct_remote_cpt_register_templates($dist_dir, $templates, $register = true) */
/* { */
/*     $theme_dir = get_stylesheet_directory() . '/' . $dist_dir; */
/*     $files = scandir($theme_dir); */
/*     foreach ($templates as $template) { */
/*         $template_file = basename($template); */
/*         if (!in_array($template_file, $files)) { */
/*             _wpct_remote_cpt_register_template($template, $theme_dir, $register); */
/*         } */
/*     } */
/* } */

/* /1* Register one plugin template file to the active theme *1/ */
/* function _wpct_remote_cpt_register_template($template_file, $dest_dir, $register = true) */
/* { */
/*     $copy_file = $dest_dir . '/' . basename($template_file); */
/*     $registered_file = dirname($template_file) . '/.' . basename($template_file); */
/*     if ($register) { */
/*         copy($template_file, $copy_file); */
/*         copy($template_file, $registered_file); */
/*     } else { */
/*         unlink($copy_file); */
/*         unlink($registered_file); */
/*     } */
/* } */
