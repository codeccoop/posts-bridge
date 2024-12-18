// vendor
import React from "react";
import {
  TextControl,
  SelectControl,
  Button,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";
import { useState, useMemo } from "@wordpress/element";

// source
import { usePostTypes } from "../../providers/PostTypes";
import { useGeneral } from "../../providers/Settings";

export default function NewRelation({ add, schema, children = () => {} }) {
  const __ = wp.i18n.__;

  const [{ backends }] = useGeneral();
  const backendOptions = [{ label: "", value: "" }].concat(
    backends.map(({ name }) => ({
      label: name,
      value: name,
    }))
  );

  const postTypes = usePostTypes({ filter: true });
  const postTypeOptions = [{ label: "", value: "" }].concat(
    postTypes.map((postType) => ({
      label: postType,
      value: postType,
    }))
  );

  const [postType, setPostType] = useState("");
  const [backend, setBackend] = useState("");
  const [foreignKey, setForeignKey] = useState("");
  const [customFields, setCustomFields] = useState({});
  const customFieldsSchema = useMemo(() =>
    schema.filter(
      (field) => !["post_type", "backend", "foreign_key"].includes(field)
    )
  );

  const onClick = () => {
    add({
      ...customFields,
      post_type: postType,
      backend,
      foreigh_key: foreignKey,
      fields: [],
    });
    setPostType("");
    setBackend("");
    setForeignKey("");
    setCustomFields({});
  };

  const disabled = useMemo(
    () =>
      !(
        postType &&
        (backend || !schema.includes("backend")) &&
        (foreignKey || !schema.includes("foreign_key")) &&
        customFieldsSchema.reduce(
          (valid, field) => valid && customFields[field],
          true
        )
      ),
    [postType, backend, foreignKey, customFields, customFieldsSchema]
  );

  return (
    <div
      style={{
        padding: "calc(24px) calc(32px)",
        width: "calc(100% - 64px)",
        backgroundColor: "rgb(245, 245, 245)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1em",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <SelectControl
            label={__("Post type", "posts-bridge")}
            value={postType}
            onChange={setPostType}
            options={postTypeOptions}
            __nextHasNoMarginBottom
          />
        </div>
        {schema.includes("backend") && (
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <SelectControl
              label={__("Backend", "posts-bridge")}
              value={backend}
              onChange={setBackend}
              options={backendOptions}
              __nextHasNoMarginBottom
            />
          </div>
        )}
        {schema.includes("foreign_key") && (
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Foreign key", "posts-bridge")}
              value={foreignKey}
              onChange={setForeignKey}
              __nextHasNoMarginBottom
            />
          </div>
        )}
        {children({
          data: customFields,
          update: (customFields) => setCustomFields(customFields),
        })}
      </div>
      <Spacer paddingY="calc(8px)" />
      <div
        style={{
          display: "flex",
          gap: "1em",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontWeight: 500,
              textTransform: "uppercase",
              fontSize: "11px",
              margin: 0,
              marginBottom: "calc(4px)",
              maxWidth: "100%",
            }}
          >
            {__("Add relation", "posts-bridge")}
          </label>
          <Button
            variant="primary"
            onClick={() => onClick()}
            style={{ width: "130px", justifyContent: "center", height: "32px" }}
            disabled={disabled}
          >
            {__("Add", "posts-bridge")}
          </Button>
        </div>
      </div>
    </div>
  );
}
