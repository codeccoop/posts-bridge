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
    label: "Minutly",
    value: "minutly",
  },
  {
    label: "Twice Hourly",
    value: "twicehourly",
  },
  {
    label: "Hourly",
    value: "hourly",
  },
  {
    label: "Twice Daily",
    value: "twicedaily",
  },
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
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
            label: __(opt.label, "posts-bridge"),
          }))}
          __nextHasNoMarginBottom
        />
      </PanelRow>
    </>
  );
}
