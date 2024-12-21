// vendor
import React from "react";
import { TextControl, SelectControl } from "@wordpress/components";

// source
import NewRelation from "../../../../src/components/Relations/NewRelation";
import { useSpreadsheets } from "../providers/Spreadsheets";

export default function NewGSRelation({ add, schema }) {
  const __ = wp.i18n.__;

  const spreadsheets = useSpreadsheets();
  const sheetOptions = [{ label: "", value: "" }].concat(
    spreadsheets.map(({ title, id }) => ({
      label: title,
      value: id,
    }))
  );

  return (
    <NewRelation add={add} schema={schema}>
      {({ data, update }) => (
        <>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <SelectControl
              label={__("Spreadsheet", "posts-bridge")}
              help={
                spreadsheets.length === 0
                  ? __(
                      "Before you can use spreadsheet hooks, you have to grant access to Posts Bridge as OAuth client",
                      "posts-bridge"
                    )
                  : ""
              }
              value={data.spreadsheet || ""}
              onChange={(spreadsheet) => update({ ...data, spreadsheet })}
              options={sheetOptions}
              __nextHasNoMarginBottom
            />
          </div>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Tab Name", "posts-bridge")}
              value={data.tab || ""}
              onChange={(tab) => update({ ...data, tab })}
              __nextHasNoMarginBottom
            />
          </div>
        </>
      )}
    </NewRelation>
  );
}
