<?php
/**
* Dynamic Block Template.
* @param   array $attributes - A clean associative array of block attributes.
* @param   array $block - All the block settings and attributes.
* @param   string $content - The block inner HTML (usually empty unless using inner blocks).
*/

$is_remote_frontend = shortcode_exists('remote_field');
$field = $attributes['remoteField'];
$is_multi = count(explode(',', $field)) > 1;

if ($is_remote_frontend) {
    if ($is_multi) {
        echo do_shortcode("[remote_fields fields='{$field}']{$content}[/remote_fields]");
    } else {
        echo do_shortcode("[remote_field field='{$field}']{$content}[/remote_field]");
    }
} else {
    echo $content;
}
