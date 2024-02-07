<?php

/**
 * Title: Wpct Remote Field
 * Slug: wpct-remote-field
 * Description: Remote field as paragraph
 * Categories: Remote CPT
 * Keywords: remote field, backend
 * Viewport Width: 500 
 * Source: plugin
 * Post Types: remote-cpt
 */

?>

<!-- wp:paragraph {"align":"center","placeholder":"Post excerpt","fontSize":"larg"} -->
<p class="has-text-align-center has-large-font-size">Post excerpt:</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[remote_field field="post_excerpt"]
<h2 class="wp-block-heading is-style-default has-accent-3-color has-text-color has-link-color">%s</h2>
[/remote_field]
<!-- /wp:shortcode -->
