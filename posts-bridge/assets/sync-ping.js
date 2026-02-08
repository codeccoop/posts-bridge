document.addEventListener("DOMContentLoaded", function () {
  fetch(postsBridgeSyncPing.siteUrl + "?pb-sync-ping=1", { method: "GET" });
});
