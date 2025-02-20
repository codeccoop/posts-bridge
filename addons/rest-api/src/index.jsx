// source
import Addon from "./Addon";

const { createRoot } = wp.element;

wppb.join("addons", ({ data: registry }) => {
  const __ = wp.i18n.__;
  registry["rest-api"] = __("rest-api", "posts-bridge");

  const root = document.createElement("div");
  root.style.visibility = "hidden";
  document.body.appendChild(root);

  createRoot(root).render(<Addon />);
});
