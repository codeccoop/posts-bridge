<?php

namespace POSTS_BRIDGE;

use Error;

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Detached and scheduled tasks methods.
 */
trait Cron
{
    /**
     * Handle persistent cron settings options name.
     *
     * @var string $cron_opt Name of the option.
     */
    private static $cron_opt = '_posts_bridge_cron_contexts';

    /**
     * Handle the name of the hook which handles scheduled jobs.
     *
     * @var string $schedule_hook Hook name.
     */
    public static $schedule_hook = '_posts_bridge_do_schedule';

    /**
     * Handle the name of the hook which handles detached tasks.
     *
     * @var string $detach_hook Hook name.
     */
    public static $detach_hook = '_posts_bridge_do_detacheds';

    /**
     * Do detached tasks on when detached hook is fired.
     */
    public static function do_detacheds()
    {
        $contexts = get_option(self::$cron_opt, []);

        $now = time();
        $delay = 0;
        $errors = [];
        foreach ($contexts as $context) {
            extract($context);
            if ($time > $now) {
                $delay = min($delay, $time - $now);
                continue;
            }

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

        if ($delay > 0) {
            wp_schedule_single_event($now + $delay, self::$detach_hook, []);
        }
    }

    /**
     * Detach a task and schedule it to the next detached hook trigger.
     *
     * @param string $task Name of the function to execute. It should be globally accessible.
     * @param any $payload Argument to be passed to the task call.
     * @param integer $delay Time to next detached hook trigger.
     */
    public static function detach($task, $payload, $delay = 1)
    {
        if (!wp_next_scheduled(self::$detach_hook)) {
            wp_schedule_single_event(time() + $delay, self::$detach_hook, []);
        }

        $contexts = get_option(self::$cron_opt, []);
        $contexts[] = [
            'task' => $task,
            'payload' => $payload,
            'time' => time() + $delay,
        ];

        update_option(self::$cron_opt, $contexts, false);
    }

    /**
     * Activates schedule hook events with a given recurrence.
     *
     * @param integer $timestamp UNIX timestamp for the first run.
     * @param string $recurrence How often the event should be subsequently recur.
     * @param array $payload Arguments to be passed to the hook's callback function.
     */
    public static function schedule($timestamp, $recurrence, $payload = [])
    {
        $next_schedule = wp_next_scheduled(self::$schedule_hook, $payload);

        if ($next_schedule) {
            if ($next_schedule > $timestamp) {
                wp_unschedule_event($next_schedule, self::$schedule_hook, $payload);
                $next_schedule = null;
            }

            $schedule = wp_get_schedule(self::$schedule_hook, $payload);
            if ($schedule !== $recurrence) {
                wp_unschedule_event($next_schedule, self::$schedule_hook, $payload);
                $next_schedule = null;
            }
        }

        if (!$next_schedule) {
            wp_schedule_event($timestamp, $recurrence, self::$schedule_hook, $payload);
        }
    }

    /**
     * Unschedule the scheduled plugin's hook.
     */
    public static function unschedule()
    {
        $timestamp = wp_next_scheduled(self::$schedule_hook, []);
        if ($timestamp !== false) {
            wp_unschedule_event($timestamp, self::$schedule_hook);
        }
    }

    /**
     * Registers custom wp schedules.
     *
     * @param array<string, array> $schedules New schedules to register.
     * 
     * @return Array with custom schedules registerefs.
     */
    public static function register_custom_schedules($schedules)
    {
        $schedules['minutly'] = [
            'interval' => 60,
            'display' => __('Minutly', 'posts-bridge'),
        ];

        $schedules['twicehourly'] = [
            'interval' => 60 * 30,
            'display' => __('Twice Hourly', 'posts-bridge'),
        ];

        return $schedules;
    }
}
