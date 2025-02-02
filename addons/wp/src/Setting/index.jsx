// source
import Relations from "../../../../src/components/Relations";
import WPRelation from "./Relation";
import useWPApi from "../hooks/useWPApi";

const {
  PanelBody,
  PanelRow,
  __experimentalSpacer: Spacer,
  TextControl,
} = wp.components;
const { useState, useEffect, useRef } = wp.element;
const { __ } = wp.i18n;

export default function WPSetting() {
  const [{ credentials, relations }, save] = useWPApi();

  const update = (field) => save({ credentials, relations, ...field });

  const [credentialsState, setCredentialsState] = useState(credentials);
  const timeout = useRef(0);
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      update({ credentials: credentialsState });
    }, 1000);
  }, [credentialsState]);

  return (
    <>
      <PanelRow>
        <Relations
          relations={relations}
          setRelations={(relations) => update({ relations })}
          Relation={WPRelation}
        />
      </PanelRow>
      <Spacer paddingY="calc(8px)" />
      <PanelBody
        title={__("Credentials", "posts-bridge")}
        initialOpen={!(credentials.password && credentials.username)}
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
            value={credentialsState.username || ""}
            onChange={(username) =>
              setCredentialsState({ ...credentialsState, username })
            }
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
        </div>
        <Spacer paddingY="calc(8px)" />
        <div style={{ width: "300px" }}>
          <TextControl
            type="password"
            label={__("Application password", "posts-bridge")}
            value={credentialsState.password || ""}
            onChange={(password) =>
              setCredentialsState({ ...credentialsState, password })
            }
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
        </div>
      </PanelBody>
    </>
  );
}
