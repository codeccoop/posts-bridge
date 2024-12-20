// vendor
import React from "react";
import {
  PanelBody,
  PanelRow,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";

// source
import Relations from "../../../../src/components/Relations";
import WPRelation from "./Relation";
import useWPApi from "../hooks/useWPApi";

export default function WPSetting() {
  const __ = wp.i18n.__;
  const [{ databases, relations }, save] = useWPApi();

  const update = (field) => save({ databases, relations, ...field });

  return (
    <>
      <PanelRow>
        <Relations
          relations={relations}
          setRelations={(relations) => update({ relations })}
          Relation={WPRelation}
        />
      </PanelRow>
    </>
  );
}
