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

	/**
	 * Returns the collection of known custom fields related to a given post type.
	 * Known custom fields includes the global $wp_meta_keys object, ACF field groups
	 * and the meta_key column of the wp_postmeta db table.
	 *
	 * @param string $post_type Post type key.
	 *
	 * @return array
	 */
	public static function custom_fields( $post_type ) {
		global $wp_meta_keys;
		$pt_meta = $wp_meta_keys['post'][ $post_type ] ?? array();

		$custom_fields = array();

		foreach ( $pt_meta as $name => $defn ) {
			$custom_fields[] = array(
				'name'   => $name,
				'schema' => array(
					'type'    => $defn['type'],
					'default' => $defn['default'] ?? '',
				),
				'_acf'   => false,
			);
		}

		if ( Posts_Bridge::acf_support() ) {
			$groups = acf_get_field_groups();

			foreach ( $groups as $group ) {
				if ( ! is_array( $group['location'] ?? false ) ) {
					continue;
				}

				$match = true;

				// Iterate over a list of location rule_groups and evaluate
				// with or operators: a match in any of the groups results
				// in a positive output.
				foreach ( $group['location'] as $rule_group ) {
					// Iterate over a list of location rules for each rule_group
					// and evaluate with and operators: all rules must be passed
					// in order to result in a positive output.
					foreach ( $rule_group as $rule ) {
						$rule = acf_validate_location_rule( $rule );

						if ( 'post_type' !== $rule['param'] ) {
							continue;
						}

						if ( '==' === $rule['operator'] && $rule['value'] !== $post_type ) {
							$match = false;
						} elseif ( '!=' === $rule['operator'] && $rule['value'] === $post_type ) {
							$match = false;
						}

						if ( ! $match ) {
							break;
						}
					}

					if ( ! $match ) {
						break;
					}
				}

				if ( $match ) {
					$fields = acf_get_fields( $group['ID'] );

					foreach ( $fields as $field ) {
						switch ( $field['type'] ) {
							case 'number':
							case 'boolean':
								$field_type = $field['type'];
								break;
							case 'text':
							case 'select':
							default:
								$field_type = 'string';
								break;
						}

						$pt_meta[ $field['name'] ] = array(
							'type'              => $field_type,
							'label'             => $field['label'],
							'description'       => '',
							'single'            => true,
							'sanitize_callback' => null,
							'auth_callback'     => '__return_true',
							'show_in_rest'      => true,
							'revisions_enabled' => true,
							'_name'             => $field['_name'],
						);

						$pt_meta[ '_' . $field['name'] ] = $pt_meta[ $field['name'] ];

						$custom_fields[] = array(
							'name'   => $field['name'],
							'schema' => array( 'type' => $field_type ),
							'_acf'   => true,
						);
					}
				}
			}
		}

		global $wpdb;

		// phpcs:disable WordPress.DB.DirectDatabaseQuery
		$result = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT DISTINCT pm.meta_key FROM {$wpdb->postmeta} pm LEFT JOIN {$wpdb->posts} p ON pm.post_id = p.ID WHERE p.post_type = %s",
				$post_type,
			),
			ARRAY_A,
		);
		// phpcs:enable

		$internal_fields = array( '_edit_lock', '_posts_bridge_foreign_key', '_thumbnail_id' );

		foreach ( $result as $record ) {
			if ( in_array( $record['meta_key'], $internal_fields, true ) ) {
				continue;
			}

			if ( ! isset( $pt_meta[ $record['meta_key'] ] ) ) {
				$custom_fields[] = array(
					'name'   => $record['meta_key'],
					'schema' => array( 'type' => 'string' ),
					'_acf'   => false,
				);
			}
		}

		return $custom_fields;
	}
}
