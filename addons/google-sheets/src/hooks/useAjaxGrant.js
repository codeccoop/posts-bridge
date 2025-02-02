const { useState } = wp.element;

export default function useGrant() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const grant = (file) => {
    setLoading(true);

    const data = new FormData();
    data.set("credentials", file);
    data.set("nonce", postsBridgeGSAjax.nonce);
    data.set("action", postsBridgeGSAjax.action);

    fetch(postsBridgeGSAjax.ajax_url, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then(({ success }) => setResult(success))
      .catch(() => setResult(false))
      .finally(() => setLoading(false));
  };

  const revoke = () => {
    setLoading(true);

    const query = new URLSearchParams();
    query.set("nonce", postsBridgeGSAjax.nonce);
    query.set("action", postsBridgeGSAjax.action);
    fetch(`${postsBridgeGSAjax.ajax_url}?${query.toString()}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ success }) => setResult(success))
      .catch(() => setResult(false))
      .finally(() => setLoading(false));
  };

  return {
    grant,
    revoke,
    loading,
    result,
  };
}
