import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  InnerBlocks,
} from "@wordpress/block-editor";
import { useEntityProp } from "@wordpress/core-data";
import { PanelBody } from "@wordpress/components";
import { useEffect, useMemo, useState } from "@wordpress/element";

import "./editor.scss";
import { PanelRow } from "@wordpress/components";

export default function Edit({
  attributes,
  setAttributes,
  context: { postType, postId },
}) {
  const blockProps = useBlockProps();

  const { remotes } = attributes;

  const [meta] = useEntityProp("postType", postType, "meta", postId);
  const registeredOptions = useMemo(
    () =>
      Object.keys(meta).map((remote) => ({
        label: remote,
        value: remote,
      })),
    [meta]
  );

  const [registereds, setRegistereds] = useState([]);
  const [custom, setCustom] = useState("");

  useEffect(() => {
    const registereds = [];
    const custom = [];
    (remotes || "").split(",").forEach((remote) => {
      if (Object.prototype.hasOwnProperty.call(meta, remote)) {
        registereds.push(remote);
      } else {
        custom.push(remote);
      }
    });

    setRegistereds(registereds);
    setCustom(custom.join(","));
  }, [remotes, meta]);

  useEffect(() => {
    const remotes = (custom || "")
      .split(",")
      .map((remote) => remote.trim())
      .concat(registereds)
      .join(",");
    setAttributes({ remotes });
  }, [registereds, custom]);

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("How does it works?", "posts-bridge")}>
          <p>
            {__(
              "Use Gutenberg blocks to build the content of the block.",
              "posts-bridge"
            )}
          </p>
          <p>
            {__(
              "There where do you want to place some remote value, use the `{{fieldName}}` marks. It doesn't matter where do you place marks, inside a paragraph, or maybe in a link, feel free to play with it.",
              "posts-bridge"
            )}
          </p>
          <p>
            {__(
              "Then, when the block is rendered, this marks will be replaced with its corresponding remote value.",
              "posts-bridge"
            )}
          </p>
        </PanelBody>
        <PanelBody
          title={__("Registered remote fields", "posts-bridge")}
          initialOpen={false}
        >
          <ul>
            {Object.keys(meta).map((remote) => (
              <li>{remote}</li>
            ))}
          </ul>
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
