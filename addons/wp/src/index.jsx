// vendor
import { createRoot } from "@wordpress/element";

// source
import Addon from "./Addon";

wppb.join("addons", ({ data: registry }) => {
  const __ = wp.i18n.__;
  registry["wp-api"] = __("WP REST API", "posts-bridge");

  const root = document.createElement("div");
  root.style.visibility = "hidden";
  document.body.appendChild(root);

  createRoot(root).render(<Addon />);
});
