export default function useGrant() {
  const grant = (file) => {
    wppb.emit("loading", true);

    const data = new FormData();
    data.set("credentials", file);
    data.set("nonce", postsBridgeGSAjax.nonce);
    data.set("action", postsBridgeGSAjax.action);

    return fetch(postsBridgeGSAjax.ajax_url, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then(({ success }) => {
        if (!success) {
          wppb.emit("error", __("Invalid credentials", "posts-bridge"));
        }
      })
      .catch(() =>
        wppb.emit("error", __("Error on upload credentials", "posts-bridge"))
      )
      .finally(() => wppb.emit("loading", false));
  };

  const revoke = () => {
    wppb.emit("loading", true);

    const query = new URLSearchParams();
    query.set("nonce", postsBridgeGSAjax.nonce);
    query.set("action", postsBridgeGSAjax.action);

    return fetch(`${postsBridgeGSAjax.ajax_url}?${query.toString()}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ success }) => {
        if (!success) {
          wppb.emit("error", __("Error on revoke credentials", "posts-bridge"));
        }
      })
      .catch(() =>
        wppb.emit("error", __("Error on revoke credentials", "posts-bridge"))
      )
      .finally(() => wppb.emit("loading", false));
  };

  return { grant, revoke };
}
