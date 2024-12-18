// vendor
import React from "react";
import { TextControl, SelectControl } from "@wordpress/components";

// source
import Relation from "../../../components/Relations/Relation";
import NewRestRelation from "./NewRelation";

export default function RestRelation({ data, update, remove }) {
  const __ = wp.i18n.__;

  return (
    <Relation
      data={data}
      update={update}
      remove={remove}
      schema={["post_type", "backend", "foreign_key", "endpoint"]}
      template={({ add, schema }) => (
        <NewRestRelation add={add} schema={schema} />
      )}
    >
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
    </Relation>
  );
}
