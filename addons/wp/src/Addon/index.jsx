// source
import SettingsProvider from "../../../../src/providers/Settings";
import PostTypesProvider from "../../../../src/providers/PostTypes";
import Setting from "../Setting";

// assets
import logo from "../../assets/logo.png";

const { useEffect, useState, useRef, createPortal } = wp.element;

export default function Addon() {
  const [root, setRoot] = useState(null);

  const onShowTab = useRef((setting) => {
    if (setting === "wp-api") {
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
    const img = document.querySelector("#wp-api .addon-logo");
    if (!img) return;
    img.setAttribute("src", "data:image/png;base64," + logo);
    img.style.width = "28px";
  }, [root]);

  return (
    <SettingsProvider handle={["wp-api"]}>
      <PostTypesProvider>
        <div>{root && createPortal(<Setting />, root)}</div>
      </PostTypesProvider>
    </SettingsProvider>
  );
}
