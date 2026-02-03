<?php
/**
 * Plugin Name:         Posts Bridge
 * Plugin URI:          https://postsbridge.codeccoop.org
 * Description:         Synchronize backend data with WordPress post collections over HTTP APIs, enabling remote and automated web content management.
 * Author:              codeccoop
 * Author URI:          https://www.codeccoop.org
 * License:             GPLv2 or later
 * License URI:         http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         posts-bridge
 * Domain Path:         /languages
 * Version:             4.0.1
 * Requires PHP:        8.0
 * Requires at least:   6.7
 *
 * @package postsbridge
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

define( 'POSTS_BRIDGE_INDEX', __FILE__ );
define( 'POSTS_BRIDGE_DIR', __DIR__ );
define( 'POSTS_BRIDGE_ADDONS_DIR', POSTS_BRIDGE_DIR . '/addons' );

/* Packages */
if ( ! class_exists( 'WPCT_PLUGIN\Plugin' ) ) {
	require_once __DIR__ . '/deps/plugin/class-plugin.php';
}

if ( ! class_exists( 'HTTP_BRIDGE\backend' ) ) {
	require_once __DIR__ . '/deps/http/index.php';
}

/* Classes */
require_once __DIR__ . '/includes/class-api.php';
require_once __DIR__ . '/includes/class-custom-post-type.php';
require_once __DIR__ . '/includes/class-json-finger.php';
require_once __DIR__ . '/includes/class-openapi.php';
require_once __DIR__ . '/includes/class-rest-settings-controller.php';
require_once __DIR__ . '/includes/class-rest-remote-posts-controller.php';
require_once __DIR__ . '/includes/class-settings-store.php';
require_once __DIR__ . '/includes/class-logger.php';
require_once __DIR__ . '/includes/class-menu.php';
require_once __DIR__ . '/includes/class-post-bridge.php';
require_once __DIR__ . '/includes/class-post-bridge-template.php';
require_once __DIR__ . '/includes/class-posts-synchronizer.php';
require_once __DIR__ . '/includes/class-remote-cpt.php';
require_once __DIR__ . '/includes/class-remote-featured-media.php';
require_once __DIR__ . '/includes/class-addon.php';
require_once __DIR__ . '/includes/class-posts-bridge.php';

/* Shortcodes */
require_once __DIR__ . '/includes/shortcodes.php';

/* Custom blocks */
require_once __DIR__ . '/custom-blocks/remote-fields/remote-fields.php';

/**
 * Handle global Remote_CPT instances.
 *
 * @var Remote_CPT|null
 */
global $posts_bridge_remote_cpt;
$posts_bridge_remote_cpt = null;

/* Start the plugin */
POSTS_BRIDGE\Posts_Bridge::setup();
