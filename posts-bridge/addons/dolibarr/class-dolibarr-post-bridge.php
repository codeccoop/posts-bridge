<?php
/**
 * Class Dolibarr_Post_Bridge
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Dolibarr post bridge
 */
class Dolibarr_Post_Bridge extends Post_Bridge {

	public function __construct( $data ) {
		parent::__construct( $data, 'dolibarr' );
	}

	public function __get( $name ) {
		switch ( $name ) {
			case 'foreign_key':
				return 'id';
			default:
				return parent::__get( $name );
		}
	}

	protected function list_remotes() {
		$response = $this->fetch( array( 'properties' => 'id' ) );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		return $response['data'];
	}
}
