// vendor
import React from "react";
import {
  TextControl,
  SelectControl,
  Button,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";

// source
import { usePostTypes } from "../../providers/PostTypes";
import { useGeneral } from "../../providers/Settings";
import RemoteFields from "../RemoteFields";
import NewRelation from "./NewRelation";

export default function Relation({
  data,
  update,
  remove,
  schema = ["post_type", "backend", "foreign_key"],
  template = ({ add, schema }) => <NewRelation add={add} schema={schema} />,
  children = () => {},
}) {
  if (data.name === "add") return template({ add: update, schema });

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
    postTypes
      .filter((postType) => postType !== data.post_type)
      .map((postType) => ({
        label: postType,
        value: postType,
      }))
      .concat([{ label: data.post_type, value: data.post_type }])
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
            value={data.post_type}
            onChange={(post_type) => update({ ...data, post_type })}
            options={postTypeOptions}
            __nextHasNoMarginBottom
          />
        </div>
        {schema.includes("backend") && (
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <SelectControl
              label={__("Backend", "posts-bridge")}
              value={data.backend}
              onChange={(backend) => update({ ...data, backend })}
              options={backendOptions}
              __nextHasNoMarginBottom
            />
          </div>
        )}
        {schema.includes("foreign_key") && (
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Foreign key", "posts-bridge")}
              value={data.foreign_key}
              onChange={(foreign_key) => update({ ...data, foreign_key })}
              __nextHasNoMarginBottom
            />
          </div>
        )}
        {children({ data, update })}
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
              marginBottom: "calc(4px)",
            }}
          >
            {__("Map fields", "posts-bridge")}
          </label>
          <RemoteFields
            fields={data.fields || []}
            setFields={(fields) => update({ ...data, fields })}
          />
        </div>
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
            {__("Remove relation", "posts-bridge")}
          </label>
          <Button
            isDestructive
            variant="primary"
            onClick={() => remove(data)}
            style={{ width: "130px", justifyContent: "center", height: "32px" }}
          >
            {__("Remove", "posts-bridge")}
          </Button>
        </div>
      </div>
    </div>
  );
}
