// vendor
import React from "react";
import { TabPanel } from "@wordpress/components";

// source
import Relation from "./Relation";

export default function Relations({ relations, setRelations }) {
  const __ = wp.i18n.__;

  const tabs = relations
    .map(({ backend, post_type, model, fields = [] }) => ({
      name: post_type,
      title: post_type,
      post_type,
      model,
      backend,
      fields,
    }))
    .concat([
      {
        title: __("Add relation", "posts-bridge"),
        name: "add",
      },
    ]);

  const updateRelation = (index, data) => {
    if (index === -1) index = relations.length;
    const newRelations = relations
      .slice(0, index)
      .concat([data])
      .concat(relations.slice(index + 1, relations.length));
    setRelations(newRelations);
  };

  const removeRelation = ({ post_type }) => {
    const index = relations.findIndex((r) => r.post_type === post_type);
    const newRelations = relations
      .slice(0, index)
      .concat(relations.slice(index + 2));
    setRelations(newRelations);
  };

  return (
    <div style={{ width: "100%" }}>
      <label
        className="components-base-control__label"
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: "calc(8px)",
        }}
      >
        {__("Posts remote relations", "posts-bridge")}
      </label>
      <TabPanel tabs={tabs}>
        {(relation) => (
          <Relation
            {...relation}
            remove={removeRelation}
            update={(data) =>
              updateRelation(
                relations.findIndex(
                  ({ post_type }) => post_type === relation.post_type
                ),
                data
              )
            }
          />
        )}
      </TabPanel>
    </div>
  );
}
