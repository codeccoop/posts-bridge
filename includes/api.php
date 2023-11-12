<?php

/* Store post external thumbnail */
add_action('rest_insert_' . WPCT_REMOTE_CPT_POST_TYPE, 'wpct_remote_cpt_insert_post', 10, 3);
function wpct_remote_cpt_insert_post($post, $request, $is_new)
{
    $payload = $request->get_json_params();

    if (isset($payload['thumbnail'])) {
        $img_info = $payload['thumbnail'];
        $attachment_id = wpct_remote_cpt_store_external_image($img_info, $post->ID, $is_new);
        set_post_thumbnail($post->ID, $attachment_id);
    }
}

/* Store external image as attachment */
function wpct_remote_cpt_store_external_image($img_info, $post_id, $is_new)
{
    if (!$img_info) throw new Exception('NULL remote image resource');

    if (!$is_new) {
        $thumbnail_id = get_post_thumbnail_id($post_id);
        $source = get_post_meta($thumbnail_id, '_wpct_remote_cpt_img_source', true);
        $modified = get_post_meta($thumbnail_id, '_wpct_remote_cpt_img_modified', true);
        if ($source === $img_info['url'] && $modified === $img_info['modified']) {
            return;
        }
    }

    $query = new WP_Query([
        'post_type' => 'attachment',
        'posts_per_page' => 1,
        'post_status' => 'inherit',
        'meta_query' => [
            [
                'key' => '_wpct_remote_cpt_img_source',
                'value' => $img_info['url'],
                'compare' => '=',
            ],
            [
                'key' => '_wpct_remote_cpt_img_modified',
                'value' => $img_info['modified'],
                'compare' => '=',
            ],
        ]
    ]);

    foreach ($query->posts as $attachment) {
        return $attachment->ID;
    }

    $filename = basename($img_info['url']);
    $path = ABSPATH . 'wp-content/uploads';
    $path .= '/' . date('Y');
    if (!is_dir($path)) mkdir($path);
    $path .= '/' . date('m');
    if (!is_dir($path)) mkdir($path);
    $path .=  '/' . $filename;

    file_put_contents($path, file_get_contents($img_info['url']));

    $filetype = wp_check_filetype($filename);
    if (!$filetype['type']) {
        $filetype['type'] = mime_content_type($path);
    }

    $attachment = [
        'post_mime_type' => $filetype['type'],
        'post_title' => sanitize_title($filename),
        'post_content' => '',
        'post_status' => 'inherit'
    ];

    $attachment_id = wp_insert_attachment($attachment, $path);
    if (is_wp_error($attachment_id)) throw new Exception();
    update_post_meta($attachment_id, '_wpct_remote_cpt_img_source', $img_info['url']);
    update_post_meta($attachment_id, '_wpct_remote_cpt_img_modified', $img_info['modified']);

    require_once(ABSPATH . 'wp-admin/includes/image.php');

    $attach_data = wp_generate_attachment_metadata($attachment_id, $path);
    wp_update_attachment_metadata($attachment_id, $attach_data);

    return $attachment_id;
}

/* Build endpoint url */
function wpct_remote_cpt_endpoint($id)
{
    if (WPCT_REMOTE_CP_ENV === 'development') {
        return dirname(dirname(__FILE__)) . '/data/' . $id . '.json';
    } else {
        return WPCT_REMOTE_CPT_ENDPOINT . '/' . $id;
    }
}

/* Request landing payload */
function wpct_remote_cpt_get_data($post_id, $lng_code = null)
{
    $endpoint = wpct_remote_cpt_endpoint($post_id);

    wpct_remote_cpt_attach_lang_middleware($lng_code);

    if (WPCT_remote_cpt_ENV === 'development') {
        $file = fopen($endpoint, 'r');
        $data = json_decode(fread($file, filesize($endpoint)), true)['landing'];
        fclose($file);
    } else {
        $response = wpct_oc_get_odoo($endpoint);
        if (!$response || $response['response']['code'] != 200) {
            throw new Exception('Unable to connect to Odoo');
        }
        $data = json_decode($response['body'], true);
    }

    remove_filter('wpml_post_language_details', 'wpct_remote_cpt_lang_middleware', 99, 1);

    return $data;
}

/* Intercept wpml_post_language_details to localize api calls */
function wpct_remote_cpt_attach_lang_middleware($lng_code)
{
    if (!$lng_code) return;

    add_option('wpct_remote_cpt_api_lang', $lng_code);
    add_filter('wpml_post_language_details', '_wpct_remote_cpt_intercept_language', 99);
}

function _wpct_remote_cpt_intercept_language($current_language)
{
    $api_language = get_option('wpct_remote_cpt_api_lang');
    if (!$api_language) return $current_language;

    $active_languages = apply_filters('wpml_active_languages', null);
    foreach ($active_languages as $language) {
        if ($language['language_code'] == $api_language) {
            $current_language = $language;
        }
    }

    remove_filter('wpml_post_language_details', '_wpct_remote_cpt_intercept_language', 99);
    delete_option('wpct_remote_cpt_api_lang');

    return $current_language;
}
