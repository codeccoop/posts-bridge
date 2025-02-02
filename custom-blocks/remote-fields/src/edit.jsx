import "./editor.css";

const { __ } = wp.i18n;
const { useBlockProps, InspectorControls, InnerBlocks } = wp.blockEditor;
const { useEntityProp } = wp.coreData;
const { PanelBody } = wp.components;

export default function Edit({ context: { postType, postId } }) {
  const blockProps = useBlockProps();

  const [meta = {}] = useEntityProp("postType", postType, "meta", postId);

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
