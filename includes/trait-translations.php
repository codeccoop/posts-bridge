<?php

namespace POSTS_BRIDGE;

if (!defined('ABSPATH')) {
	exit();
}

/**
 * Post's translation methods.
 */
trait Translations
{
    /**
     * Create a post translation for each active language on the WordPress instance.
     *
     * @param integer $post_id Post ID.
     */
    public static function do_translations($post_id)
    {
        global $remote_cpt;
        $global = $remote_cpt;
        $actives = apply_filters('wpct_i18n_active_languages', []);
        $default = apply_filters('wpct_i18n_default_language', null);
        $translated = apply_filters('wpct_i18n_post_translations', [], $post_id);

        foreach ($actives as $lang) {
            if ($lang === $default) {
                continue;
            }

            if (isset($translated[$lang])) {
                $trans_id = $translated[$lang];
            } else {
                $trans_id = apply_filters('wpct_i18n_translate_post', null, $post_id, $lang);
            }

            $remote_cpt = new Remote_CPT($trans_id);
            do_action('posts_bridge_translation', [
                'post_id' => $trans_id,
                'lang' => $lang,
                'bound' => $post_id
            ]);
        }

        $remote_cpt = $global;
    }

    /**
     * Drops plugin translations.
     *
     * @param integer $post_id Post ID.
     */
    public static function drop_translations($post_id)
    {
        $translations = apply_filters('wpct_i18n_post_translations', [], $post_id);
        foreach (array_values($translations) as $trans_id) {
            if ($trans_id === $post_id) {
                continue;
            }

            wp_delete_post($trans_id, true);
        }
    }
}
