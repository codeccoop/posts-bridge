// source
import { useError } from "../providers/Error";
import { useLoading } from "../providers/Loading";

const { __ } = wp.i18n;

export default function useAjaxSync({ fullMode, postType }) {
  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();

  const ping = () => {
    const body = new URLSearchParams();
    body.set("_ajax_nonce", window.postsBridgeAjaxSync.nonce);
    body.set("action", window.postsBridgeAjaxSync.actions.ping);

    return new Promise((res, rej) => {
      const ajax = new XMLHttpRequest();
      ajax.timeout = 1000 * 60;

      ajax.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            res({
              json: () => Promise.resolve(JSON.parse(this.responseText)),
            });
          } else if (this.status === 409) {
            setTimeout(
              () => {
                ajax.onreadystatechange = null;
                ping().then((response) => res(response));
              },
              fullMode ? 4000 : 2000
            );
          } else {
            rej(new Error(`HTTP error response status code: ${this.status}`));
          }
        }
      };

      ajax.open("POST", window.postsBridgeAjaxSync.url, true);
      ajax.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

      ajax.send(body.toString());
    });
  };

  const sync = () => {
    if (loading || error) return;
    setLoading(true);

    const body = new URLSearchParams();
    body.set("_ajax_nonce", window.postsBridgeAjaxSync.nonce);
    body.set("action", window.postsBridgeAjaxSync.actions.sync);
    body.set("mode", fullMode ? "full" : "light");

    if (postType) {
      body.set("post_type", postType);
    }

    return new Promise((res, rej) => {
      const ajax = new XMLHttpRequest();
      ajax.timeout = 1000 * 60;

      ajax.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            res({
              json: () => Promise.resolve(JSON.parse(this.responseText)),
            });
          } else if (this.status === 409 || this.status === 0) {
            setTimeout(
              () => {
                ajax.onreadystatechange = () => {};
                ping().then((response) => res(response));
              },
              fullMode ? 4000 : 2000
            );
          } else {
            rej(new Error(`HTTP error response status code: ${this.status}`));
          }
        }
      };

      ajax.open("POST", window.postsBridgeAjaxSync.url, true);
      ajax.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

      ajax.send(body.toString());
    })
      .catch(() => setError(__("AJAX synchronization error", "posts-bridge")))
      .finally(() => setLoading(false));
  };

  return sync;
}
