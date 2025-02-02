// source
import { usePostTypes } from "../../providers/PostTypes";
import CopyIcon from "../CopyIcon";

const { TabPanel } = wp.components;
const { useState } = wp.element;
const { __ } = wp.i18n;

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

export default function Relations({ relations, setRelations, Relation }) {
  const postTypes = usePostTypes({ filter: true });

  const [currentTab, setCurrentTab] = useState(relations[0]?.name || "add");
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = relations
    .map(
      ({
        backend,
        endpoint,
        post_type,
        foreign_key = "id",
        fields = [],
        ...customFields
      }) => ({
        ...customFields,
        name: post_type,
        title: post_type,
        post_type,
        backend,
        endpoint,
        foreign_key,
        fields,
        icon: postTypes.length ? (
          <TabTitle
            name={post_type}
            focus={tabFocus === post_type}
            setFocus={(value) => setTabFocus(value ? post_type : null)}
            copy={() => copyRelation(post_type)}
          />
        ) : null,
      })
    )
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
    const relation = relations[i];
    const copy = {
      ...relation,
      fields: JSON.parse(JSON.stringify(relation.fields || [])),
    };

    copy.post_type = postTypes[0];
    setRelations(relations.concat(copy));
    setCurrentTab(copy.post_type);
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
            data={relation}
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
