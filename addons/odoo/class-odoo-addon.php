<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-odoo-post-bridge.php';
require_once 'hooks.php';

/**
 * Odoo Addon class.
 */
class Odoo_Addon extends Addon
{
    /**
     * Handles the addon name.
     *
     * @var string
     */
    public const title = 'Odoo';

    /**
     * Handles the addon's API name.
     *
     * @var string
     */
    public const name = 'odoo';

    /**
     * Handles the addom's custom relation class.
     *
     * @var string
     */
    public const bridge_class = '\POSTS_BRIDGE\Odoo_Post_Bridge';
}

Odoo_Addon::setup();
