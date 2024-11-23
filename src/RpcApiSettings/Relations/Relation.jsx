// vendor
import React from "react";
import {
  TextControl,
  SelectControl,
  Button,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";
import { useState, useRef, useEffect, useMemo } from "@wordpress/element";

// source
import { usePostTypes } from "../../providers/PostTypes";
import { useGeneral } from "../../providers/Settings";
// import FormPipes from "../../FormPipes";

function NewRelation({ add }) {
  const __ = wp.i18n.__;
  const [{ backends }] = useGeneral();
  const backendOptions = backends.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const postTypes = usePostTypes();
  const postTypesSet = useMemo(() => new Set(postTypes), [postTypes]);
  const postTypeOptions = postTypes.map((postType) => ({
    label: postTypes,
    value: postTypes,
  }));

  const [postType, setPostType] = useState("");
  const [backend, setBackend] = useState(backendOptions[0]?.value || "");
  const [model, setModel] = useState("");
  const [postTypeConflict, setPostTypeConflict] = useState(false);

  const handleSetPostType = (postType) => {
    setPostTypeConflict(postTypesSet.has(postType));
    setPostType(postType);
  };

  const onClick = () => add({ post_type: postType, backend, model });

  const disabled = !(postType && backend && model && !postTypeConflict);

  return (
    <div
      style={{
        padding: "calc(24px) calc(32px)",
        width: "calc(100% - 64px)",
        backgroundColor: "rgb(245, 245, 245)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1em",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <SelectControl
            label={__("Post type", "posts-bridge")}
            value={postType}
            onChange={handleSetPostType}
            options={postTypeOptions}
            __nextHasNoMarginBottom
            help={
              postTypeConflict
                ? __("This post type already has a relation", "posts-bridge")
                : ""
            }
          />
        </div>
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <SelectControl
            label={__("Backend", "posts-bridge")}
            value={backend}
            onChange={setBackend}
            options={backendOptions}
            __nextHasNoMarginBottom
          />
        </div>
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <TextControl
            label={__("Model", "posts-bridge")}
            value={model}
            onChange={setModel}
            __nextHasNoMarginBottom
          />
        </div>
      </div>
      <Spacer paddingY="calc(8px)" />
      <div
        style={{
          display: "flex",
          gap: "1em",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontWeight: 500,
              textTransform: "uppercase",
              fontSize: "11px",
              margin: 0,
              marginBottom: "calc(4px)",
              maxWidth: "100%",
            }}
          >
            {__("Add relation", "posts-bridge")}
          </label>
          <Button
            variant="primary"
            onClick={() => onClick()}
            style={{ width: "130px", justifyContent: "center", height: "32px" }}
            disabled={disabled}
          >
            {__("Add", "posts-bridge")}
          </Button>
        </div>
      </div>
    </div>
  );
}

let focus;
export default function FormHook({ update, remove, ...data }) {
  if (data.name === "add") return <NewRelation add={update} />;

  const __ = wp.i18n.__;
  const [{ backends }] = useGeneral();
  const backendOptions = backends.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const postTypes = usePostTypes();
  const postTypesSet = useMemo(() => new Set(postTypes), [postTypes]);
  const postTypeOptions = postTypes.map((postType) => ({
    label: postType,
    value: postType,
  }));

  const [postType, setPostType] = useState(data.post_type);
  const initialPostType = useRef(data.post_type);
  const postTypeInput = useRef();
  const [postTypeConflict, setPostTypeConflict] = useState(false);

  const handleSetPostType = (postType) => {
    setNameConflict(
      postType !== initialPostType.current && postTypesSet.has(postType)
    );
    setPostType(postType);
  };

  useEffect(() => {
    if (focus) {
      postTypeInput.current.focus();
    }
  }, []);

  const timeout = useRef();
  useEffect(() => {
    clearTimeout(timeout.current);
    if (!postType || postTypeConflict) return;
    timeout.current = setTimeout(
      () => update({ ...data, post_type: postType }),
      500
    );
  }, [postType]);

  useEffect(() => setName(data.name), [data.name]);

  return (
    <div
      style={{
        padding: "calc(24px) calc(32px)",
        width: "calc(100% - 64px)",
        backgroundColor: "rgb(245, 245, 245)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1em",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <TextControl
            ref={postTypeInput}
            label={__("Post type", "posts-bridge")}
            help={
              postTypeConflict
                ? __("This post type already has a relation", "posts-bridge")
                : ""
            }
            value={postType}
            onChange={handleSetPostType}
            onFocus={() => (focus = true)}
            onBlur={() => (focus = false)}
            __nextHasNoMarginBottom
          />
        </div>
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <SelectControl
            label={__("Backend", "posts-bridge")}
            value={data.backend}
            onChange={(backend) => update({ ...data, backend })}
            options={backendOptions}
            __nextHasNoMarginBottom
          />
        </div>
        <div style={{ flex: 1, minWidth: "150px", maxWidth: "250px" }}>
          <TextControl
            label={__("Model", "posts-bridge")}
            value={data.model}
            onChange={(model) => update({ ...data, model })}
            __nextHasNoMarginBottom
          />
        </div>
      </div>
      {/* <Spacer paddingY="calc(8px)" /> */}
      {/* <div */}
      {/*   style={{ */}
      {/*     display: "flex", */}
      {/*     gap: "1em", */}
      {/*     flexWrap: "wrap", */}
      {/*   }} */}
      {/* > */}
      {/*   <div> */}
      {/*     <label */}
      {/*       style={{ */}
      {/*         display: "block", */}
      {/*         fontWeight: 500, */}
      {/*         textTransform: "uppercase", */}
      {/*         fontSize: "11px", */}
      {/*         marginBottom: "calc(4px)", */}
      {/*       }} */}
      {/*     > */}
      {/*       {__("Edit pipes", "posts-bridge")} */}
      {/*     </label> */}
      {/*     <FormPipes */}
      {/*       formId={data.form_id} */}
      {/*       pipes={data.pipes || []} */}
      {/*       setPipes={(pipes) => update({ ...data, pipes })} */}
      {/*     /> */}
      {/*   </div> */}
      {/*   <div> */}
      {/*     <label */}
      {/*       style={{ */}
      {/*         display: "block", */}
      {/*         fontWeight: 500, */}
      {/*         textTransform: "uppercase", */}
      {/*         fontSize: "11px", */}
      {/*         margin: 0, */}
      {/*         marginBottom: "calc(4px)", */}
      {/*         maxWidth: "100%", */}
      {/*       }} */}
      {/*     > */}
      {/*       {__("Remove form", "posts-bridge")} */}
      {/*     </label> */}
      {/*     <Button */}
      {/*       isDestructive */}
      {/*       variant="primary" */}
      {/*       onClick={() => remove(data)} */}
      {/*       style={{ width: "130px", justifyContent: "center", height: "32px" }} */}
      {/*     > */}
      {/*       {__("Remove", "posts-bridge")} */}
      {/*     </Button> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
}
