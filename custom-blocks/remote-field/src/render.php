<?php
/**
* Dynamic Block Template.
* @param   array $attributes - A clean associative array of block attributes.
* @param   array $block - All the block settings and attributes.
* @param   string $content - The block inner HTML (usually empty unless using inner blocks).
*/

$is_remote_frontend = shortcode_exists('remote_field');
if ($is_remote_frontend && isset($attributes['remotes'])) {
    preg_match_all('{{([^]+)}}', $content, $matches);
    if (!$matches) {
        echo $content;
    } else {
        $remotes = implode(',', array_map(function ($match) {
            return trim($match);
        }, $matches[1]));
        echo do_shortcode("[remote_fields fields='{$remotes}']{$content}[/remote_fields]");
    }
}
