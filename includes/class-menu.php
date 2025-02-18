<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Menu as Base_Menu;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Plugin menu class.
 */
class Menu extends Base_Menu
{
    /**
     * Renders the plugin menu page.
     */
    protected static function render_page($echo = true)
    {
        printf(
            '<div class="wrap" id="posts-bridge">%s</div>',
            esc_html__('Loading', 'posts-bridge')
        );
    }
}
