// vendor
import React from "react";
import { TextControl } from "@wordpress/components";

// source
import Relation from "../../../../src/components/Relations/Relation";
import NewWPRelation from "./NewRelation";

export default function WPRelation({ data, update, remove }) {
  const __ = wp.i18n.__;

  return (
    <Relation
      data={data}
      update={update}
      remove={remove}
      template={({ add, schema }) => (
        <NewWPRelation add={add} schema={schema} />
      )}
      schema={["post_type", "backend", "remote_type"]}
    >
      {({ data, update }) => (
        <>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Remote post type", "posts-bridge")}
              value={data.remote_type}
              onChange={(remote_type) => update({ ...data, remote_type })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
        </>
      )}
    </Relation>
  );
}
