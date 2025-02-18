<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Post bridge implamentation for the REST API protocol.
 */
class Rest_Post_Bridge extends Post_Bridge
{
    /**
     * Handles the post bridge's template class.
     *
     * @var string
     */
    protected static $template_class = '\POSTS_BRIDGE\Rest_Post_Bridge_Template';
}
