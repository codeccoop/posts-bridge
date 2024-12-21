// vendor
import React from "react";
import {
  PanelBody,
  PanelRow,
  ToggleControl,
  FormFileUpload,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

// source
import Relations from "../../../../src/components/Relations";
import GSRelation from "./Relation";
import useGSApi from "../hooks/useGSApi";
import useAjaxGrant from "../hooks/useAjaxGrant";

export default function GoogleSheetsSetting() {
  const __ = wp.i18n.__;
  const [{ authorized, relations }, save] = useGSApi();

  const { grant, revoke, loading, result } = useAjaxGrant();

  const [file, setFile] = useState(null);

  const update = (field) => save({ authorized, relations, ...field });

  const onGrant = () => {
    if (file) grant(file);
    else revoke();
  };

  useEffect(() => {
    if (loading || result === null) return;
    if (result) {
      window.location.reload();
    }
  }, [loading]);

  return (
    <>
      <PanelRow>
        <Relations
          relations={relations}
          setRelations={(relations) => update({ relations })}
          Relation={GSRelation}
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
