<?php
/**
 * Class PBAPI
 *
 * @package postsbridge
 */

use POSTS_BRIDGE\Settings_Store;
use POSTS_BRIDGE\Posts_Bridge;
use POSTS_BRIDGE\Addon;
use POSTS_BRIDGE\Post_Bridge;
use HTTP_BRIDGE\Backend;
use HTTP_BRIDGE\Credential;
use POSTS_BRIDGE\Custom_Post_Type;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Public php API of the plugin.
 */
class PBAPI {

	/**
	 * Gets an addon instance by name.
	 *
	 * @param string $name Addon name.
	 *
	 * @return Addon|null
	 */
	public static function get_addon( $name ) {
		return Addon::addon( $name );
	}

	/**
	 * Gets the list of registered post types.
	 *
	 * @return array
	 */
	public static function get_post_types() {
		return Custom_Post_Type::post_types();
	}

	/**
	 * Gets the list of registered custom post types.
	 *
	 * @return array
	 */
	public static function get_custom_post_types() {
		return apply_filters( 'posts_bridge_custom_post_types', array() );
	}

	/**
	 * Gets a custom post type definition by name.
	 *
	 * @param string $name Post type name.
	 *
	 * @return array|null
	 */
	public static function get_custom_post_type( $name ) {
		return self::get_custom_post_types()[ $name ] ?? null;
	}

	/**
	 * Gets the list of bridged post types.
	 *
	 * @return array
	 */
	public static function get_remote_cpts() {
		return apply_filters( 'posts_bridge_remote_cpts', array() );
	}

	/**
	 * Gets a bridge by name and addon.
	 *
	 * @param string $post_type Bridge post type.
	 *
	 * @return Post_Bridge|null
	 */
	public static function get_bridge( $post_type ) {
		$bridges = self::get_bridges();
		foreach ( $bridges as $bridge ) {
			if ( $bridge->post_type === $post_type ) {
				return $bridge;
			}
		}
	}

	/**
	 * Gets the collection of available bridges.
	 *
	 * @return Post_Bridge[]
	 */
	public static function get_bridges() {
		return apply_filters( 'posts_bridge_bridges', array() );
	}

	/**
	 * Gets the collection of available bridges filtered by addon name.
	 *
	 * @param string $addon Addon name.
	 *
	 * @return Post_Bridge[]
	 */
	public static function get_addon_bridges( $addon ) {
		return apply_filters( 'posts_bridge_bridges', array(), $addon );
	}

	/**
	 * Inserts or updates the bridge data to the database.
	 *
	 * @param array  $data Bridge data.
	 * @param string $addon Addon name.
	 *
	 * @return boolean
	 */
	public static function save_bridge( $data, $addon ) {
		$addon = self::get_addon( $addon );
		if ( ! $addon ) {
			return false;
		}

		$bridge_class = $addon::BRIDGE;
		$bridge       = new $bridge_class( $data );

		if ( ! $bridge->is_valid ) {
			return false;
		}

		return $bridge->save();
	}

	/**
	 * Deletes the bridge data from the database.
	 *
	 * @param string $name Bridge name.
	 * @param string $addon Addon name.
	 *
	 * @return boolean
	 */
	public static function delete_bridge( $name, $addon ) {
		$bridge = self::get_bridge( $name, $addon );

		if ( ! $bridge ) {
			return false;
		}

		return $bridge->delete();
	}

	/**
	 * Gets the bridge schema for a given addon.
	 *
	 * @param string $addon Addon name.
	 *
	 * @return array|null
	 */
	public static function get_bridge_schema( $addon ) {
		$addon = Addon::addon( $addon );

		if ( ! $addon ) {
			return;
		}

		return Post_Bridge::schema( $addon::NAME );
	}

	/**
	 * Gets the collection of available backends.
	 *
	 * @return Backend[]
	 */
	public static function get_backends() {
		return apply_filters( 'http_bridge_backends', array() );
	}

	/**
	 * Gets a backend instance by name.
	 *
	 * @param string $name Backend name.
	 *
	 * @return Backend|null
	 */
	public static function get_backend( $name ) {
		$backends = self::get_backends();

		foreach ( $backends as $backend ) {
			if ( $backend->name === $name ) {
				return $backend;
			}
		}
	}

