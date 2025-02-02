// source
import { useGeneral } from "../../../providers/Settings";
import Backends from "../../../components/Backends";
import Backend from "../../../components/Backends/Backend";
import Addons from "../../../components/Addons";
import Synchronize from "./Synchronize";
import Logger from "./Logger";
import Exporter from "./Exporter";

const {
  PanelBody,
  PanelRow,
  ToggleControl,
  __experimentalSpacer: Spacer,
} = wp.components;
const { useEffect } = wp.element;
const { __ } = wp.i18n;

export default function GeneralSettings() {
  const [{ whitelist, backends, synchronize, addons, debug }, save] =
    useGeneral();

  const update = (field) =>
    save({ synchronize, whitelist, backends, addons, debug, ...field });

  useEffect(() => {
    const img = document.querySelector("#general .addon-logo");
    if (!img) return;
    img.removeAttribute("src");
  }, []);

  return (
    <>
      <PanelBody title={__("Syncrhonization", "posts-bridge")}>
        <Synchronize
          synchronize={synchronize}
          setSynchronize={(synchronize) => update({ synchronize })}
        />
      </PanelBody>
      <PanelBody
        title={__("Backends", "posts-bridge")}
        initialOpen={backends.length === 0}
      >
        <Spacer paddingY="calc(8px)" />
        <PanelRow>
          <ToggleControl
            label={__("Block connections from unkown origins", "posts-bridge")}
            checked={whitelist}
            onChange={() => update({ whitelist: !whitelist })}
            __nextHasNoMarginBottom
            help={__(
              "Should Posts Bridge block requests from origins not listed as backends? If active, incomming connections should include HTTP Origin header",
              "posts-bridge"
            )}
          />
        </PanelRow>
        <Spacer paddingY="calc(8px)" />
        <PanelRow>
          <Backends
            backends={backends}
            setBackends={(backends) => update({ backends })}
            Backend={Backend}
          />
        </PanelRow>
      </PanelBody>
      <Addons />
      <PanelBody title={__("Debug", "posts-bridge")} initialOpen={!!debug}>
        <Logger />
      </PanelBody>
      <PanelBody
        title={__("Import / Export", "posts-bridge")}
        initialOpen={false}
      >
        <Exporter />
      </PanelBody>
    </>
  );
}
