import "./editor.css";

const { __ } = wp.i18n;
const { useBlockProps, InspectorControls, InnerBlocks } = wp.blockEditor;
const { useState, useEffect, useRef, useMemo } = wp.element;
const { PanelBody, SelectControl } = wp.components;
const apiFetch = wp.apiFetch;
const { useSelect } = wp.data;

if (!window.postsBridge) {
  let remoteCpt = null;
  window.postsBridge = {};
  Object.defineProperty(window.postsBridge, "remoteCpt", {
    get: () => remoteCpt,
    set: (val) => {
      remoteCpt = val;
      while (listeners.length) {
        listener = listeners.shift();
        listener(val);
      }
    },
  });

  const listeners = [];
  window.postsBridge.useRemoteCpt = (listener) => {
    listeners.push(listener);
    remoteCpt && listener(remoteCpt);
  };
}

const postsBridge = window.postsBridge;

export default function Edit({
  context: { postType: editorPostType, postId },
}) {
  const blockProps = useBlockProps();

  const remotesList = useRef();

  const [isTemplate, setIsTemplate] = useState(false);
  const [remoteFields, setRemoteFields] = useState([]);
  const [remoteCpts, setRemoteCpts] = useState(null);
  const [remoteCpt, setRemoteCpt] = useState(null);

  useEffect(() => {
    postsBridge.useRemoteCpt((newRemoteCpt) => {
      if (newRemoteCpt !== remoteCpt) {
        setRemoteCpt(newRemoteCpt);
      }
    });
  }, [remoteCpt]);

  useSelect((select) => {
    const { getCurrentPostType } = select(wp.editor.store);
    const currentPostType = getCurrentPostType();
    if (currentPostType === "wp_template" && !isTemplate) {
      setIsTemplate(true);
    } else if (currentPostType !== "template" && isTemplate) {
      setIsTemplate(false);
    }
  }, []);

  useEffect(() => {
    let abortController,
      done = false;

    if (isTemplate && remoteCpts === null) {
      if (postsBridge.remoteCpts) {
        Promise.resolve(postsBridge.remoteCpts).then((remoteCpts) => {
          setRemoteCpts(remoteCpts);
        });
      } else {
        abortController = new AbortController();
        postsBridge.remoteCpts = apiFetch({
          path: "posts-bridge/v1/post_types/remotes",
          signal: abortController.signal,
        })
          .then((remoteCpts) => {
            if (remoteCpts === undefined) return [];
            postsBridge.remoteCpts = remoteCpts;
            setRemoteCpts(postsBridge.remoteCpts);
            return postsBridge.remoteCpts;
          })
          .catch(() => {
            postsBridge.remoteCpts = [];
            setRemoteCpts(postsBridge.remoteCpts);
            return postsBridge.remoteCpts;
          })
          .finally(() => (done = true));
      }
    }

    return () => {
      if (!done && abortController) {
        abortController.abort();
      }
    };
  }, [isTemplate, remoteCpts]);

  const rcptOptions = useMemo(() => {
    const options = [{ label: "", value: "" }];
    if (remoteCpts === null) return options;
    return options.concat(
      remoteCpts.map((rcpt) => ({
        value: rcpt,
        label: rcpt,
      }))
    );
  }, [remoteCpts]);

  const postType = remoteCpt || editorPostType;

  useEffect(() => {
    let abortController,
      done = false;

    if (!postType) return;

    if (postsBridge.remoteFields) {
      Promise.resolve(postsBridge.remoteFields).then((remoteFields) => {
        setRemoteFields(remoteFields);
      });
    } else {
      postId = postId || 0;
      abortController = new AbortController();
      postsBridge.remoteFields = apiFetch({
        path: `posts-bridge/v1/rcpt/${postType}/${postId}`,
        method: "GET",
        signal: abortController.signal,
      })
        .then((remoteFields) => {
          if (remoteFields === undefined) return [];
          postsBridge.remoteFields = remoteFields;
          setRemoteFields(postsBridge.remoteFields);
          return postsBridge.remoteFields;
        })
        .catch(() => {
          postsBridge.remoteFields = [];
          setRemoteFields(postsBridge.remoteFields);
          return postsBridge.remoteFields;
        })
        .finally(() => (done = true));
    }

    return () => {
      if (!done && abortController) {
        abortController.abort();
      }
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
              "There where you want to place some remote value, use the `{{fieldName}}` marks. Use the list below to see available fields.",
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
          {isTemplate && (
            <SelectControl
              label={__("Select a remote CPT", "posts-bridge")}
              value={remoteCpt}
              onChange={(remoteCpt) => {
                delete postsBridge.remoteFields;
                postsBridge.remoteCpt = remoteCpt;
              }}
              options={rcptOptions}
              __next40pxDefaultSize
              __nextHasNoMarginBottom
            />
          )}
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
