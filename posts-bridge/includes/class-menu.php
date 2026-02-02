<?php
/**
 * Class Menu
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

use WPCT_PLUGIN\Menu as Base_Menu;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Plugin menu class.
 */
class Menu extends Base_Menu {

	/**
	 * Renders the plugin menu page.
	 *
	 * @param bool $echo Ignored.
	 */
	protected static function render_page( $echo = true ) {
		printf(
			'<div class="wrap" id="posts-bridge">%s</div>',
			esc_html__( 'Loading', 'posts-bridge' )
		);
	}
}
