<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-wp-post-bridge.php';
require_once 'hooks.php';

/**
 * WP Addon class.
 */
class WP_Addon extends Addon
{
    /**
     * Handles the addon name.
     */
    public const title = 'WP';

    /**
     * Handles the addon's API name.
     */
    public const name = 'wp';

    /**
     * Handles the addon's custom bridge class.
     */
    public const bridge_class = '\POSTS_BRIDGE\WP_Post_Bridge';
}

WP_Addon::setup();
