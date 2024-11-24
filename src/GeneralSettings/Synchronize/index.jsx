// vendor
import React from "react";
import {
  __experimentalSpacer as Spacer,
  ToggleControl,
  PanelRow,
  SelectControl,
  Button,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const update = (field) => setSynchronize({ ...synchronize, ...field });

  const ajaxSync = () => {
    setLoading(true);
    const body = new URLSearchParams();
    body.set("_ajax_nonce", _postsBridgeAjax.nonce);
    body.set("action", _postsBridgeAjax.action);

    fetch(_postsBridgeAjax.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })
      .then(() => setLoading(false))
      .catch(() => setError(true));
  };

  return (
    <>
      <Spacer paddingY="calc(8px)" />
      <PanelRow>
        <Button
          variant="primary"
          isBusy={loading}
          disabled={error}
          isDestructive={error}
          onClick={ajaxSync}
          __next40pxDefaultSize
        >
          {__("Synchronize", "posts-bridge")}
        </Button>
      </PanelRow>
      <Spacer paddingY="calc(8px)" />
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
