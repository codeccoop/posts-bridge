// vendor
import React, { useEffect } from "react";
import {
  TextControl,
  SelectControl,
  Button,
  __experimentalSpacer as Spacer,
  ToggleControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

// source
import { usePostTypes } from "../../providers/PostTypes";
import { useGeneral } from "../../providers/Settings";
import RemoteFields from "../RemoteFields";
import NewRelation from "./NewRelation";
import useAjaxSync from "../../hooks/useAjaxSync";

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

  const [fullMode, setFullMode] = useState(false);

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

  const {
    loading: ajaxLoading,
    error: ajaxError,
    sync,
  } = useAjaxSync({ fullMode, postType: data.post_type });

  useEffect(() => {
    if (ajaxLoading) return;
    return () => {
      setFullMode(false);
    };
  }, [ajaxLoading]);

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
            __next40pxDefaultSize
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
              __next40pxDefaultSize
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
              __next40pxDefaultSize
            />
          </div>
        )}
        {children({ data, update })}
      </div>
      <Spacer paddingY="calc(8px)" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <RemoteFields
          fields={data.fields || []}
          setFields={(fields) => update({ ...data, fields })}
        />
        <Button
          isDestructive
          variant="primary"
          onClick={() => remove(data)}
          style={{ width: "150px", justifyContent: "center" }}
          __next40pxDefaultSize
        >
          {__("Remove", "posts-bridge")}
        </Button>
        <Button
          variant="primary"
          isBusy={ajaxLoading}
          disabled={ajaxError}
          isDestructive={ajaxError}
          onClick={sync}
          style={{ width: "150px", justifyContent: "center" }}
          __next40pxDefaultSize
        >
          {__("Syncrhonize", "posts-bridge")}
        </Button>
        <ToggleControl
          label={__("Run a full synchronization", "posts-bridge")}
          checked={fullMode}
          onChange={() => setFullMode(!fullMode)}
          __nextHasNoMarginBottom
        />
      </div>
    </div>
  );
}
