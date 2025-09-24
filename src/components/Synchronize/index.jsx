// source
import useAjaxSync from "../../hooks/useAjaxSync";
import { useError } from "../../providers/Error";
import { useLoading } from "../../providers/Loading";
import ToggleControl from "../Toggle";

const {
  __experimentalSpacer: Spacer,
  PanelRow,
  SelectControl,
  Button,
} = wp.components;
const { useState, useEffect } = wp.element;
const { __ } = wp.i18n;

const recurrenceOptions = [
  {
    label: __("Minutly", "posts-bridge"),
    value: "minutly",
  },
  {
    label: __("Quarterly", "posts-bridge"),
    value: "quarterly",
  },
  {
    label: __("Twice Hourly", "posts-bridge"),
    value: "twicehourly",
  },
  {
    label: __("Hourly", "posts-bridge"),
    value: "hourly",
  },
  {
    label: __("Twice Daily", "posts-bridge"),
    value: "twicedaily",
  },
  {
    label: __("Daily", "posts-bridge"),
    value: "daily",
  },
  {
    label: __("Weekly", "posts-bridge"),
    value: "weekly",
  },
];

export default function Synchronize({ synchronize, setSynchronize }) {
  const [loading] = useLoading();
  const [error] = useError();

  const { enabled, recurrence } = synchronize;

  const [fullMode, setFullMode] = useState(false);

  const sync = useAjaxSync({ fullMode });

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
          disabled={loading || error}
          onClick={sync}
          style={{ width: "150px", justifyContent: "center" }}
          __next40pxDefaultSize
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
      <p>{__("Schedule", "posts-bridge")}</p>
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
