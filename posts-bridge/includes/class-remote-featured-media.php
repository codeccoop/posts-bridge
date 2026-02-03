<?php

namespace POSTS_BRIDGE;

use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * Handle remote featured medias.
 */
class Remote_Featured_Media {

	/**
	 * Handle default thumbnail id plugin's option name.
	 *
	 * @var string
	 */
	public const THUMBNAIL_HANDLE = '_posts_bridge_thumbnail';

	/**
	 * Handle featured media memory meta key.
	 *
	 * @var string
	 */
	private const MEMORY_KEY = '_posts_bridge_attachment_src';

	/**
	 * Gets plugin's default thumbnail attachment ID.
	 *
	 * @return int Thumbnail attachment ID.
	 */
	public static function default_thumbnail_id() {
		return (int) get_option( self::THUMBNAIL_HANDLE, 0 );
	}

	/**
	 * Gets plugin default thumbnail attachment.
	 *
	 * @return WP_Post|null Thumbnail attachment.
	 */
	public static function default_thumbnail() {
		return get_post( self::default_thumbnail_id() );
	}

	/**
	 * Gets the featured media source type
	 *
	 * @param mixed $src Featured media source.
	 *
	 * @return string Source type.
	 */
	public static function src_type( $src ) {
		if ( is_int( $src ) ) {
			return 'id';
		} elseif ( filter_var( $src, FILTER_VALIDATE_URL ) ) {
			return 'url';
		} elseif (
			is_string( $src ) &&
			base64_encode( base64_decode( $src ) ) === $src
		) {
			return 'base64';
		} else {
			return null;
		}
	}

	/**
	 * Gets file type info from a filepath
	 *
	 * @param string $filepath Path of the file.
	 *
	 * @return array|null File type data.
	 */
	public static function file_type( $filepath ) {
		if ( empty( $filepath ) || ! is_string( $filepath ) ) {
			return null;
		}

		$filetype = wp_check_filetype( $filepath, null );
		if ( ! $filetype['type'] ) {
			$filetype['type'] = mime_content_type( $filepath );
		}

		return $filetype;
	}

	/**
	 * Public remote featured media handle method.
	 *
	 * @param mixed        $src Featured media source.
	 * @param string|null  $filename Name of the source file.
	 * @param Backend|null $backend Backend object.
	 *
	 * @return int Generated attachment ID.
	 */
	public static function handle( $src, $filename = null, $backend = null ) {
		if ( ! empty( $src ) ) {
			$type = self::src_type( $src );
			switch ( $type ) {
				case 'url':
					$attachment_id = self::attach_url( $src, $backend );
					break;
				case 'base64':
					$attachment_id = self::attach_b64( $src, $filename );
					break;
				case 'id':
					return (int) $src;
				default:
					return self::default_thumbnail_id();
			}
		} else {
			return self::default_thumbnail_id();
		}

		if ( $attachment_id ) {
			self::memorize( $attachment_id, $src );
		}

		return $attachment_id;
	}

	/**
	 * Store image from base64 sources and attaches it to the wp media store.
	 *
	 * @param string      $src Base64 string.
	 * @param string|null $filename Name of the source file.
	 *
	 * @return int|null ID of the created attachment.
	 */
	private static function attach_b64( $src, $filename ) {
		$attachment_id = self::memory( $src );
		if ( $attachment_id ) {
			return $attachment_id;
		}

		$content = base64_decode( $src );

		// Skip path parts from filename.
		if ( $filename ) {
			$filename = basename( $filename );
		}

		// Set timestamp as filename.
		if ( ! $filename ) {
			$filename = 'img_' . time();
		}

		$filepath = get_temp_dir() . $filename;
		return self::attach( $filepath, $content );
	}

	/**
	 * Download images from remote sources and attaches it to the wp media store.
	 *
	 * @param string       $src Image URL.
	 * @param Backend|null $backend Backend object.
	 *
	 * @return int|null ID of the created attachment.
	 */
	private static function attach_url( $src, $backend ) {
		$attachment_id = self::memory( $src );
		if ( $attachment_id ) {
			return $attachment_id;
		}

		$url = wp_parse_url( $src );
		if ( isset( $url['query'] ) ) {
			$src = str_replace( '?' . $url['query'], '', $src );
		}

		if ( $backend ) {
			$response = $backend->get( $src );
		} else {
			$response = wp_remote_get( $src );
		}

		if ( is_wp_error( $response ) || 300 <= $response['response']['code'] ) {
			return;
		}

		return self::attach( $src, $response['body'] );
	}

