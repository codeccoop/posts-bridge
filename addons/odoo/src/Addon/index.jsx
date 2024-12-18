// vendor
import React from "react";
import { useEffect, useState, useRef, createPortal } from "@wordpress/element";

// source
import SettingsProvider from "../../../../src/providers/Settings";
import PostTypesProvider from "../../../../src/providers/PostTypes";
import Setting from "../Setting";

// assets
import logo from "../../assets/logo.png";

export default function Addon() {
  const [root, setRoot] = useState(null);

  const onShowTab = useRef((setting) => {
    if (setting === "odoo-api") {
      setRoot(document.getElementById(setting).querySelector(".root"));
    } else {
      setRoot(null);
    }
  }).current;

  useEffect(() => {
    wppb.on("tab", onShowTab);
  }, []);

  useEffect(() => {
    if (!root) return;
    const img = document.querySelector("#odoo-api .addon-logo");
    if (!img) return;
    img.setAttribute("src", "data:image/png;base64," + logo);
    img.style.width = "70px";
  }, [root]);

  return (
    <SettingsProvider handle={["odoo-api"]}>
      <PostTypesProvider>
        <div>{root && createPortal(<Setting />, root)}</div>
      </PostTypesProvider>
    </SettingsProvider>
  );
}
