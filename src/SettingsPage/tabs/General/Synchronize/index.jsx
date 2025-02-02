// vendor
import React, { useEffect } from "react";
import {
  __experimentalSpacer as Spacer,
  ToggleControl,
  PanelRow,
  SelectControl,
  Button,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

// source
import useAjaxSync from "../../../../hooks/useAjaxSync";

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

  const [fullMode, setFullMode] = useState(false);

  const { loading, error, sync } = useAjaxSync({ fullMode });

  useEffect(() => {
    if (!loading) return;
    return () => {
      setFullMode(false);
    };
  }, [loading]);

  const update = (field) => setSynchronize({ ...synchronize, ...field });

  return (
    <>
      <Spacer paddingY="calc(3px)" />
      <PanelRow>
        <Button
          variant="primary"
          isBusy={loading}
          disabled={error}
          isDestructive={error}
          onClick={sync}
          __next40pxDefaultSize
          style={{ width: "150px", justifyContent: "center" }}
        >
          {__("Synchronize", "posts-bridge")}
        </Button>
      </PanelRow>
      <Spacer paddingY="calc(8px)" />
      <PanelRow>
        <ToggleControl
          label={__("Run a full synchronization", "posts-bridge")}
          help={__(
            "Normal, or light, synchronizations only fetches new remote models data. If do you want to update all your content, you should trigger a full synchronization. This may take a while.",
            "posts-bridge"
          )}
          checked={fullMode}
          onChange={() => setFullMode(!fullMode)}
          __nextHasNoMarginBottom
        />
      </PanelRow>
      <Spacer paddingY="calc(8px)" />
      <hr />
      <p>Schedule</p>
      <PanelRow>
        <ToggleControl
          label={__("Automatic syncrhonization", "posts-bridge")}
          help={__(
            "Allow scheduled pull strategy syncrhonization. WordPress will check the remote sources for updates and update its indices. This strategy can cause performance issues if you have large backend models collections",
            "posts-bridge"
          )}
          checked={enabled}
          onChange={() => update({ enabled: !enabled })}
          __nextHasNoMarginBottom
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
          __next40pxDefaultSize
          style={{ width: "150px" }}
        />
      </PanelRow>
    </>
  );
}
