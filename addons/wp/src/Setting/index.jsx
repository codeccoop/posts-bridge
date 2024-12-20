// vendor
import React from "react";
import {
  PanelBody,
  PanelRow,
  __experimentalSpacer as Spacer,
  TextControl,
} from "@wordpress/components";

// source
import Relations from "../../../../src/components/Relations";
import WPRelation from "./Relation";
import useWPApi from "../hooks/useWPApi";

export default function WPSetting() {
  const __ = wp.i18n.__;
  const [{ credentials, relations }, save] = useWPApi();

  const update = (field) => save({ credentials, relations, ...field });

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
            value={credentials.username || ""}
            onChange={(username) =>
              update({ credentials: { ...credentials, username } })
            }
            __nextHasNoMarginBottom
          />
        </div>
        <Spacer paddingY="calc(8px)" />
        <div style={{ width: "300px" }}>
          <TextControl
            type="password"
            label={__("Application password", "posts-bridge")}
            value={credentials.password || ""}
            onChange={(password) =>
              update({ credentials: { ...credentials, password } })
            }
            __nextHasNoMarginBottom
          />
        </div>
      </PanelBody>
    </>
  );
}
