<?php

use POSTS_BRIDGE\Addon;
use POSTS_BRIDGE\Post_Bridge;
use HTTP_BRIDGE\Backend;
use HTTP_BRIDGE\Credential;

if (!defined('ABSPATH')) {
    exit();
}

class PBAPI
{
    /**
     * Gets an addon instance by name.
     *
     * @param string $name Addon name.
     *
     * @return Addon|null
     */
    public static function get_addon($name)
    {
        return Addon::addon($name);
    }

    public static function get_post_types()
    {
        return array_keys(get_post_types());
    }

    public static function get_custom_post_types()
    {
        return apply_filters('posts_bridge_custom_post_types', []);
    }

    public static function get_custom_post_type($name)
    {
        return self::get_custom_post_types()[$name] ?? null;
    }

    public static function get_remote_cpts()
    {
        return apply_filters('posts_bridge_remote_cpts', []);
    }

    /**
     * Gets a bridge by name and addon.
     *
     * @param string $post_type Bridge post type.
     *
     * @return Post_Bridge|null
     */
    public static function get_bridge($post_type)
    {
        $bridges = self::get_bridges();
        foreach ($bridges as $bridge) {
            if ($bridge->post_type === $post_type) {
                return $bridge;
            }
        }
    }

    /**
     * Gets the collection of available bridges.
     *
     * @return Post_Bridge[]
     */
    public static function get_bridges()
    {
        return apply_filters('posts_bridge_bridges', []);
    }

    /**
     * Gets the collection of available bridges filtered by addon name.
     *
     * @param string $addon Addon name.
     *
     * @return Post_Bridge[]
     */
    public static function get_addon_bridges($addon)
    {
        return apply_filters('posts_bridge_bridges', [], $addon);
    }

    /**
     * Inserts or updates the bridge data to the database.
     *
     * @param array $data Bridge data.
     * @param string $addon Addon name.
     *
     * @return boolean
     */
    public static function save_bridge($data, $addon)
    {
        $addon = self::get_addon($addon);
        if (!$addon) {
            return false;
        }

        $bridge_class = $addon::bridge_class;
        $bridge = new $bridge_class($data);

        if (!$bridge->is_valid) {
            return false;
        }

        return $bridge->save();
    }

    /**
     * Deletes the bridge data from the database.
     *
     * @param string $name Bridge name.
     * @param string $addon Addon name.
     *
     * @return boolean
     */
    public static function delete_bridge($name, $addon)
    {
        $bridge = self::get_bridge($name, $addon);

        if (!$bridge) {
            return false;
        }

        return $bridge->delete();
    }

    /**
     * Gets the bridge schema for a given addon.
     *
     * @param string $name Addon name.
     *
     * @return array|null
     */
    public static function get_bridge_schema($addon)
    {
        $addon = Addon::addon($addon);

        if (!$addon) {
            return;
        }

        return Post_Bridge::schema($addon::name);
    }

    /**
     * Gets the collection of available backends.
     *
     * @return Backend[]
     */
    public static function get_backends()
    {
        return apply_filters('http_bridge_backends', []);
    }

    /**
     * Gets a backend instance by name.
     *
     * @param string $name Backend name.
     *
     * @return Backend|null
     */
    public static function get_backend($name)
    {
        $backends = self::get_backends();

        foreach ($backends as $backend) {
            if ($backend->name === $name) {
                return $backend;
            }
        }
    }

    /**
     * Inserts or updates the backend data on the database.
     *
     * @param array Backend data.
     *
     * @return boolean
     */
    public static function save_backend($data)
    {
        $backend = new Backend($data);

        if (!$backend->is_valid) {
            return false;
        }

        return $backend->save();
    }

    /**
     * Delete the backend data from the database.
     *
     * @param string $name Backend name.
     *
     * @return boolean
     */
    public static function delete_backend($name)
    {
        $backend = self::get_backend($name);

        if (!$backend) {
            return false;
        }

        return $backend->remove();
    }

    /**
     * Gets the backend schema.
     *
     * @return array
     */
    public static function get_backend_schema()
    {
        return Backend::schema();
    }

    /**
     * Gets the collection of available credentials.
     *
     * @return Credential[]
     */
    public static function get_credentials()
    {
        return apply_filters('http_bridge_credentials', []);
    }

    /**
     * Gets a credential instance by name and addon.
     *
     * @param string $name Credential name.
     *
     * @return Credential|null
     */
    public static function get_credential($name)
    {
        $credentials = self::get_credentials();

        foreach ($credentials as $credential) {
            if ($credential->name === $name) {
                return $credential;
            }
        }
    }

    /**
     * Inserts or updates the credential data to the database.
     *
     * @param array $data Credential data.
     *
     * @return boolean
     */
    public static function save_credential($data)
    {
        $credential = new Credential($data);

        if (!$credential->is_valid) {
            return false;
        }

        return $credential->save();
    }

    /**
     * Deletes the credential data from the database.
     *
     * @param string $name Credential name.
     *
     * @return boolean
     */
    public static function delete_credential($name)
    {
        $credential = self::get_credential($name);

        if (!$credential) {
            return false;
        }

        return $credential->delete();
    }

    /**
     * Gets the credential schema for a given addon.
     *
     * @return array
     */
    public static function get_credential_schema()
    {
        return Credential::schema();
    }

    /**
     * Gets the collection of available templates.
     *
     * @return Post_Bridge_Template[]
     */
    public static function get_templates()
    {
        return apply_filters('posts_bridge_templates', []);
    }

    /**
     * Gets the collection of available templates filtered by addon name.
     *
     * @param string $addon Addon name.
     *
     * @return Post_Bridge_Template[]
     */
    public static function get_addon_templates($addon)
    {
        return apply_filters('posts_bridge_templates', [], $addon);
    }

    /**
     * Gets a template instance by name and addon.
     *
     * @param string $name Template name.
     * @param string $addon Addon name.
     *
     * @return Post_Bridge_Template|null
     */
    public static function get_template($name, $addon)
    {
        $templates = self::get_addon_templates($addon);

        foreach ($templates as $template) {
            if ($template->name === $name) {
                return $template;
            }
        }
    }
}
