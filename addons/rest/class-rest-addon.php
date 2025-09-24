<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * REST API Addon class.
 */
class Rest_Addon extends Addon
{
    /**
     * Handles the addon name.
     *
     * @var string
     */
    public const title = 'REST API';

    /**
     * Handles the addon's API name.
     *
     * @var string
     */
    public const name = 'rest';
}

Rest_Addon::setup();
