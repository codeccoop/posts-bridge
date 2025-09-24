// source
import RemoveButton from "../RemoveButton";
import { isset, downloadJson } from "../../lib/utils";
import BridgeFields, { INTERNALS } from "./Fields";
import ToggleControl from "../Toggle";
import useResponsive from "../../hooks/useResponsive";
import CopyIcon from "../icons/Copy";
import ArrowDownIcon from "../icons/ArrowDown";
import { useLoading } from "../../providers/Loading";
import { useError } from "../../providers/Error";
import useTab from "../../hooks/useTab";
import useAjaxSync from "../../hooks/useAjaxSync";
import Mappers from "../Mappers";

const { Button } = wp.components;
const { useState, useEffect, useMemo, useCallback } = wp.element;
const { __ } = wp.i18n;

export default function Bridge({ data, update, remove, schema, copy }) {
  const [addon] = useTab();

  const [loading, setLoading] = useLoading();
  const [error, setError] = useError();
  const isResponsive = useResponsive();

  const [fullMode, setFullMode] = useState(false);

  const validate = useCallback(
    (data) => {
      return !!Object.keys(schema.properties)
        .filter((prop) => !INTERNALS.includes(prop))
        .reduce((isValid, prop) => {
          if (!isValid) return isValid;

          const value = data[prop];

          if (!schema.required.includes(prop)) {
            return isValid;
          }

          if (schema.properties[prop].pattern) {
            isValid =
              isValid &&
              new RegExp(schema.properties[prop].pattern).test(value);
          }

          return (
            isValid && (value || isset(schema.properties[prop], "default"))
          );
        }, true);
    },
    [schema]
  );

  const isValid = useMemo(() => validate(data), [data]);
  if (!isValid && data.is_valid) {
    update({ ...data, is_valid: false });
  }

  const exportConfig = useCallback(() => {
    const bridgeData = { ...data };
    downloadJson(bridgeData, bridgeData.name + " bridge config");
  }, [data]);

  const sync = useAjaxSync({ fullMode, postType: data.post_type });
  const triggerSync = () => sync().finally(() => setFullMode(false));

  const enabled = isValid && data.enabled;

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
        <BridgeFields data={data} setData={update} schema={schema} />
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <RemoveButton
            label={__("Delete", "posts-bridge")}
            onClick={() => remove(data)}
            icon
          />
          <Button
            variant="tertiary"
            style={{
              height: "40px",
              width: "40px",
              justifyContent: "center",
              fontSize: "1.5em",
              border: "1px solid",
              padding: "6px 6px",
            }}
            onClick={copy}
            label={__("Duplaicate", "posts-bridge")}
            showTooltip
            __next40pxDefaultSize
          >
            <CopyIcon
              width="25"
              height="25"
              color="var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9))"
            />
          </Button>
          <Button
            variant="tertiary"
            style={{
              height: "40px",
              width: "40px",
              justifyContent: "center",
              fontSize: "1.5em",
              border: "1px solid",
              color: "gray",
            }}
            onClick={exportConfig}
            __next40pxDefaultSize
            label={__("Download bridge config", "posts-bridge")}
            showTooltip
          >
            <ArrowDownIcon width="12" height="20" color="gray" />
          </Button>
        </div>
      </div>
      <div
        style={
          isResponsive
            ? {}
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
          setMappers={(mappers) => update({ ...data, mappers })}
        />
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            display: "flex",
            flexDirection: isResponsive ? "column" : "row",
            gap: "0.5rem",
            borderTop: "1px solid",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button
              variant="primary"
              onClick={triggerSync}
              style={{ width: "150px", justifyContent: "center" }}
              __next40pxDefaultSize
            >
              {__("Syncrhonize", "posts-bridge")}
            </Button>
            <ToggleControl
              label={__("Full synchronization mode", "posts-bridge")}
              checked={fullMode}
              onChange={() => setFullMode(!fullMode)}
              __nextHasNoMarginBottom
            />
          </div>
          <div
            style={{
              marginLeft: isResponsive ? 0 : "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ToggleControl
              disabled={!isValid}
              checked={data.enabled && isValid}
              onChange={() => update({ ...data, enabled: !data.enabled })}
              __nextHasNoMarginBottom
            />
            <span
              style={{
                width: "50px",
                marginLeft: "-10px",
                fontStyle: "normal",
                fontSize: "12px",
                color: enabled
                  ? "var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9))"
                  : "rgb(117, 117, 117)",
              }}
            >
              {!isValid || !data.enabled
                ? __("Disabled", "posts-bridge")
                : __("Enabled", "posts-bridge")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
