import "./editor.css";

const { __ } = wp.i18n;
const { useBlockProps, InspectorControls, InnerBlocks } = wp.blockEditor;
const { useState, useEffect, useRef } = wp.element;
const { PanelBody } = wp.components;
const apiFetch = wp.apiFetch;

export default function Edit({ context: { postType, postId } }) {
  const blockProps = useBlockProps();

  const remotesList = useRef();

  const [remoteFields, setRemoteFields] = useState([]);

  useEffect(() => {
    if (!postId || !postType) return;

    let done = false;
    const abortController = new AbortController();
    apiFetch({
      path: `posts-bridge/v1/rcpt/${postType}/${postId}`,
      method: "GET",
      signal: abortController.signal,
    })
      .then((fields) => {
        setRemoteFields(fields);
      })
      .catch(() => setRemoteFields([]))
      .finally(() => (done = true));

    return () => {
      !done && abortController.abort();
    };
  }, [postId, postType]);

  const copyFieldName = (index) => {
    const field = remoteFields[index];
    navigator.clipboard.writeText(`{{${field.name}}}`);

    Array.from(remotesList.current.children).forEach((child, i) => {
      child.children[0].style.display = index === i ? "block" : "none";
      child.children[1].style.color =
        index === i
          ? "var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9))"
          : "inherit";
    });

    setTimeout(() => {
      const child = remotesList.current.children[index];
      if (!child) return;
      child.children[0].style.display = "none";
      child.children[1].style.color = "inherit";
    }, 1500);
  };

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
              "There where you want to place some remote value, use the `{{fieldName}}` marks. It doesn't matter where do you place marks, inside a paragraph, or maybe in a link, feel free to play with it.",
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
          title={__("Remote fields", "posts-bridge")}
          initialOpen={false}
        >
          <ul ref={remotesList}>
            {remoteFields.map((field, index) => (
              <li className="remote-field" style={{ position: "relative" }}>
                <span
                  style={{
                    display: "none",
                    position: "absolute",
                    top: "-2.5em",
                    left: "-0.25em",
                    background:
                      "var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9))",
                    color: "var(--wp-components-color-accent-inverted,#fff)",
                    padding: "0.35em 0.85em",
                    borderRadius: "12px",
                    boxShadow: "1px 1px 3px #0005",
                  }}
                >
                  {__("Copied!", "posts-bridge")}
                </span>
                <span
                  onClick={() => copyFieldName(index)}
                  style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "color 300ms ease",
                  }}
                >
                  {field.name}
                </span>{" "}
                | {field.schema.type}
              </li>
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
