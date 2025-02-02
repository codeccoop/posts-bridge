// source
import Relation from "../../../../src/components/Relations/Relation";
import NewOdooRelation from "./NewRelation";
import useOdooApi from "../hooks/useOdooApi";

const { TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;

export default function OdooRelation({ data, update, remove }) {
  const [{ databases }] = useOdooApi();
  const dbOptions = [{ label: "", value: "" }].concat(
    databases.map(({ name }) => ({
      label: name,
      value: name,
    }))
  );

  return (
    <Relation
      data={data}
      update={update}
      remove={remove}
      template={({ add, schema }) => (
        <NewOdooRelation add={add} schema={schema} />
      )}
      schema={["post_type", "database", "model"]}
    >
      {({ data, update }) => (
        <>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <SelectControl
              label={__("Database", "posts-bridge")}
              value={data.database}
              onChange={(database) => update({ ...data, database })}
              options={dbOptions}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Model", "posts-bridge")}
              value={data.model}
              onChange={(model) => update({ ...data, model })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
        </>
      )}
    </Relation>
  );
}
