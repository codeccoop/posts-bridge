// vendor
import React from "react";
import {
  TextControl,
  SelectControl,
  Button,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

// source
import { usePostTypes } from "../../providers/PostTypes";
import { useGeneral } from "../../providers/Settings";
import RemoteFields from "../../RemoteFields";

function NewRelation({ add }) {
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
  const [endpoint, setEndpoint] = useState("");
  const [foreignKey, setForeignKey] = useState("");

  const onClick = () => {
    add({
      post_type: postType,
      backend,
      endpoint,
      foreigh_key: foreignKey,
      fields: [],
    });
    setPostType("");
    setBackend("");
    setEndpoint("");
    setForeignKey("");
  };

  const disabled = !(postType && backend && endpoint && foreignKey);

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
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <SelectControl
            label={__("Backend", "posts-bridge")}
            value={backend}
            onChange={setBackend}
            options={backendOptions}
            __nextHasNoMarginBottom
          />
        </div>
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <TextControl
            label={__("Endpoint", "posts-bridge")}
            value={endpoint}
            onChange={setEndpoint}
            __nextHasNoMarginBottom
          />
        </div>
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <TextControl
            label={__("Foreign key", "posts-bridge")}
            value={foreignKey}
            onChange={setForeignKey}
            __nextHasNoMarginBottom
          />
        </div>
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

export default function Relation({ update, remove, ...data }) {
  if (data.name === "add") return <NewRelation add={update} />;

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
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <SelectControl
            label={__("Backend", "posts-bridge")}
            value={data.backend}
            onChange={(backend) => update({ ...data, backend })}
            options={backendOptions}
            __nextHasNoMarginBottom
          />
        </div>
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <TextControl
            label={__("Endpoint", "posts-bridge")}
            value={data.endpoint}
            onChange={(endpoint) => update({ ...data, endpoint })}
            __nextHasNoMarginBottom
          />
        </div>
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <TextControl
            label={__("Foreign key", "posts-bridge")}
            value={data.foreign_key}
            onChange={(foreign_key) => update({ ...data, foreign_key })}
            __nextHasNoMarginBottom
          />
        </div>
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
