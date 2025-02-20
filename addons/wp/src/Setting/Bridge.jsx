// source
import Bridge from "../../../../src/components/Bridges/Bridge";
import NewWPBridge from "./NewBridge";

const { TextControl } = wp.components;
const { __ } = wp.i18n;

export default function WPBridge({ data, update, remove }) {
  return (
    <Bridge
      data={data}
      update={update}
      remove={remove}
      template={({ add, schema }) => <NewWPBridge add={add} schema={schema} />}
      schema={["post_type", "backend", "remote_type"]}
    >
      {({ data, update }) => (
        <>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Remote post type", "posts-bridge")}
              value={data.remote_type || ""}
              onChange={(remote_type) => update({ ...data, remote_type })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
        </>
      )}
    </Bridge>
  );
}
