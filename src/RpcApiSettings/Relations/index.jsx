// vendor
import React from "react";
import { TabPanel } from "@wordpress/components";
import { useState } from "@wordpress/element";

// source
import Relation from "./Relation";
import { usePostTypes } from "../../providers/PostTypes";

const CopyIcon = ({ onClick }) => {
  const [focus, setFocus] = useState(false);

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        zIndex: 1,
        top: "-4px",
        right: "-5px",
      }}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      onClick={() => onClick()}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.676 14.248C17.676 15.8651 16.3651 17.176 14.748 17.176H7.428C5.81091 17.176 4.5 15.8651 4.5 14.248V6.928C4.5 5.31091 5.81091 4 7.428 4H14.748C16.3651 4 17.676 5.31091 17.676 6.928V14.248Z"
        stroke={focus ? "#3858e9" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#ffffff"
      />
      <path
        d="M10.252 20H17.572C19.1891 20 20.5 18.689 20.5 17.072V9.75195"
        stroke={focus ? "#3858e9" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#ffffff00"
      />
    </svg>
  );
};

function TabTitle({ name, focus, setFocus, copy }) {
  return (
    <div
      style={{ position: "relative", padding: "0px 24px 0px 10px" }}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      <span>{name}</span>
      {focus && <CopyIcon onClick={copy} />}
    </div>
  );
}

export default function Relations({ relations, setRelations }) {
  const __ = wp.i18n.__;

  const postTypes = usePostTypes({ filter: true });
  const [currentTab, setCurrentTab] = useState(relations[0]?.name || "add");
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = relations
    .map(({ backend, post_type, model, fields = [] }) => ({
      name: post_type,
      title: post_type,
      post_type,
      model,
      backend,
      fields,
      icon: postTypes.length ? (
        <TabTitle
          name={post_type}
          focus={tabFocus === post_type}
          setFocus={(value) => setTabFocus(value ? post_type : null)}
          copy={() => copyRelation(post_type)}
        />
      ) : null,
    }))
    .concat([
      {
        title: __("Add relation", "posts-bridge"),
        name: "add",
      },
    ]);

  const updateRelation = (index, data) => {
    if (index === -1) index = relations.length;
    const newRelations = relations
      .slice(0, index)
      .concat([data])
      .concat(relations.slice(index + 1, relations.length));

    newRelations.forEach((rel) => {
      delete rel.name;
      delete rel.title;
      delete rel.icon;
    });
    setRelations(newRelations);
    setCurrentTab(newRelations[index].post_type);
  };

  const removeRelation = ({ post_type }) => {
    const index = relations.findIndex((r) => r.post_type === post_type);
    const newRelations = relations
      .slice(0, index)
      .concat(relations.slice(index + 1));
    setRelations(newRelations);
    setCurrentTab(newRelations[index - 1]?.post_type || "add");
  };

  const copyRelation = (post_type) => {
    const i = relations.findIndex((r) => r.post_type === post_type);
    const relation = {
      post_type: postTypes[0],
      endpoint: relations[i].endpoint,
      method: relations[i].method,
      backend: relations[i].backend,
      fields: JSON.parse(JSON.stringify(relations[i].fields)),
    };

    setRelations(relations.concat(relation));
    setCurrentTab(relation.post_type);
  };

  return (
    <div style={{ width: "100%" }}>
      <label
        className="components-base-control__label"
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: "calc(8px)",
        }}
      >
        {__("Posts remote relations", "posts-bridge")}
      </label>
      <TabPanel
        tabs={tabs}
        onSelect={setCurrentTab}
        initialTabName={currentTab}
      >
        {(relation) => (
          <Relation
            {...relation}
            remove={removeRelation}
            update={(data) =>
              updateRelation(
                relations.findIndex(
                  ({ post_type }) => post_type === relation.post_type
                ),
                data
              )
            }
          />
        )}
      </TabPanel>
    </div>
  );
}