	/**
	 * Inserts or updates the backend data on the database.
	 *
	 * @param array $data Backend data.
	 *
	 * @return boolean
	 */
	public static function save_backend( $data ) {
		$backend = new Backend( $data );

		if ( ! $backend->is_valid ) {
			return false;
		}

		$setting = Settings_Store::setting( 'http' );
		if ( ! $setting ) {
			return false;
		}

		$backends = $setting->backends ?: array();

		$index = array_search( $backend->name, array_column( $backends, 'name' ), true );

		if ( false === $index ) {
			$backends[] = $data;
		} else {
			$backends[ $index ] = $data;
		}

		$setting->backends = $backends;
		return true;
	}

	/**
	 * Delete the backend data from the database.
	 *
	 * @param string $name Backend name.
	 *
	 * @return boolean
	 */
	public static function delete_backend( $name ) {
		$backend = self::get_backend( $name );

		if ( ! $backend ) {
			return false;
		}

		if ( ! $backend->is_valid ) {
			return false;
		}

		$setting = Settings_Store::setting( 'http' );
		if ( ! $setting ) {
			return false;
		}

		$backends = $setting->backends ?: array();

		$index = array_search( $backend->name, array_column( $backends, 'name' ), true );

		if ( false === $index ) {
			return false;
		}

		array_splice( $backends, $index );
		$setting->backends = $backends;

		return true;
	}

	/**
	 * Gets the backend schema.
	 *
	 * @return array
	 */
	public static function get_backend_schema() {
		return Backend::schema();
	}

	/**
	 * Gets the collection of available credentials.
	 *
	 * @return Credential[]
	 */
	public static function get_credentials() {
		return apply_filters( 'http_bridge_credentials', array() );
	}

	/**
	 * Gets a credential instance by name and addon.
	 *
	 * @param string $name Credential name.
	 *
	 * @return Credential|null
	 */
	public static function get_credential( $name ) {
		$credentials = self::get_credentials();

		foreach ( $credentials as $credential ) {
			if ( $credential->name === $name ) {
				return $credential;
			}
		}
	}

	/**
	 * Inserts or updates the credential data to the database.
	 *
	 * @param array $data Credential data.
	 *
	 * @return boolean
	 */
	public static function save_credential( $data ) {
		$credential = new Credential( $data );

		if ( ! $credential->is_valid ) {
			return false;
		}

		$setting = Settings_Store::setting( 'http' );
		if ( ! $setting ) {
			return false;
		}

		$credentials = $setting->credentials ?: array();

		$index = array_search( $credential->name, array_column( $credentials, 'name' ), true );

		if ( false === $index ) {
			$credentials[] = $data;
		} else {
			$credentials[ $index ] = $data;
		}

		$setting->credentials = $credentials;
		return true;
	}

	/**
	 * Deletes the credential data from the database.
	 *
	 * @param string $name Credential name.
	 *
	 * @return boolean
	 */
	public static function delete_credential( $name ) {
		$credential = self::get_credential( $name );

		if ( ! $credential ) {
			return false;
		}

		if ( ! $credential->is_valid ) {
			return false;
		}

		$setting = Settings_Store::setting( 'http' );
		if ( ! $setting ) {
			return false;
		}

		$credentials = $setting->credentials ?: array();

		$index = array_search( $credential->name, array_column( $credentials, 'name' ), true );

		if ( false === $index ) {
			return false;
		}

		array_splice( $credentials, $index );
		$setting->credentials = $credentials;

		return true;
	}

	/**
	 * Gets the credential schema for a given addon.
	 *
	 * @return array
	 */
	public static function get_credential_schema() {
		return Credential::schema();
	}

	/**
	 * Gets the collection of available templates.
	 *
	 * @return Post_Bridge_Template[]
	 */
	public static function get_templates() {
		return apply_filters( 'posts_bridge_templates', array() );
	}

	/**
	 * Gets the collection of available templates filtered by addon name.
	 *
	 * @param string $addon Addon name.
	 *
	 * @return Post_Bridge_Template[]
	 */
	public static function get_addon_templates( $addon ) {
		return apply_filters( 'posts_bridge_templates', array(), $addon );
	}

	/**
	 * Gets a template instance by name and addon.
	 *
	 * @param string $name Template name.
	 * @param string $addon Addon name.
	 *
	 * @return Post_Bridge_Template|null
	 */
	public static function get_template( $name, $addon ) {
		$templates = self::get_addon_templates( $addon );

		foreach ( $templates as $template ) {
			if ( $template->name === $name ) {
				return $template;
			}
		}
	}
}
