// vendor
import React from "react";
import { Button, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

// source
import RemoteFieldsTable from "./Table";

export default function RemoteFields({ fields, setFields }) {
  const __ = wp.i18n.__;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpen(true)}
        style={{ width: "130px", justifyContent: "center", height: "32px" }}
      >
        {__("Remote fields", "posts-bridge")}
      </Button>
      {open && (
        <Modal
          title={__("Remote fields", "posts-bridge")}
          onRequestClose={() => setOpen(false)}
        >
          <RemoteFieldsTable fields={fields} setFields={setFields} />
        </Modal>
      )}
    </>
  );
}
