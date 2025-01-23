<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 */

if (!defined('ABSPATH')) {
    exit();
}

$is_remote_frontend = shortcode_exists('posts_bridge_remote_fields');
if ($is_remote_frontend) {
    echo do_shortcode(
        "[posts_bridge_remote_fields]{$content}[/posts_bridge_remote_fields]"
    );
} else {
    echo wp_kses_post($content);
}
