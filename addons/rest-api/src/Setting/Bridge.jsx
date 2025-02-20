// source
import Bridge from "../../../../src/components/Bridges/Bridge";
import NewRestBridge from "./NewBridge";

const { TextControl } = wp.components;
const { __ } = wp.i18n;

export default function RestBridge({ data, update, remove }) {
  return (
    <Bridge
      data={data}
      update={update}
      remove={remove}
      template={({ add, schema }) => (
        <NewRestBridge add={add} schema={schema} />
      )}
      schema={["post_type", "backend", "foreign_key"]}
    >
      {({ data, update }) => (
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <TextControl
            label={__("Endpoint", "posts-bridge")}
            value={data.endpoint || ""}
            onChange={(endpoint) => update({ ...data, endpoint })}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
        </div>
      )}
    </Bridge>
  );
}
