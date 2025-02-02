// vendor
import React from "react";
import { useState, useEffect } from "@wordpress/element";
import {
  __experimentalSpacer as Spacer,
  Button,
  Modal,
  Notice,
} from "@wordpress/components";

// source
import { useStoreSubmit } from "../../../../providers/Store";
import { useGeneral, useApis } from "../../../../providers/Settings";

export default function Exporter() {
  const __ = wp.i18n.__;

  const [general] = useGeneral();
  const [apis] = useApis();
  const submit = useStoreSubmit();

  const [showModal, setShowModal] = useState(false);
  const [userConsent, setUserConsent] = useState(false);
  const [error, setError] = useState(false);

  const downloadConfig = () => {
    const settings = wppb.bus("submit", {});
    const blob = new Blob([JSON.stringify(settings)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date();
    link.download = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-posts-bridge.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importConfig = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    document.body.appendChild(input);
    input.click();
    input.addEventListener("change", () => {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        let config;
        try {
          config = JSON.parse(reader.result);
        } catch {
          setError(__("JSON syntax error", "posts-bridge"));
          return;
        }

        const newState = {
          general: { ...general, ...(config.general || {}) },
          apis: {
            ...apis,
            ...Object.fromEntries(
              Object.entries(config)
                .filter(
                  ([key]) =>
                    key !== "general" && Object.keys(apis).indexOf(key) !== -1
                )
                .map(([key, data]) => [key, { ...apis[key], ...data }])
            ),
          },
        };

        wppb.emit("patch", newState);
        setTimeout(() =>
          submit()
            .then(() => setError(false))
            .catch(() =>
              setError(
                __("It has been an error on config import", "posts-bridge")
              )
            )
        );
      };

      reader.onerror = () =>
        setError(__("Somthing went wrong on the file upload", "posts-bridge"));

      reader.readAsText(file);
    });
  };

  useEffect(() => {
    return () => {
      if (showModal && userConsent) {
        importConfig();
        setUserConsent(false);
      }
    };
  }, [showModal, userConsent]);

  return (
    <>
      <Spacer paddyngY="calc(3px)" />
      {error && (
        <Notice status="error" isDismissable={false} politeness="assertive">
          {error}
        </Notice>
      )}
      <ul style={{ display: "flex", gap: "1rem" }}>
        <li>
          <Button
            variant="primary"
            description={__(
              "Export Forms Bridge config as JSON",
              "posts-bridge"
            )}
            onClick={downloadConfig}
            style={{ width: "150px", justifyContent: "center" }}
            __next40pxDefaultSize
          >
            {__("Download config", "posts-bridge")}
          </Button>
        </li>
        <li>
          <Button
            variant="secondary"
            description={__("Import Forms Bridge JSON config", "posts-bridge")}
            onClick={() => setShowModal(true)}
            style={{ width: "150px", justifyContent: "center" }}
            __next40pxDefaultSize
          >
            {__("Import config", "posts-bridge")}
          </Button>
        </li>
      </ul>
      {showModal && (
        <Modal
          title={__("Config import warning", "posts-bridge")}
          onRequestClose={() => setShowModal(false)}
        >
          <p>
            {__(
              "Import a new configuration is a destructive action. Your current configuration will be replaced with the new one. If there are some errors on the new config, Forms Bridge will filter it to avoid bugs.",
              "posts-bridge"
            )}
          </p>
          <p>{__("Are you sure to continue?", "posts-bridge")}</p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button
              variant="primary"
              description={__("Continue with the import", "posts-bridge")}
              onClick={() => {
                setUserConsent(true);
                setTimeout(() => setShowModal(false));
              }}
            >
              {__("Continue", "posts-bridge")}
            </Button>
            <Button
              variant="primary"
              isDestructive={true}
              description={__("Cancel de import", "posts-bridge")}
              onClick={() => {
                setUserConsent(false);
                setTimeout(() => setShowModal(false));
              }}
            >
              {__("Cancel", "posts-bridge")}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
