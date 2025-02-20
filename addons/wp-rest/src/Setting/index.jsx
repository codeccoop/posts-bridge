// source
import Bridges from "../../../../src/components/Bridges";
import WPBridge from "./Bridge";
import useWPApi from "../hooks/useWPApi";

const {
  PanelBody,
  PanelRow,
  TextControl,
  __experimentalSpacer: Spacer,
} = wp.components;
const { useRef } = wp.element;
const { __ } = wp.i18n;

export default function WPSetting() {
  const [{ credentials, bridges }, save] = useWPApi();

  const update = (field) => save({ credentials, bridges, ...field });

  const onCredentials = useRef(false);
  const updateCredentials = (field) => {
    onCredentials.current = true;
    update({ credentials: { ...credentials, ...field } });
  };

  return (
    <>
      <PanelRow>
        <Bridges
          bridges={bridges}
          setBridges={(bridges) => update({ bridges })}
          Bridge={WPBridge}
        />
      </PanelRow>
      <Spacer paddingY="calc(8px)" />
      <PanelBody
        title={__("Credentials", "posts-bridge")}
        initialOpen={
          onCredentials.current ||
          !(credentials.username || credentials.password)
        }
      >
        <p
          dangerouslySetInnerHTML={{
            __html: __(
              `WordPress use application password to grant access over the REST API.
Posts Bridge will need this kind of credentials to get authorized to access the WordPress content.
See this <a href='https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/'>guide to get help</a>
with the process of creating new application passwords.`,
              "posts-bridge"
            ),
          }}
        ></p>
        <div style={{ width: "300px" }}>
          <TextControl
            label={__("Username", "posts-bridge")}
            value={credentials.username || ""}
            onChange={(username) => updateCredentials({ username })}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
        </div>
        <Spacer paddingY="calc(8px)" />
        <div style={{ width: "300px" }}>
          <TextControl
            type="password"
            label={__("Application password", "posts-bridge")}
            value={credentials.password || ""}
            onChange={(password) => updateCredentials({ password })}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
        </div>
      </PanelBody>
    </>
  );
}
