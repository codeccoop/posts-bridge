<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Handle remote featured medias.
 */
class Remote_Featured_Media
{
    public const _default_thumbnail_handle = '_posts_bridge_thumbnail';

    /**
     * Gets plugin's default thumbnail attachment ID.
     *
     * @return int Thumbnail attachment ID.
     */
    public static function get_default_thumbnail_id()
    {
        return (int) get_option(static::_default_thumbnail_handle);
    }

    /**
     * Gets plugin default thumbnail attachment.
     *
     * @return WP_Post|null Thumbnail attachment.
     */
    public static function get_default_thumbnail()
    {
        return get_post($this->get_default_thumbnail_id());
    }

    /**
     * Gets the featured media source type
     */
    public static function get_src_type($src)
    {
        if (is_int($src)) {
            return 'id';
        } elseif (filter_var($src, FILTER_VALIDATE_URL)) {
            return 'url';
        } elseif (is_string($src) && base64_encode(base64_decode($src))) {
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
     * @returns array|null File type data.
     */
    public static function get_file_type($filepath)
    {
        if (empty($filepath) || !is_string($filepath)) {
            return null;
        }

        $filetype = wp_check_filetype($filepath, null);
        if (!$filetype['type']) {
            $filetype['type'] = mime_content_type($filepath);
        }

        return $filetype;
    }

    public static function handle($src)
    {
        if (!empty($src)) {
            $type = self::get_src_type($src);
            switch ($type) {
                case 'url':
                    return self::attach_url($src);
                case 'base64':
                    return self::attach_b64($src);
                case 'id':
                    return (int) $src;
                default:
                    return self::get_default_thumbnail_id();
            }
        } else {
            return self::get_default_thumbnail_id();
        }
    }

    /**
     * Store image from base64 sources and attaches it to the wp media store.
     *
     * @param string $src Base64 string.
     * @param string $filename Op
     *
     * @return int|null ID of the created attachment.
    */
    public static function attach_b64($src, $filename = null)
    {
        if (self::get_src_type($src) !== 'base64') {
            return null;
        }

        $content = base64_decode($src);

        // Skip path parts from filename
        if ($filename) {
            $filename = basename($filename);
        }

        // Set timestamp as filename
        if (!$filename) {
            $filename = 'img_' . time();
        }

        $filepath = get_temp_dir() . '/' . time();
        return self::attach($filepath, $content);
    }

    /**
     * Download images from remote sources and attaches it to the wp media store.
     *
     * @param string $src Image URL.
     *
     * @return int|null ID of the created attachment.
    */
    public static function attach_url($src)
    {
        if (self::get_src_type($src) !== 'url') {
            return null;
        }

        return self::attach($src, file_get_contents($src));
    }

    /**
     * Attach an image to the wp media store.
     *
     * @param string $src Image source.
     * @param bytes $content Binary file content.
     *
     * @return int ID of the created attachment.
     */
    private static function attach($src, $content)
    {
        $filename = basename($src);

        // get wp current upload dir
        $upload_dir = wp_upload_dir();
        if (wp_mkdir_p($upload_dir['path'])) {
            $filepath = $upload_dir['path'] . '/' . $filename;
        } else {
            $filepath = $upload_dir['basedir'] . '/' . $filename;
        }

        // Prevent filename collisions
        if (file_exists($filepath)) {
            $filepath = dirname($filepath) . '/' . time();
            if ($ext = pathinfo($filepath)['extension']) {
                $filepath .= '.' . $ext;
            }
        }

        file_put_contents($filepath, $content);

        // unlink temp files
        if (is_file($src)) {
            unlink($src);
        }

        $filetype = self::get_file_type($filepath);

        // exits if unkown file type
        if (!$filetype['type']) {
            unlink($filepath);
            return null;
        }

        // exits if file is not an image
        if (!preg_match('/image\/(.*)$/', $filetype['type'])) {
            unlink($filepath);
            return null;
        }

        // Creates new attachment
        $attachment_id = wp_insert_attachment([
            'post_mime_type' => $filetype['type'],
            'post_title' => sanitize_title($filename),
            'post_content' => '',
            'post_status' => 'inherit',
        ], $filepath);

        // exits if attach process error
        if (is_wp_error($attachment_id)) {
            unlink($filepath);
            return $attachment_id;
        }

        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attachment_id, $filepath);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return $attachment_id;
    }
}
