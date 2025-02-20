// source
import { useGeneral, usePostTypes } from "../../providers/Settings";
import RemoteFields from "../RemoteFields";
import NewBridge from "./NewBridge";
import useAjaxSync from "../../hooks/useAjaxSync";

const {
  TextControl,
  SelectControl,
  Button,
  __experimentalSpacer: Spacer,
  ToggleControl,
} = wp.components;
const { useState } = wp.element;
const { __ } = wp.i18n;

export default function Bridge({
  data,
  update,
  remove,
  schema = ["post_type", "backend", "foreign_key"],
  template = ({ add, schema }) => <NewBridge add={add} schema={schema} />,
  children = () => {},
}) {
  if (data.name === "add") return template({ add: update, schema });

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

  const sync = useAjaxSync({ fullMode, postType: data.post_type });

  const triggerSync = () => sync().finally(() => setFullMode(false));

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
          onClick={triggerSync}
          style={{ width: "150px", justifyContent: "center" }}
          __next40pxDefaultSize
        >
          {__("Syncrhonize", "posts-bridge")}
        </Button>
        <ToggleControl
          label={__("Full synchronization mode", "posts-bridge")}
          checked={fullMode}
          onChange={() => setFullMode(!fullMode)}
          __nextHasNoMarginBottom
        />
      </div>
    </div>
  );
}
