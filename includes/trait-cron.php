<?php

namespace WPCT_RCPT;

use Error;

trait Cron {
    private static $schedule_opt = '_wpct_rcpt_schedule_contexts';
    public static $schedule_hook = '_wpct_rcpt_do_schedule';

    public static function do_schedule()
    {
        $contexts = get_option(self::$schedule_opt, []);

        $errors = [];
        foreach ($contexts as $context) {
            $task = $context['task'];
            $payload = $context['payload'];
            try {
                $task($payload);
            } catch (Error $e) {
                $errors[] = ['context' => $context, 'error' => $e];
            }
        }

        delete_option(self::$schedule_opt);

        if (count($errors) > 0) {
            $to = get_bloginfo('admin_email');
            $subject = 'Wpct Remote Cpt cron task error';
            $body = print_r($errors, true);
            wp_mail($to, $subject, $body);
        }
    }

    public static function detach($task, $payload, $delay = 1) {
        if (!wp_next_scheduled(self::$schedule_hook)) {
            wp_schedule_single_event(time() + $delay, self::$schedule_hook, [], true);
        }

        $contexts = get_option(self::$schedule_opt, []);
        $new_item = [
            'task' => $task,
            'payload' => $payload
        ];

        $is_unique = array_reduce($contexts, function ($is_unique, $item) use ($new_item) {
            return $is_unique && print_r($item, true) !== print_r($new_item, true);
        }, true);

        if ($is_unique) {
            $contexts[] = $new_item;
        }

        update_option(self::$schedule_opt, $contexts, false);
    }
}
