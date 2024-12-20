// vendor
import React, { useEffect } from "react";
import { TextControl } from "@wordpress/components";

// source
import NewRelation from "../../../../src/components/Relations/NewRelation";

const DEFAULT_MAPPERS = [
  "ID",
  "post_title",
  "post_name",
  "post_excerpt",
  "post_content",
  "post_status",
  "featured_media",
  "post_date",
  "post_category",
  "tags_input",
].map((field) => ({ name: field, foreign: field }));

function RemotePostTypeField({ data, update }) {
  const __ = wp.i18n.__;

  useEffect(() => {
    update({ ...data, remote_type: data.post_type, fields: DEFAULT_MAPPERS });
  }, [data.post_type]);

  return (
    <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
      <TextControl
        label={__("Remote post type", "posts-bridge")}
        value={data.remote_type || data.post_type}
        onChange={(remote_type) => update({ ...data, remote_type })}
        __nextHasNoMarginBottom
      />
    </div>
  );
}

export default function NewWPRelation({ add, schema }) {
  return (
    <NewRelation add={add} schema={schema}>
      {({ data, update }) => (
        <RemotePostTypeField data={data} update={update} />
      )}
    </NewRelation>
  );
}
