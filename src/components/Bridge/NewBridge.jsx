// source
import { useError } from "../../providers/Error";
import BridgeFields, { INTERNALS } from "./Fields";
import Templates from "../Templates";
import { isset, uploadJson } from "../../lib/utils";
import useResponsive from "../../hooks/useResponsive";
import Mappers from "../Mappers";
import ArrowUpIcon from "../icons/ArrowUp";

const { Button } = wp.components;
const { useState, useMemo } = wp.element;
const { __ } = wp.i18n;

export default function NewBridge({ add, schema, rcpts }) {
  const isResponsive = useResponsive();

  const [data, setData] = useState({});

  const [error, setError] = useError();

  const create = () => {
    window.__wpfbInvalidated = true;
    setData({});
    add(data);
  };

  const validate = (data) => {
    return !!Object.keys(schema.properties)
      .filter((prop) => !INTERNALS.includes(prop))
      .reduce((isValid, prop) => {
        if (!isValid) return isValid;

        const value = data[prop];

        if (!schema.required.includes(prop)) {
          return isValid;
        }

        if (schema.properties[prop].pattern) {
          isValid = new RegExp(schema.properties[prop].pattern).test(value);
        }

        return isValid && (value || isset(schema.properties[prop], "default"));
      }, true);
  };

  const isValid = useMemo(() => {
    return validate(data);
  }, [data]);

  const uploadConfig = () => {
    uploadJson()
      .then((data) => {
        const isValid = validate(data);

        if (!isValid) {
          setError(__("Invalid bridge config", "posts-bridge"));
          return;
        }

        let i = 1;
        while (rcpts.has(data.post_type)) {
          data.post_type = data.name.replace(/ \([0-9]+\)/, "") + ` (${i})`;
          i++;
        }

        add(data);
      })
      .catch((err) => {
        if (err?.name === "SyntaxError") {
          setError(__("JSON syntax error", "posts-bridge"));
        } else {
          setError(
            __(
              "An error has ocurred while uploading the bridge config",
              "posts-bridge"
            )
          );
        }
      });
  };

  return (
    <div
      style={{
        padding: "calc(24px) calc(32px)",
        width: "calc(100% - 64px)",
        backgroundColor: "rgb(245, 245, 245)",
        display: "flex",
        flexDirection: isResponsive ? "column" : "row",
        gap: "2rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <BridgeFields data={data} setData={setData} schema={schema} />
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
          <Button
            variant="primary"
            onClick={create}
            style={{ width: "100px", justifyContent: "center" }}
            disabled={!isValid}
            __next40pxDefaultSize
          >
            {__("Add", "posts-bridge")}
          </Button>
          <Button
            variant="tertiary"
            size="compact"
            style={{
              width: "40px",
              height: "40px",
              justifyContent: "center",
              fontSize: "1.5em",
              border: "1px solid",
              color: "grey",
            }}
            disabled={!!error}
            onClick={uploadConfig}
            __next40pxDefaultSize
            label={__("Upload", "posts-bridge")}
            showTooltip
          >
            <ArrowUpIcon width="12" height="20" color="gray" />
          </Button>
        </div>
      </div>
      <div
        style={
          isResponsive
            ? {
                paddingTop: "2rem",
                borderTop: "1px solid",
              }
            : {
                paddingLeft: "2rem",
                borderLeft: "1px solid",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }
        }
      >
        <Mappers
          mappers={data.mappers || []}
          setMappers={(mappers) => setData({ ...data, mappers })}
        />
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
            borderTop: "1px solid",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button
              variant="secondary"
              style={{ width: "150px", justifyContent: "center" }}
              __next40pxDefaultSize
              disabled
            >
              {__("Syncrhonize", "posts-bridge")}
            </Button>
            <div
              style={{
                marginLeft: isResponsive ? 0 : "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Templates />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
