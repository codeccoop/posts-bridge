<?php

namespace POSTS_BRIDGE;

use WPCT_ABSTRACT\Menu as BaseMenu;

if (!defined('ABSPATH')) {
	exit();
}

require_once 'class-settings.php';

/**
 * Plugin menu class.
 */
class Menu extends BaseMenu
{
    /**
     * Handle plugin settings class name.
     *
     * @var string $settings_class Settings class name.
     */
    protected static $settings_class = '\POSTS_BRIDGE\Settings';

    /**
     * Render plugin menu page.
     */
    protected function render_page($echo = true)
    {
        printf(
            '<div class="wrap" id="posts-bridge">%s</div>',
            esc_html__('Loading', 'posts-bridge'),
        );
    }
}
