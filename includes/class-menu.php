<?php

namespace WPCT_RCPT;

use WPCT_ABSTRACT\Menu as BaseMenu;

class Menu extends BaseMenu
{
	static protected $settings_class = '\WPCT_RCPT\Settings';

    protected function render_page()
    {
        $output = parent::render_page();
        echo apply_filters('wpct_rcpt_menu_page_content', $output);
    }
}
