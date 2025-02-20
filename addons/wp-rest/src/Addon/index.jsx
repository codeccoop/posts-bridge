// source
import SettingsProvider from "../../../../src/providers/Settings";
import TemplatesProvider from "../../../../src/providers/Templates";
import Setting from "../Setting";

// assets
import logo from "../../assets/logo.png";

const { useEffect, useState, useRef, createPortal } = wp.element;

export default function Addon() {
  const [root, setRoot] = useState(null);

  const onShowApi = useRef((api) => {
    if (api === "wp-rest") {
      setRoot(document.getElementById(api).querySelector(".root"));
    } else {
      setRoot(null);
    }
  }).current;

  useEffect(() => {
    wppb.on("api", onShowApi);

    return () => {
      wppb.off("api", onShowApi);
    };
  }, []);

  useEffect(() => {
    if (!root) return;

    const img = document.querySelector("#wp-rest .addon-logo");
    if (!img) return;

    img.setAttribute("src", "data:image/png;base64," + logo);
    img.style.width = "28px";
  }, [root]);

  return (
    <SettingsProvider handle={["wp-rest"]}>
      <TemplatesProvider>
        <div>{root && createPortal(<Setting />, root)}</div>
      </TemplatesProvider>
    </SettingsProvider>
  );
}
