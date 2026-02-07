<?php
/**
 * Class Remote_CPT
 *
 * @package postsbridge
 */

namespace POSTS_BRIDGE;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

use PBAPI;
use WP_Post;

/**
 * Remote_CPT post wrapper.
 */
class Remote_CPT {

	/**
	 * Foreign key meta key handle.
	 *
	 * @var string Meta key.
	 */
	public const FOREIGN_KEY_HANDLE = '_posts_bridge_foreign_key';

	/**
	 * Handle value of the remote model foreign key.
	 *
	 * @var string $foreign_id Foreign key value.
	 */
	private $foreign_id;

	/**
	 * Handle remote data as in memory cache.
	 *
	 * @var array|null $remote_data Cached remote data.
	 */
	private $remote_data = null;

	/**
	 * Handle the wrapped WP_Post instance.
	 *
	 * @var WP_Post $post WP_Post instance.
	 */
	private $post;

	/**
	 * Bounds the post and returns the instance.
	 *
	 * @param WP_Post|int     $post Instance of the post.
	 * @param int|string|null $foreign_id Foreign key value.
	 * @param array|null      $remote_data Foreign data.
	 */
	public function __construct( $post, $foreign_id = null, $remote_data = null ) {
		if ( is_int( $post ) ) {
			$post = get_post( $post );
		}

		$this->post        = $post;
		$this->foreign_id  = $foreign_id;
		$this->remote_data = $remote_data;
	}

	/**
	 * Fetches post remote data.
	 *
	 * @return array|null $remote_data Remote data.
	 */
	public function fetch() {
		if ( is_wp_error( $this->remote_data ) ) {
			return array();
		} elseif ( $this->remote_data ) {
			return $this->remote_data;
		}

		$bridge = $this->bridge();
		if ( ! $bridge ) {
			return array();
		}

		$data = $bridge->fetch_one( $this->foreign_id() );

		if ( is_wp_error( $data ) ) {
			Logger::log( "Remote CPT({$this->post_type}) #{$this->ID} fetch error", Logger::ERROR );
			Logger::log( $data, Logger::ERROR );

			$this->remote_data = $data;
			return array();
		}

		$this->remote_data = (array) apply_filters(
			'posts_bridge_remote_data',
			$data,
			$this
		);

		Logger::log( "Remote CPT({$this->post_type}) #{$this->ID} remote data" );
		Logger::log( $this->remote_data );

		return $this->remote_data;
	}

	/**
	 * Proxy of the private getters and wrapped posts attributes.
	 *
	 * @param string $name Attribute name.
	 *
	 * @return mixed Attribute value or null if attribute does not exists.
	 */
	public function __get( $name ) {
		switch ( $name ) {
			case 'bridge':
				return $this->bridge();
			case 'foreign_id':
				return $this->foreign_id();
			default:
				$post_data = (array) $this->post;
				return $post_data[ $name ] ?? null;
		}
	}

	/**
	 * Remote data attributes getter.
	 *
	 * @param string $attr Remote attribute name.
	 * @param mixed  $default Default value if attribute does not have value.
	 *
	 * @return mixed Remote value.
	 */
	public function get( $attr, $default = null ) {
		$data = $this->fetch();

		if ( is_wp_error( $data ) ) {
			return;
		}

		$value = ( new JSON_Finger( $data ) )->get( $attr );
		if ( $value ) {
			return $value;
		}

		return $default;
	}

	/**
	 * Gets the remote cpt's bridge instance.
	 *
	 * @return Post_Bridge|null Post_Bridge instance.
	 */
	private function bridge() {
		return PBAPI::get_bridge( $this->post_type );
	}

	/**
	 * Foreign key value getter.
	 *
	 * @return string|int Brige foreign key value.
	 */
	private function foreign_id() {
		if ( empty( $this->foreign_id ) ) {
			$this->foreign_id = get_post_meta(
				$this->post->ID,
				self::FOREIGN_KEY_HANDLE,
				true
			) ?: null;
		}

		return $this->foreign_id;
	}

	/**
	 * Wrapped post taxonomy terms getter.
	 *
	 * @param string $tax_name Taxonomy name.
	 *
	 * @return array|WP_Error Terms of the taxonomy attacheds to the post.
	 */
	public function terms( $tax_name ) {
		return get_the_terms( $this->ID, $tax_name );
	}

	/**
	 * Wrapped post custom fields getter.
	 *
	 * @param string  $field Custom field name.
	 * @param boolean $single Retrive a single value.
	 *
	 * @return mixed Custom field value or false.
	 */
	public function meta( $field, $single = true ) {
		return get_post_meta( $this->ID, $field, $single );
	}
}
