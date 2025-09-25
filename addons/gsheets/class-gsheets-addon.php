<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

require_once 'class-gsheets-post-bridge.php';
require_once 'hooks.php';

class GSheets_Addon extends Addon
{
    /**
     * Handles the addon name.
     *
     * @var string
     */
    public const title = 'Google Sheets';

    /**
     * Handles the addon's API name.
     *
     * @var string
     */
    public const name = 'gsheets';

    /**
     * Handles the addom's custom relation class.
     *
     * @var string
     */
    public const bridge_class = '\POSTS_BRIDGE\GSheets_Post_Bridge';
}

GSheets_Addon::setup();
