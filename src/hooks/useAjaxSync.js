const { useState } = wp.element;

export default function useAjaxSync({ fullMode, postType }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sync = () => {
    setLoading(true);
    const body = new URLSearchParams();
    body.set("_ajax_nonce", postsBridgeAjaxSync.nonce);
    body.set("action", postsBridgeAjaxSync.action);
    body.set("mode", fullMode ? "full" : "light");
    if (postType) {
      body.set("post_type", postType);
    }

    fetch(postsBridgeAjaxSync.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return {
    loading,
    error,
    sync,
  };
}
