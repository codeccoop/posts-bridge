// source
import NewBridge from "../../../../src/components/Bridges/NewBridge";
import { useSpreadsheets } from "../providers/Spreadsheets";
import GSTemplateWizard from "./TemplateWizard";

const { TextControl, SelectControl } = wp.components;
const { __ } = wp.i18n;

export default function NewGSBridge({ add, schema }) {
  const spreadsheets = useSpreadsheets();
  const sheetOptions = [{ label: "", value: "" }].concat(
    spreadsheets.map(({ title, id }) => ({
      label: title,
      value: id,
    }))
  );

  return (
    <NewBridge add={add} schema={schema} Wizard={GSTemplateWizard}>
      {({ data, update }) => (
        <>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <SelectControl
              label={__("Spreadsheet", "posts-bridge")}
              help={
                spreadsheets.length === 0
                  ? __(
                      "Before you can use spreadsheet bridges, you have to grant access to Posts Bridge as OAuth client",
                      "posts-bridge"
                    )
                  : ""
              }
              value={data.spreadsheet || ""}
              onChange={(spreadsheet) => update({ ...data, spreadsheet })}
              options={sheetOptions}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
          <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
            <TextControl
              label={__("Tab Name", "posts-bridge")}
              value={data.tab || ""}
              onChange={(tab) => update({ ...data, tab })}
              __nextHasNoMarginBottom
              __next40pxDefaultSize
            />
          </div>
        </>
      )}
    </NewBridge>
  );
}
