const { __ } = wp.i18n;

export default function useAjaxSync({ fullMode, postType }) {
  const sync = () => {
    wppb.emit("loading", true);

    const body = new URLSearchParams();
    body.set("_ajax_nonce", postsBridgeAjaxSync.nonce);
    body.set("action", postsBridgeAjaxSync.action);
    body.set("mode", fullMode ? "full" : "light");

    if (postType) {
      body.set("post_type", postType);
    }

    return fetch(postsBridgeAjaxSync.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })
      .catch(() =>
        wppb.emit("error", __("AJAX synchronization error", "posts-bridge"))
      )
      .finally(() => wppb.emit("loading", false));
  };

  return sync;
}
