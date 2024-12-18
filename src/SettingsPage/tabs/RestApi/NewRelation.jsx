// vendor
import React from "react";
import { TextControl } from "@wordpress/components";

// source
import NewRelation from "../../../components/Relations/NewRelation";

export default function NewRestRelation({ add, schema }) {
  const __ = wp.i18n.__;

  return (
    <NewRelation add={add} schema={schema}>
      {({ data, update }) => (
        <>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Endpoint", "posts-bridge")}
              value={data.endpoint || ""}
              onChange={(endpoint) => update({ ...data, endpoint })}
              __nextHasNoMarginBottom
            />
          </div>
        </>
      )}
    </NewRelation>
  );
}
