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
    /**
     * Handle default thumbnail id plugin's option name.
     *
     * @var string _default_thumbnail_handle Option name.
     */
    public const _default_thumbnail_handle = '_posts_bridge_thumbnail';

    /**
     * Handle featured media memory meta key.
     *
     * @var string _memory_meta_key Meta key.
     */
    private const _memory_meta_key = '_posts_bridge_attachment_src';

    /**
     * Gets plugin's default thumbnail attachment ID.
     *
     * @return int Thumbnail attachment ID.
     */
    public static function default_thumbnail_id()
    {
        return (int) get_option(static::_default_thumbnail_handle);
    }

    /**
     * Gets plugin default thumbnail attachment.
     *
     * @return WP_Post|null Thumbnail attachment.
     */
    public static function default_thumbnail()
    {
        return get_post($this->default_thumbnail_id());
    }

    /**
     * Gets the featured media source type
     *
     * @param mixed $src Featured media source.
     *
     * @return string Source type.
     */
    public static function src_type($src)
    {
        if (is_int($src)) {
            return 'id';
        } elseif (filter_var($src, FILTER_VALIDATE_URL)) {
            return 'url';
        } elseif (
            is_string($src) &&
            base64_encode(base64_decode($src)) === $src
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
    public static function file_type($filepath)
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

    /**
     * Public remote featured media handle method.
     *
     * @param mixed $src Featured media source.
     *
     * @return int Generated attachment ID.
     */
    public static function handle($src, $filename = null)
    {
        if (!empty($src)) {
            $type = self::src_type($src);
            switch ($type) {
                case 'url':
                    $attachment_id = self::attach_url($src);
                    break;
                case 'base64':
                    $attachment_id = self::attach_b64($src, $filename);
                    break;
                case 'id':
                    return (int) $src;
                default:
                    return self::default_thumbnail_id();
            }
        } else {
            return self::default_thumbnail_id();
        }

        self::memorize($attachment_id, $src);
        return $attachment_id;
    }

    /**
     * Store image from base64 sources and attaches it to the wp media store.
     *
     * @param string $src Base64 string.
     * @param string $filename Op
     *
     * @return int|null ID of the created attachment.
     */
    private static function attach_b64($src, $filename)
    {
        if ($attachment_id = self::memory($src)) {
            return $attachment_id;
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

        $filepath = get_temp_dir() . $filename;
        return self::attach($filepath, $content);
    }

    /**
     * Download images from remote sources and attaches it to the wp media store.
     *
     * @param string $src Image URL.
     *
     * @return int|null ID of the created attachment.
     */
    private static function attach_url($src)
    {
        if ($attachment_id = self::memory($src)) {
            return $attachment_id;
        }

        $url = parse_url($src);
        if (isset($url['query'])) {
            $src = str_replace('?' . $url['query'], '', $src);
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

        // unlink temp files
        if (is_file($src)) {
            unlink($src);
        }

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
            $pathinfo = pathinfo($filepath);
            if (isset($pathinfo['extension'])) {
                $filepath .= '.' . $pathinfo['extension'];
            }
        }

        $success = file_put_contents($filepath, $content);
        if (!$success) {
            return null;
        }

        $filetype = self::file_type($filepath);

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
        $attachment_id = wp_insert_attachment(
            [
                'post_mime_type' => $filetype['type'],
                'post_title' => sanitize_title($filename),
                'post_content' => '',
                'post_status' => 'inherit',
            ],
            $filepath
        );

        // exits if attach process error
        if (is_wp_error($attachment_id)) {
            unlink($filepath);
            return $attachment_id;
        }

        require_once ABSPATH . 'wp-admin/includes/image.php';
        $attach_data = wp_generate_attachment_metadata(
            $attachment_id,
            $filepath
        );
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return $attachment_id;
    }

    /**
     * Store media source as attachment's post meta to recover in future handles.
     *
     * @param int $attachment_id ID of the attachment post type.
     * @param string $src Featured media source.
     */
    private static function memorize($attachment_id, $src)
    {
        $src = substr($src, 0, 1e4);
        update_post_meta($attachment_id, self::_memory_meta_key, $src);
    }

    /**
     * Try to recover attachment id from posts meta.
     *
     * @param string $src Media source.
     *
     * @return int|null Found ID.
     */
    private static function memory($src)
    {
        $attachments = get_posts([
            'post_type' => 'attachment',
            'posts_per_page' => 1,
            'meta_key' => self::_memory_meta_key,
            'meta_value' => substr($src, 0, 1e4),
        ]);

        if (count($attachments)) {
            return $attachments[0]->ID;
        }
    }
}
