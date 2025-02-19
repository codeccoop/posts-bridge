// source
import { useGeneral, usePostTypes } from "../../providers/Settings";
import Templates from "../Templates";

const {
  TextControl,
  SelectControl,
  Button,
  __experimentalSpacer: Spacer,
} = wp.components;
const { useState, useMemo } = wp.element;
const { __ } = wp.i18n;

export default function NewBridge({
  add,
  schema,
  Wizard,
  children = () => {},
}) {
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

  const [post_type, setPostType] = useState("");
  const [backend, setBackend] = useState("");
  const [foreign_key, setForeignKey] = useState("");
  const [customFields, setCustomFields] = useState({});
  const customFieldsSchema = useMemo(() =>
    schema.filter(
      (field) => !["post_type", "backend", "foreign_key"].includes(field)
    )
  );

  const onClick = () => {
    add({
      ...customFields,
      post_type,
      backend,
      foreign_key,
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
        post_type &&
        (backend || !schema.includes("backend")) &&
        (foreign_key || !schema.includes("foreign_key")) &&
        customFieldsSchema.reduce(
          (valid, field) => valid && customFields[field],
          true
        )
      ),
    [post_type, backend, foreign_key, customFields, customFieldsSchema]
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
            value={post_type}
            onChange={setPostType}
            options={postTypeOptions}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
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
              __next40pxDefaultSize
            />
          </div>
        )}
        {schema.includes("foreign_key") && (
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Foreign key", "posts-bridge")}
              value={foreign_key}
              onChange={setForeignKey}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
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
        <Button
          variant="primary"
          onClick={() => onClick()}
          style={{ width: "150px", justifyContent: "center" }}
          disabled={disabled}
          __next40pxDefaultSize
        >
          {__("Add", "posts-bridge")}
        </Button>
        <Templates Wizard={Wizard} />
      </div>
    </div>
  );
}
