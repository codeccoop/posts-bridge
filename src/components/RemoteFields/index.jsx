// source
import RemoteFieldsTable from "./Table";

const { Button, Modal } = wp.components;
const { useState } = wp.element;
const { __ } = wp.i18n;

export default function RemoteFields({ fields, setFields }) {
  const [open, setOpen] = useState(false);

  const handleSetFields = (fields) => {
    fields.forEach((field) => {
      delete field.index;
    });

    setFields(fields);
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpen(true)}
        style={{ width: "150px", justifyContent: "center" }}
        __next40pxDefaultSize
      >
        {__("Remote fields", "posts-bridge")}
      </Button>
      {open && (
        <Modal
          title={__("Remote fields", "posts-bridge")}
          onRequestClose={() => setOpen(false)}
        >
          <RemoteFieldsTable
            fields={fields.map((field, index) => ({ ...field, index }))}
            setFields={handleSetFields}
            done={() => setOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
