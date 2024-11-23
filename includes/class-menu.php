<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Menu as BaseMenu;

class Menu extends BaseMenu
{
    protected static $settings_class = '\POSTS_BRIDGE\Settings';

    protected function render_page($echo = true)
    {
        printf(
            '<div class="wrap" id="posts-bridge">%s</div>',
            esc_html__('Loading', 'posts-bridge'),
        );
    }
}
