// source
import SettingsProvider from "../../../../src/providers/Settings";
import PostTypesProvider from "../../../../src/providers/PostTypes";
import SpreadsheetsProvider from "../providers/Spreadsheets";
import Setting from "../Setting";

// assets
import logo from "../../assets/logo.png";

const { useEffect, useState, useRef, createPortal } = wp.element;

export default function Addon() {
  const [root, setRoot] = useState(null);

  const onShowTab = useRef((setting) => {
    if (setting === "google-sheets-api") {
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
    const img = document.querySelector("#google-sheets-api .addon-logo");
    if (!img) return;
    img.setAttribute("src", "data:image/png;base64," + logo);
    img.style.width = "21px";
  }, [root]);

  return (
    <SettingsProvider handle={["google-sheets-api"]}>
      <PostTypesProvider>
        <SpreadsheetsProvider>
          <div>{root && createPortal(<Setting />, root)}</div>
        </SpreadsheetsProvider>
      </PostTypesProvider>
    </SettingsProvider>
  );
}
