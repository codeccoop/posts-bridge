<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Menu as BaseMenu;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Plugin menu class.
 */
class Menu extends BaseMenu
{
    /**
     * Render plugin menu page.
     */
    protected function render_page($echo = true)
    {
        printf(
            '<div class="wrap" id="posts-bridge">%s</div>',
            esc_html__('Loading', 'posts-bridge')
        );
    }
}
