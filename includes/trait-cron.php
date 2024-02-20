<?php

namespace WPCT_RCPT;

trait Cron {
    private static $opt = '_wpct_rcpt_schedule_contexts';
    public static $hook = '_wpct_rcpt_do_schedule';

    public static function do_schedue()
    {
        $contexts = get_option(self::$opt, []);

        $errors = [];
        foreach ($contexts as $context) {
            $task = $context['task'];
            $payload = $context['payload'];
            try {
                $task($payload);
            } catch (Exception $e) {
                $errors[] = ['context' => $context, 'error' => $e->getMessage()];
            }
        }

        delete_option(self::$opt);

        if (count($errors) > 0) {
            $to = get_bloginfo('admin_email');
            $subject = 'Wpct Remote Cpt cron task error';
            $body = print_r($errors, true);
            wp_mail($to, $subject, $body);
        }
    }

    public static function detach($task, $payload, $delay = 5) {
        if (!wp_next_schedule(self::$hook)) {
            wp_schedule_singe_event(time() + $delay, self::$hook, [], true);
        }

        $contexts = get_option(self::$opt, []);
        $contexts[] = [
            'task' => $task,
            'payload' => $payload
        ];

        update_option(self::$opt, $contexts, false);
    }
}

add_action(Cron::$hook, function () {
    Cron::do_schedule();
});
