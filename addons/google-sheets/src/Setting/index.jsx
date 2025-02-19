// source
import Bridges from "../../../../src/components/Bridges";
import GSBridge from "./Bridge";
import useGSApi from "../hooks/useGSApi";
import useAjaxGrant from "../hooks/useAjaxGrant";

const {
  PanelBody,
  PanelRow,
  ToggleControl,
  FormFileUpload,
  __experimentalSpacer: Spacer,
} = wp.components;
const { useState } = wp.element;
const { __ } = wp.i18n;

export default function GoogleSheetsBridge() {
  const [{ authorized, bridges }, save] = useGSApi();

  const { grant, revoke } = useAjaxGrant();

  const [file, setFile] = useState(null);

  const update = (field) => save({ authorized, bridges, ...field });

  const onGrant = () => {
    (() => {
      if (file) return grant(file);
      else return revoke();
    })().then(() => wppb.emit("flushStore"));
  };

  return (
    <>
      <PanelRow>
        <Bridges
          bridges={bridges}
          setBridges={(bridges) => update({ bridges })}
          Bridge={GSBridge}
        />
      </PanelRow>
      <Spacer paddingY="calc(8px)" />
      <PanelBody
        title={__("Google Service Credentials", "posts-bridge")}
        initialOpen={!authorized}
      >
        <Spacer paddingY="calc(8px)" />
        <ToggleControl
          disabled={!(authorized || file)}
          checked={authorized}
          onChange={onGrant}
          label={
            authorized
              ? __("Revoke access", "posts-bridge")
              : __("Grant access", "posts-bridge")
          }
          help={__(
            "You have to create a service account credentials to grant Posts Bridge access to your spreadhseets",
            "posts-bridge"
          )}
          __nextHasNoMarginBottom
          __next40pxDefaultSize
        />
        <Spacer paddingY="calc(8px)" />
        {!authorized && (
          <FormFileUpload
            __next40pxDefaultSize
            accept="application/json"
            onChange={({ target }) => setFile(target.files[0])}
          >
            {__("Upload credentials", "posts-bridge")}
          </FormFileUpload>
        )}
        <p
          dangerouslySetInnerHTML={{
            __html: __(
              "Follow <a href='https://github.com/juampynr/google-spreadsheet-reader?tab=readme-ov-file' target='_blank'>example</a> if do you need help with the process.",
              "posts-bridge"
            ),
          }}
        />
      </PanelBody>
    </>
  );
}
