import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  InnerBlocks,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();

  const { remoteField } = attributes;

  const setField = (field) => {
    setAttributes({ remoteField: field });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Properties")}>
          <TextControl
            label={__("field")}
            help={__("Remote field name to pick from the model")}
            value={remoteField}
            onChange={setField}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <InnerBlocks template={TEMPLATE} />
      </div>
    </>
  );
}

const TEMPLATE = [
  [
    "core/paragraph",
    {
      placeholder: __("Setup your remote field template"),
    },
  ],
];