	/**
	 * Attach an image to the wp media store.
	 *
	 * @param string  $src Image source.
	 * @param bytes   $content Binary file content.
	 * @param boolena $unlink Whether to unlink the source on exit.
	 *
	 * @return int ID of the created attachment.
	 */
	private static function attach( $src, $content, $unlink = true ) {
		$filename = basename( $src );

		// unlink temp files.
		if ( is_file( $src ) && $unlink ) {
			wp_delete_file( $src );
		}

		// get wp current upload dir.
		$upload_dir = wp_upload_dir();
		if ( wp_mkdir_p( $upload_dir['path'] ) ) {
			$filepath = $upload_dir['path'] . '/' . $filename;
		} else {
			$filepath = $upload_dir['basedir'] . '/' . $filename;
		}

		// Prevent filename collisions.
		if ( file_exists( $filepath ) ) {
			$_filepath = dirname( $filepath ) . '/' . time();
			$pathinfo  = pathinfo( $filepath );

			if ( isset( $pathinfo['extension'] ) ) {
				$_filepath .= '.' . $pathinfo['extension'];
			}

			$filepath = $_filepath;
		}

		$success = is_writable( dirname( $filepath ) ) && file_put_contents( $filepath, $content );
		if ( ! $success ) {
			return;
		}

		$filetype = self::file_type( $filepath );

		// exits if unkown file type.
		if ( ! $filetype['type'] ) {
			wp_delete_file( $filepath );
			return;
		}

		// exits if file is not an image.
		if ( ! preg_match( '/image\/(.*)$/', $filetype['type'] ) ) {
			wp_delete_file( $filepath );
			return;
		}

		// Creates new attachment.
		$attachment_id = wp_insert_attachment(
			array(
				'post_mime_type' => $filetype['type'],
				'post_title'     => sanitize_title( $filename ),
				'post_content'   => '',
				'post_status'    => 'inherit',
			),
			$filepath
		);

		// exits if attach process error.
		if ( is_wp_error( $attachment_id ) ) {
			wp_delete_file( $filepath );
			return $attachment_id;
		}

		require_once ABSPATH . 'wp-admin/includes/image.php';
		$attach_data = wp_generate_attachment_metadata( $attachment_id, $filepath );
		wp_update_attachment_metadata( $attachment_id, $attach_data );

		return $attachment_id;
	}

	/**
	 * Store media source as attachment's post meta to recover in future handles.
	 *
	 * @param int    $attachment_id ID of the attachment post type.
	 * @param string $src Featured media source.
	 */
	private static function memorize( $attachment_id, $src ) {
		$src = substr( $src, 0, 1e4 );
		update_post_meta( $attachment_id, self::MEMORY_KEY, $src );
	}

	/**
	 * Try to recover attachment id from posts meta.
	 *
	 * @param string $src Media source.
	 *
	 * @return int|null Found ID.
	 */
	private static function memory( $src ) {
		$attachments = get_posts(
			array(
				'post_type'      => 'attachment',
				'posts_per_page' => 1,
				'meta_key'       => self::MEMORY_KEY,
				'meta_value'     => substr( $src, 0, 1e4 ),
			)
		);

		if ( count( $attachments ) ) {
			return $attachments[0]->ID;
		}
	}

	/**
	 * Register the plugin default thumbnail as a WP_Attachment on plugin activations.
	 */
	public static function setup_default_thumbnail() {
		$attachment_id = self::default_thumbnail_id();
		if ( $attachment_id ) {
			$attachment = get_post( $attachment_id );
			if ( $attachment ) {
				return;
			}
		}

		$static_path = apply_filters(
			'posts_bridge_default_thumbnail',
			dirname( plugin_dir_path( __FILE__ ) ) . '/assets/posts-bridge-thumbnail.webp'
		);

		$attachment_id = self::attach(
			$static_path,
			file_get_contents( $static_path ),
			false
		);

		$attachment_id = $attachment_id ?: 0;

		add_option( self::THUMBNAIL_HANDLE, $attachment_id );
	}

	/**
	 * Removes the default thumbnail attchment on plugin deactivations.
	 */
	public static function remove_default_thumbnail() {
		$attachment_id = self::default_thumbnail_id();
		if ( $attachment_id ) {
			$query = new WP_Query(
				array(
					'meta_key'   => '_thumbnail_id',
					'meta_value' => $attachment_id,
				)
			);

			if ( ! $query->found_posts ) {
				$file = get_attached_file( $attachment_id );
				wp_delete_attachment( $attachment_id, true );
				delete_option( self::THUMBNAIL_HANDLE );
				if ( is_file( $file ) ) {
					wp_delete_file( $file );
				}
			}
		}
	}
}
