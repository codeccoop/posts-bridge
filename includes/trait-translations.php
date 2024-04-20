<?php

namespace WPCT_RCPT;

trait Translations
{
    public static function do_translations($post_id)
    {
        global $remote_cpt;
        $global = $remote_cpt;
        $actives = apply_filters('wpct_i18n_active_languages', null);
        $default = apply_filters('wpct_i18n_default_language', null);
        $translated = apply_filters('wpct_i18n_post_translations', $post_id);

        foreach ($actives as $lang) {
            if ($lang === $default) {
                continue;
            }

            if (isset($translated[$lang])) {
                $trans_id = $translated[$lang];
            } else {
                $trans_id = apply_filters('wpct_i18n_translate_post', $post_id, $lang);
            }

            $remote_cpt = new Model($trans_id);
            do_action('wpct_rcpt_translation', [
                'post_id' => $trans_id,
                'lang' => $lang,
                'bound' => $post_id
            ]);
        }

        $remote_cpt = $global;
    }

    public static function drop_translations($post_id)
    {
        $translations = apply_filters('wpct_i18n_post_translations', $post_id);
        foreach (array_values($translations) as $trans_id) {
            if ($trans_id === $post_id) {
                continue;
            }

            wp_delete_post($trans_id, true);
        }
    }
}
