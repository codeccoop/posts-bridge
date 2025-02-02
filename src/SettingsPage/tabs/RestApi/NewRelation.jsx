// source
import NewRelation from "../../../components/Relations/NewRelation";

const { TextControl } = wp.components;
const { __ } = wp.i18n;

export default function NewRestRelation({ add, schema }) {
  return (
    <NewRelation add={add} schema={schema}>
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
    </NewRelation>
  );
}
