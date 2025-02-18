<?php

namespace POSTS_BRIDGE;

use Error;
use Exception;
use WPCT_ABSTRACT\Singleton;

if (!defined('ABSPATH')) {
    exit();
}

class I18n extends Singleton
{
    private const cron_opt = '_posts_bridge_cron_context';
    private const detach_hook = '_posts_bridge_do_detacheds';

    public static function setup()
    {
        return self::get_instance();
    }

    private static function do_detacheds()
    {
        $detacheds = get_option(self::cron_opt, []);

        $now = time();
        $delay = 0;
        $errors = [];
        $postposed = [];
        foreach ($detacheds as $detached) {
            [
                'post_id' => $post_id,
                'time' => $time,
            ] = $detached;

            if ($time > $now) {
                $delay = min($delay, $time - $now);
                $postposed[] = $detached;
                continue;
            }

            try {
                self::do_translations($post_id);
            } catch (Error | Exception $e) {
                $errors[] = [
                    'post_id' => get_the_ID($post_id),
                    'post_title' => get_the_title($post_id),
                    'error' => $e,
                ];
            }
        }

        update_option(self::cron_opt, $postposed);

        if (count($errors) > 0) {
            $to = get_bloginfo('admin_email');
            $subject = __('Posts Bridge translation error', 'posts-bridge');
            $body = print_r($errors, true);
            wp_mail($to, $subject, $body);
        }

        if ($delay > 0) {
            wp_schedule_single_event($now + $delay, self::detach_hook, []);
        }
    }

    /**
     * Detach a task and schedule it to the next detached hook trigger.
     *
     * @param string $task Name of the function to execute. It should be globally accessible.
     * @param any $payload Argument to be passed to the task call.
     * @param integer $delay Time to next detached hook trigger.
     */
    private static function detach_translation($post_id, $delay = 1)
    {
        if (!wp_next_scheduled(self::detach_hook)) {
            wp_schedule_single_event(time() + $delay, self::detach_hook, []);
        }

        $contexts = get_option(self::cron_opt, []);

        foreach ($contexts as $ctxt) {
            if ((int) $ctxt['post_id'] === (int) $post_id) {
                return;
            }
        }

        $contexts[] = [
            'post_id' => $post_id,
            'time' => time() + $delay,
        ];

        update_option(self::cron_opt, $contexts, false);
    }

    /**
     * Drops plugin translations.
     *
     * @param integer $post_id Post ID.
     */
    private static function drop_translations($post_id)
    {
        $translations = apply_filters(
            'wpct_i18n_post_translations',
            [],
            $post_id
        );

        foreach ($translations as $trans_id) {
            if ($trans_id === $post_id) {
                continue;
            }

            wp_delete_post($trans_id, true);
        }
    }

    /**
     * Handle post translations on data updates.
     *
     * @param integer $post_id ID of the updated post.
     * @param WP_Post $post Instance of the opdated post.
     */
    public static function translate_post($post_id, $post)
    {
        // Exit if is not a remote cpt
        if (!in_array($post->post_type, Remote_CPT::post_types())) {
            return;
        }

        // Exit if the post is a translation
        if (apply_filters('wpct_i18n_is_translation', false, $post_id)) {
            return;
        }

        // Exit if post is in translation process
        if ($post->post_status === 'translating') {
            return;
        }

        // If new status is trash, remove post translations
        if ($post->post_status === 'trash') {
            self::drop_translations($post_id);
            wp_delete_post($post_id, true);
            return;
        }

        self::detach_translation($post_id);
    }

    /**
     * Create a post translation for each active language on the WordPress instance.
     *
     * @param integer $post_id Post ID.
     */
    public static function do_translations($post_id)
    {
        global $posts_bridge_remote_cpt;
        $global = $posts_bridge_remote_cpt;

        $actives = apply_filters('wpct_i18n_active_languages', []);
        $default = apply_filters('wpct_i18n_default_language', null);
        $translated = apply_filters(
            'wpct_i18n_post_translations',
            [],
            $post_id
        );

        foreach ($actives as $lang) {
            if ($lang === $default) {
                continue;
            }

            if (isset($translated[$lang])) {
                $trans_id = $translated[$lang];
            } else {
                $trans_id = null;
                do_action_ref_array('wpct_i18n_translate_post', [
                    $post_id,
                    $lang,
                    &$trans_id,
                ]);
            }

            $posts_bridge_remote_cpt = new Remote_CPT($trans_id);

            do_action('posts_bridge_translation', [
                'post_id' => $trans_id,
                'lang' => $lang,
                'bound' => $post_id,
            ]);

            $posts_bridge_remote_cpt = $global;
        }
    }

    protected function construct(...$args)
    {
        add_action(self::detach_hook, static function () {
            self::do_detacheds();
        });

        // Translate remote cpts on updates
        add_action(
            'wp_insert_post',
            static function ($post_id, $post) {
                self::translate_post($post_id, $post);
            },
            90,
            2
        );
    }
}

I18n::setup();
