// source
import { usePostTypes } from "../../providers/Settings";
import { useCustomPostTypeData } from "../../providers/CustomPostTypes";

const {
  PanelBody,
  TextControl,
  ToggleControl,
  SelectControl,
  Button,
  __experimentalSpacer: Spacer,
} = wp.components;
const { useState, useEffect } = wp.element;
const { __ } = wp.i18n;

const supportsOptions = [
  {
    label: __("Title", "posts-bridge"),
    value: "title",
  },
  {
    label: __("Editor", "posts-bridge"),
    value: "editor",
  },
  {
    label: __("Comments", "posts-bridge"),
    value: "comments",
  },
  {
    label: __("Revisions", "posts-bridge"),
    value: "revisions",
  },
  {
    label: __("Trackbacks", "posts-bridge"),
    value: "trackbacks",
  },
  {
    label: __("Author", "posts-bridge"),
    value: "author",
  },
  {
    label: __("Excerpt", "posts-bridge"),
    value: "excerpt",
  },
  {
    label: __("Thumbnail", "posts-bridge"),
    value: "thumbnail",
  },
  {
    label: __("Page attributes", "posts-bridge"),
    value: "page-attributes",
  },
  {
    label: __("Custom fields", "posts-bridge"),
    value: "custom-fields",
  },
  {
    label: __("Post formats", "posts-bridge"),
    value: "post-formats",
  },
];

function NewCustomPostType({ add }) {
  const postTypes = usePostTypes();

  const [name, setName] = useState("");
  const [nameConflict, setNameConflict] = useState(false);

  const [label, setLabel] = useState("");
  const [singular, setSingular] = useState("");

  const handleSetName = (name) => {
    name = name.toLowerCase().replace(/\s+/, "");
    setNameConflict(postTypes.includes(name.trim()));
    setName(name);
  };

  const onClick = () => {
    add({
      name: name.trim(),
      label: label.trim(),
      singular_label: singular.trim(),
    });

    setName("");
    setLabel("");
    setSingular("");
    setNameConflict(false);
  };

  const disabled = !(name && label && singular && !nameConflict);

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
        }}
      >
        <TextControl
          label={__("Name", "posts-bridge")}
          help={
            nameConflict
              ? __("This name is already in use", "posts-bridge")
              : ""
          }
          value={name}
          onChange={handleSetName}
          __nextHasNoMarginBottom
          __next40pxDefaultSize
        />
        <TextControl
          label={__("Label", "posts-bridge")}
          value={label}
          onChange={setLabel}
          __nextHasNoMarginBottom
          __next40pxDefaultSize
        />
        <TextControl
          label={__("Singular label", "posts-bridge")}
          value={singular}
          onChange={setSingular}
          __nextHasNoMarginBottom
          __next40pxDefaultSize
        />
        <Button
          variant="primary"
          onClick={() => onClick()}
          style={{
            width: "150px",
            justifyContent: "center",
            marginTop: "auto",
          }}
          disabled={disabled}
          __next40pxDefaultSize
        >
          {__("Add", "posts-bridge")}
        </Button>
      </div>
    </div>
  );
}

