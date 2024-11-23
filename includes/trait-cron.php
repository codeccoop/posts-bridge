<?php

namespace POSTS_BRIDGE;

use Error;

trait Cron
{
    private static $cron_opt = '_posts_bridge_cron_contexts';
    public static $schedule_hook = '_posts_bridge_do_schedule';
    public static $detach_hook = '_posts_bridge_do_detacheds';

    public static function do_detacheds()
    {
        $contexts = get_option(self::$cron_opt, []);

        $errors = [];
        foreach ($contexts as $context) {
            extract($context);
            try {
                $task($payload);
            } catch (Error $e) {
                $errors[] = ['context' => $context, 'error' => $e];
            }
        }

        delete_option(self::$cron_opt);

        if (count($errors) > 0) {
            $to = get_bloginfo('admin_email');
            $subject = 'Posts Bridge cron task error';
            $body = print_r($errors, true);
            wp_mail($to, $subject, $body);
        }
    }

    public static function detach($task, $payload, $delay = 1)
    {
        if (!wp_next_scheduled(self::$detach_hook)) {
            wp_schedule_single_event(time() + $delay, self::$detach_hook, [], true);
        }

        $contexts = get_option(self::$cron_opt, []);
        $new_item = [
            'task' => $task,
            'payload' => $payload,
        ];

        $is_unique = array_reduce($contexts, function ($is_unique, $item) use ($new_item) {
            return $is_unique && print_r($item, true) !== print_r($new_item, true);
        }, true);

        if ($is_unique) {
            $contexts[] = $new_item;
        }

        update_option(self::$cron_opt, $contexts, false);
    }

    public static function schedule($timestamp, $recurrence, $payload)
    {
        if (!wp_next_scheduled(self::$schedule_hook)) {
            wp_schedule_event($timestamp, $recurrence, self::$schedule_hook, $payload);
        }
    }

    public static function unschedule()
    {
        $timestamp = wp_next_scheduled(self::$schedule_hook);
        if ($timestamp) {
            wp_unschedule_event($timestamp, self::$schedule_hook);
        }
    }
}
