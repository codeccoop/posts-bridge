// source
import Relation from "../../../components/Relations/Relation";
import NewRestRelation from "./NewRelation";

const { TextControl } = wp.components;
const { __ } = wp.i18n;

export default function RestRelation({ data, update, remove }) {
  return (
    <Relation
      data={data}
      update={update}
      remove={remove}
      schema={["post_type", "backend", "foreign_key", "endpoint"]}
      template={({ add, schema }) => (
        <NewRestRelation add={add} schema={schema} />
      )}
    >
      {({ data, update }) => (
        <>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Endpoint", "posts-bridge")}
              value={data.endpoint || ""}
              onChange={(endpoint) => update({ ...data, endpoint })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
        </>
      )}
    </Relation>
  );
}
