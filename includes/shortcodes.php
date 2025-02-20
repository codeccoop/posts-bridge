<?php

add_action(
    'init',
    function () {
        // Skip registration if on admin
        if (is_admin()) {
            return;
        }

        add_shortcode(
            'posts_bridge_remote_fields',
            'posts_bridge_remote_fields'
        );
        add_shortcode(
            'posts_bridge_remote_callback',
            'posts_bridge_remote_callback'
        );
    },
    10,
    0
);

/**
 * Do the `posts_bridge_remote_fields` shortcode fetching remote data of the current Remote CPT
 *
 * @param string $content Shortcode content.
 *
 * @return string $html Rendered output.
 */
function posts_bridge_remote_fields($atts, $content = '')
{
    global $posts_bridge_remote_cpt;

    // Exit if global post is not Remote CPT
    if (empty($posts_bridge_remote_cpt)) {
        return $content;
    }

    // Gets replacement marks and exit if not found
    preg_match_all('/{{([^}]+)}}/', $content, $matches);
    if (empty($matches)) {
        return $content;
    }

    // Filters empty replace marks and trim its content
    $fields = array_values(
        array_filter(
            array_map(static function ($match) {
                return trim($match);
            }, $matches[1]),
            static function ($field) {
                return $field;
            }
        )
    );

    // Exit if no fields is defined
    if (empty($fields)) {
        return $content;
    }

    // Checks if there are values for the fields and exits if it isn't
    $is_empty = array_reduce(
        $fields,
        static function ($handle, $field) {
            global $posts_bridge_remote_cpt;
            return $handle && $posts_bridge_remote_cpt->get($field) === null;
        },
        false
    );
    if ($is_empty) {
        return $content;
    }

    // Get remote field values
    $values = array_map(static function ($field) {
        global $posts_bridge_remote_cpt;
        return $posts_bridge_remote_cpt->get($field, '');
    }, $fields);

    try {
        // Replace anchors on the shortcode content with values
        for ($i = 0; $i < count($fields); $i++) {
            $field = $fields[$i];
            $value = (string) $values[$i];
            $content = preg_replace(
                '/{{' . preg_quote($field, '/') . '}}/',
                $value,
                $content
            );
        }

        return wp_kses_post($content);
    } catch (ValueError $e) {
        return $e->getMessage();
    }
}

/**
 * Do the `posts_bridge_remote_callback` shortcode ussing the current remote cpt as the first param.
 * This shortcode pass control of the fetch process to the user's function.
 *
 * @param array $atts Shortcode's attributes.
 * @param string $content Shortcode's content.
 *
 * @return string $html Rendered output.
 */
function posts_bridge_remote_callback($atts, $content = '')
{
    global $posts_bridge_remote_cpt;

    // Exit if global post is not Remote CPT
    if (empty($posts_bridge_remote_cpt)) {
        return $content;
    }

    $callback = isset($atts['fn']) ? $atts['fn'] : null;

    if (empty($callback)) {
        return $content;
    } else {
        unset($atts['fn']);
    }

    if (!function_exists($callback)) {
        return $content;
    }

    return $callback($posts_bridge_remote_cpt, $atts, $content);
}