export default function CustomPostType({ name, update, remove }) {
  if (name === "add") return <NewCustomPostType add={update} />;

  const data = useCustomPostTypeData(name);
  const [state, setState] = useState({ name });

  const postTypes = usePostTypes();
  const [nameConflict, setNameConflict] = useState(false);

  useEffect(() => {
    if (!state.name) return;

    setNameConflict(
      state.name.trim() !== name && postTypes.includes(state.name.trim())
    );
  }, [state.name]);

  useEffect(() => {
    if (!data) return;

    setState(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const handleSetName = (name) => {
    name = name.toLowerCase().replace(/\s+/, "_");

    setState({ ...state, name });
  };

  if (!data) return <p>Loading</p>;

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
        }}
      >
        <TextControl
          label={__("Name", "posts-bridge")}
          help={
            nameConflict
              ? __("This name is already in use", "posts-bridge")
              : ""
          }
          value={state.name}
          onChange={handleSetName}
          __nextHasNoMarginBottom
          __next40pxDefaultSize
        />
        <TextControl
          label={__("Label", "posts-bridge")}
          value={state.label}
          onChange={(label) => setState({ ...state, label })}
          __nextHasNoMarginBottom
          __next40pxDefaultSize
        />
        <TextControl
          label={__("Singular label", "posts-bridge")}
          value={state.singular_label}
          onChange={(singular_label) => setState({ ...state, singular_label })}
          __nextHasNoMarginBottom
          __next40pxDefaultSize
        />
      </div>
      <Spacer />
      <PanelBody title={__("Visibility", "posts-bridge")} initialOpen={false}>
        <Spacer paddingY="calc(4px)" />
        <div
          style={{
            display: "flex",
            gap: "1em",
          }}
        >
          <ToggleControl
            label={__("Public", "posts-bridge")}
            checked={state.public}
            onChange={() => setState({ ...state, public: !state.public })}
            __nextHasNoMarginBottom
          />
          <ToggleControl
            label={__("Exclude from search", "posts-bridge")}
            checked={state.exclude_from_search}
            onChange={() =>
              setState({
                ...state,
                exclude_from_search: !state.exclude_from_search,
              })
            }
            __nextHasNoMarginBottom
          />
          <ToggleControl
            label={__("Publicly queryable", "posts-bridge")}
            checked={state.publicly_queryable}
            onChange={() =>
              setState({
                ...state,
                publicly_queryable: !state.publicly_queryable,
              })
            }
            __nextHasNoMarginBottom
          />
          <ToggleControl
            label={__("Show in REST", "posts-bridge")}
            checked={state.show_in_rest}
            onChange={() =>
              setState({ ...state, show_in_rest: !state.show_in_rest })
            }
            __nextHasNoMarginBottom
          />
        </div>
      </PanelBody>
      <PanelBody title={__("Attributes", "posts-bridge")} initialOpen={false}>
        <Spacer paddingY="calc(4px)" />
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: "1em",
          }}
        >
          <TextControl
            label={__("Taxonomies", "posts-bridge")}
            help={__("Names separated by commas", "posts-bridge")}
            value={state.taxonomies}
            onChange={(taxonomies) => setState({ ...state, taxonomies })}
            __nextHasNoMarginBottom
          />
          <SelectControl
            multiple
            label={__("Supports", "posts-bridge")}
            value={state.supports}
            onChange={(supports) => setState({ ...state, supports })}
            options={supportsOptions}
            __nextHasNoMarginBottom
          />
        </div>
      </PanelBody>
      <PanelBody title={__("Admin", "posts-bridge")} initialOpen={false}>
        <Spacer paddingY="calc(4px)" />
        <div
          style={{
            display: "flex",
            gap: "1em",
          }}
        >
          <ToggleControl
            label={__("Show UI", "posts-bridge")}
            checked={state.show_ui}
            onChange={() => setState({ ...state, show_ui: !state.show_ui })}
            __nextHasNoMarginBottom
          />
          <ToggleControl
            label={__("Show in menu", "posts-bridge")}
            checked={state.show_in_menu}
            onChange={() =>
              setState({ ...state, show_in_menu: !state.show_in_menu })
            }
            __nextHasNoMarginBottom
          />
          <ToggleControl
            label={__("Show in admin bar", "posts-bridge")}
            checked={state.show_in_admin_bar}
            onChange={() =>
              setState({
                ...state,
                show_in_admin_bar: !state.show_in_admin_bar,
              })
            }
            __nextHasNoMarginBottom
          />
          <ToggleControl
            label={__("Show in nav menus", "posts-bridge")}
            checked={state.show_in_nav_menus}
            onChange={() =>
              setState({
                ...state,
                show_in_nav_menus: !state.show_in_nav_menus,
              })
            }
            __nextHasNoMarginBottom
          />
        </div>
      </PanelBody>
      <PanelBody title={__("URL", "posts-bridge")} initialOpen={false}>
        <Spacer paddingY="calc(4px)" />
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: "1em",
          }}
        >
          <TextControl
            label={__("Query var", "posts-bridge")}
            value={state.query_var}
            onChange={(query_var) => setState({ ...state, query_var })}
            __nextHasNoMarginBottom
          />
          <TextControl
            label={__("Rewrite slug", "posts-bridge")}
            value={state.rewrite}
            onChange={(rewrite) => setState({ ...state, rewrite })}
            __nextHasNoMarginBottom
          />
          <TextControl
            label={__("REST base", "posts-bridge")}
            value={state.rest_base}
            onChange={(rest_base) => setState({ ...state, rest_base })}
            __nextHasNoMarginBottom
          />
          <div style={{ paddingBottom: "1em" }}>
            <ToggleControl
              label={__("Has archive", "posts-bridge")}
              checked={state.has_archive}
              onChange={() =>
                setState({ ...state, has_archive: !state.has_archive })
              }
              __nextHasNoMarginBottom
            />
          </div>
        </div>
      </PanelBody>
      <PanelBody title={__("Capabilities", "posts-bridge")} initialOpen={false}>
        <Spacer paddingY="calc(4px)" />
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: "1em",
          }}
        >
          <TextControl
            label={__("Capability type", "posts-bridge")}
            value={state.capability_type}
            onChange={(capability_type) =>
              setState({ ...state, capability_type })
            }
            __nextHasNoMarginBottom
          />
          <div style={{ paddingBottom: "1em" }}>
            <ToggleControl
              label={__("Map meta capabilities", "posts-bridge")}
              checked={state.map_meta_cap}
              onChange={() =>
                setState({ ...state, map_meta_cap: !state.map_meta_cap })
              }
              __nextHasNoMarginBottom
            />
          </div>
        </div>
      </PanelBody>
      <Spacer paddingY="calc(8px)" />
      <div
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <Button
          variant="primary"
          onClick={() => update(state)}
          style={{
            width: "150px",
            marginTop: "auto",
            justifyContent: "center",
          }}
          __next40pxDefaultSize
        >
          {__("Save", "posts-bridge")}
        </Button>
        <Button
          isDestructive
          variant="primary"
          onClick={() => remove(data.name)}
          style={{
            width: "150px",
            marginTop: "auto",
            justifyContent: "center",
          }}
          __next40pxDefaultSize
        >
          {__("Remove", "posts-bridge")}
        </Button>
      </div>
    </div>
  );
}
