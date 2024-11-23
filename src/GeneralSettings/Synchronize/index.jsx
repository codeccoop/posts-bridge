// vendor
import React from "react";
import {
  __experimentalSpacer as Spacer,
  ToggleControl,
  PanelRow,
  SelectControl,
} from "@wordpress/components";

const recurrenceOptions = [
  {
    name: "Minutly",
    value: "minutly",
  },
  {
    name: "Twice Hourly",
    value: "twicehourly",
  },
  {
    name: "Hourly",
    value: "hourly",
  },
  {
    name: "Twice Daily",
    value: "twicedaily",
  },
  {
    name: "Daily",
    value: "daily",
  },
  {
    name: "Weekly",
    value: "weekly",
  },
];

export default function Synchronize({ synchronize, setSynchronize }) {
  const __ = wp.i18n.__;

  const { enabled, recurrence } = synchronize;

  const update = (field) => setSynchronize({ ...synchronize, ...field });

  return (
    <>
      <PanelRow>
        <ToggleControl
          label={__("Automatic syncrhonization", "posts-bridge")}
          checked={enabled}
          onChange={() => update({ enabled: !enabled })}
          __nextHasNoMarginBottom
          help={__(
            "Allow pull strategy syncrhonization. WordPress will check the remote sources for updates and update its indices. This strategy can cause performance issues if you have large backend models collections",
            "posts-bridge"
          )}
        />
      </PanelRow>
      <Spacer paddingY="calc(8px)" />
      <PanelRow>
        <SelectControl
          label={__("Recurrence", "posts-bridge")}
          value={recurrence}
          onChange={(recurrence) => update({ recurrence })}
          options={recurrenceOptions.map((opt) => ({
            value: opt.value,
            name: __(opt, "posts-bridge"),
          }))}
          __nextHasNoMarginBottom
        />
      </PanelRow>
    </>
  );
}
