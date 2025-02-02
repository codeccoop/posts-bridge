// source
import Relation from "../../../../src/components/Relations/Relation";
import NewWPRelation from "./NewRelation";

const { TextControl } = wp.components;
const { __ } = wp.i18n;

export default function WPRelation({ data, update, remove }) {
  return (
    <Relation
      data={data}
      update={update}
      remove={remove}
      template={({ add, schema }) => (
        <NewWPRelation add={add} schema={schema} />
      )}
      schema={["post_type", "backend", "remote_type"]}
    >
      {({ data, update }) => (
        <>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Remote post type", "posts-bridge")}
              value={data.remote_type}
              onChange={(remote_type) => update({ ...data, remote_type })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
        </>
      )}
    </Relation>
  );
}
