<?php

namespace WPCT_RCPT;

use WPCT_ABSTRACT\Singleton;
use WP_Query;

class Synchronizer extends Singleton
{
    public function __construct()
    {
        add_action('wp_ajax_rcpt_sync', function () {
            return $this->ajax_callback();
        });

        add_filter('wpct_rcpt_menu_page_content', function ($output) {
            if (isset($_GET['tab']) && $_GET['tab'] !== 'wpct-rcpt_general') {
                $output .= $this->sync_widget();
            }
            return $output;
        }, 10, 1);
    }

    private function ajax_callback()
    {
        check_ajax_referer('wpct-rcpt-syncronizer');
        $proto = $_POST['proto'];
        $post_types = array_map(function ($post_type) {
            return trim($post_type);
        }, explode(',', $_POST['post_types']));

        $success = true;
        if ($proto === 'rest') {
            $rest_api = Settings::get_setting('wpct-rcpt', 'rest-api');

            foreach ($rest_api['relations'] as $rel) {
                if (in_array($rel['post_type'], $post_types)) {
                    $success &= $this->rest_sync($rel['post_type'], $rel['endpoint'], $rel['field']);
                }
            }
        } else {
            $rpc_api = Settings::get_setting('wpct-rcpt', 'rpc-api');
            foreach ($rpc_api['relations'] as $rel) {
                if (in_array($rel['post_type'], $post_types)) {
                    $success &= $this->rpc_sync($rel['post_type'], $rpc_api['endpoint'], $rel['model']);
                }
            }
        }

        $code = $success ? 200 : 500;
        wp_send_json(['success' => $success], $code);
    }

    private function rest_sync($post_type, $endpoint, $rel)
    {
        $models = ApiClient::fetch($endpoint);
        if (is_wp_error($models)) {
            return false;
        }

        $ids = array_map(function ($model) use ($rel) {
            return $model[$rel];
        }, $models);

        return $this->sync($post_type, $ids, function ($remote_id) use ($endpoint) {
            $endpoint = apply_filters('wpct_rcpt_endpoint', "{$endpoint}/{$remote_id}", $remote_id, null);
            return ApiClient::fetch($endpoint);
        });
    }

    private function rpc_sync($post_type, $endpoint, $model)
    {
        $ids = ApiClient::search($endpoint, $model);
        if (is_wp_error($ids)) {
            return false;
        }

        return $this->sync($post_type, $ids, function ($remote_id) use ($endpoint, $model) {
            return ApiClient::read($endpoint, $model, $remote_id);
        });
    }

    private function sync($post_type, $ids, $fetch)
    {
        $locale = apply_filters('wpct_i18n_current_language', 'locale');

        $remote_ids = array_reduce($ids, function ($carry, $id) {
            $carry[$id] = 1;
            return $carry;
        }, []);

        $query = new WP_Query([
            'post_type' => $post_type,
            'posts_per_page' => -1,
            'post_status' => 'any',
        ]);

        while ($query->have_posts()) {
            $post = $query->the_post();
            $rcpt = new Remote_CPT($post);
            if (!key_exists($rcpt->remote_id, $remote_ids)) {
                wp_delete_post($post, true);
                continue;
            }

            unset($remote_ids[$rcpt->remote_id]);
        }

        $remote_ids = array_keys($remote_ids);
        $remote_ids = array_slice($remote_ids, 0, 10);
        foreach ($remote_ids as $remote_id) {
            $data = apply_filters('wpct_rcpt_fetch', $fetch($remote_id), null, $locale);
            if (is_wp_error($data)) {
                return false;
            }

            $data['post_type'] = $post_type;
            $post_id = wp_insert_post($data);
            if (is_wp_error($post_id) || !$post_id) {
                return false;
            }

            update_post_meta($post_id, '_rcpt_remote_id', $post_id);
        }

        return true;
    }

    private function sync_widget()
    {
        $nonce = wp_create_nonce('wpct-rcpt-syncronizer');
        $ajax_url = admin_url('admin-ajax.php');
        $proto = $_GET['tab'] === 'wpct-rcpt_rest-api' ? 'rest' : 'rpc';
        $relations = Settings::get_setting('wpct-rcpt', $proto . '-api', 'relations');

        ob_start();
        ?>
        <div class="wrap">
            <form id="rcpt-synchronizer" method="post" action="<?= $ajax_url ?>">
                <input type="hidden" name="_ajax_nonce" value="<?= $nonce ?>" />
                <input type="hidden" name="proto" value="<?= $proto ?>" />
                <fieldset>
                <?php for ($i = 0; $i < count($relations); $i++) : ?>
                <label for="post_type[<?= $i ?>]"><?= $relations[$i]['post_type'] ?></label>
                <input checked="true" type="checkbox" name="post_type[<?= $i ?>]" value="<?= $relations[$i]['post_type'] ?>" />
                <?php endfor; ?>
                </fieldset>
                <p class="submit">
                    <button id="submit" type="submit" class="button button-primary"><?= __('synchronize', 'wpct-rcpt') ?></button>
                </p>
            </form>
        </div>
        <script>
        (function () {
            let synchronizing = false;
            const form = document.getElementById("rcpt-synchronizer");
            form.addEventListener("submit", (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                if (synchronizing) return;

                const formData = new FormData(form);
                const query = new URLSearchParams();
                query.set("_ajax_nonce", formData.get("_ajax_nonce"));
                query.set("proto", formData.get("proto"));
                query.set("action", "rcpt_sync");

                const postTypes = [];
                for (let i = 0; i < <?= count($relations) ?>; i++) {
                    postTypes.push(formData.get(`post_type[${i}]`));           
                }
                query.set("post_types", postTypes.join(","));

                let notice = document.getElementById("sync-message");
                if (!notice) {
                    notice = document.createElement("div");
                    notice.id = "sync-message";
                    form.parentElement.insertBefore(notice, form);
                }

                notice.classList = "notice notice-info";
                notice.innerText = "Synchronizing...";

                form.querySelector('button[type="submit"]').disabled = true;
                fetch(form.getAttribute("action"), {
                    method: form.getAttribute("method"),
                    body: query.toString(),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then(res => res.json())
                    .then(({ success }) => {
                        if (!success) {
                            notice.classList = "notice notice-error";
                            notice.innerText = "<?= __('Error on remote synchronization', 'wpct-rcpt') ?>";
                        } else {
                            notice.classList = "notice notice-success";
                            notice.innerText = "<?= __('Successfully synchronized', 'wpct-rcpt') ?>";
                        }
                    }).finally(() => (form.querySelector('button[type="submit"]').disabled = false));
            });
        })();
        </script><?php
        return ob_get_clean();
    }
}
