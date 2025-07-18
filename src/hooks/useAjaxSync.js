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

    return new Promise((res, rej) => {
      const ajax = new XMLHttpRequest();
      ajax.timeout = 6e4;

      ajax.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            res({ json: () => Promise.resolve(JSON.parse(this.responseText)) });
          }
        }
      };

      ajax.ontimeout = function () {
        rej(new Error("Timeout error"));
      };

      ajax.onerror = function (err) {
        rej(err);
      };

      ajax.open("POST", postsBridgeAjaxSync.url, true);
      ajax.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

      ajax.send(body.toString());
    });
  };

  return sync;
}
