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
            '<div class="wrap" id="%s">%s</div>',
            $this->slug(),
            esc_html__('Loading', Posts_Bridge::textdomain())
        );
    }
}
