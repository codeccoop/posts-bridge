// source
import { useTemplate, useTemplates } from "../../providers/Templates";

const { Modal, Button, SelectControl } = wp.components;
const { useState, useEffect, useRef } = wp.element;
const { __ } = wp.i18n;

export default function Templates({ Wizard }) {
  const templates = useTemplates();
  const [, setTemplate] = useTemplate();

  const [done, setDone] = useState(false);

  const templateOptions = [{ label: "", value: "" }].concat(
    templates.map(({ name, title }) => ({
      label: title,
      value: name,
    }))
  );

  const [isOpen, setIsOpen] = useState(false);

  const onError = useRef(() => setIsOpen(false)).current;

  useEffect(() => {
    wppb.on("error", onError);
    return () => {
      wppb.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (done) {
      setTemplate(null);
    }
  }, [done]);

  useEffect(() => {
    if (!isOpen) {
      setTemplate(null);
      setDone(false);
    }
  }, [isOpen]);

  if (!templates.length) return;

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(true)}
        style={{
          width: "150px",
          marginTop: "auto",
          justifyContent: "center",
        }}
        __next40pxDefaultSize
      >
        {__("Use tempalte", "posts-bridge")}
      </Button>
      {isOpen && (
        <Modal
          title={__("Templates", "posts-bridge")}
          onRequestClose={() => setIsOpen(false)}
        >
          {(done && (
            <>
              <p style={{ fontSize: "1rem" }}>
                {__(
                  "Congratulations, you've created a new post bridge!",
                  "posts-bridge"
                )}
              </p>
              <Button
                variant="primary"
                onClick={() => setIsOpen(false)}
                style={{
                  width: "150px",
                  margin: "1.5rem auto 0",
                  display: "block",
                }}
                __next40pxDefaultSize
              >
                {__("Close", "posts-bridge")}
              </Button>
            </>
          )) || (
            <SelectControl
              label={__("Select a template", "posts-bridge")}
              options={templateOptions}
              onChange={setTemplate}
              __nextHasNoMarginBottom
            />
          )}
          <Wizard onDone={() => setDone(true)} />
        </Modal>
      )}
    </>
  );
}
