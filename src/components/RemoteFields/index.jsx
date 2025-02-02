// vendor
import React from "react";
import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

// source
import RemoteFieldsTable from "./Table";

export default function RemoteFields({ fields, setFields }) {
  const __ = wp.i18n.__;
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
