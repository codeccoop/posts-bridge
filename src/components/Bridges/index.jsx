// source
import { usePostTypes } from "../../providers/Settings";
import CopyIcon from "../CopyIcon";

const { TabPanel } = wp.components;
const { useEffect, useState, useRef } = wp.element;
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

export default function Bridges({ bridges, setBridges, Bridge }) {
  const postTypes = usePostTypes({ filter: true });

  const [currentTab, setCurrentTab] = useState(String(bridges.length ? 0 : -1));
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = bridges
    .map(
      (
        {
          backend,
          post_type,
          foreign_key = "id",
          fields = [],
          ...customFields
        },
        i
      ) => ({
        ...customFields,
        name: String(i),
        title: post_type,
        post_type,
        backend,
        foreign_key,
        fields,
        icon: postTypes.length ? (
          <TabTitle
            name={post_type}
            focus={tabFocus === post_type}
            setFocus={(value) => setTabFocus(value ? post_type : null)}
            copy={() => copyBridge(post_type)}
          />
        ) : null,
      })
    )
    .concat([
      {
        name: "-1",
        title: __("Add bridge", "posts-bridge"),
      },
    ]);

  const bridgesCount = useRef(bridges.length);
  useEffect(() => {
    if (bridges.length > bridgesCount.current) {
      setCurrentTab(String(bridges.length - 1));
    } else if (bridges.length < bridgesCount.current) {
      setCurrentTab(String(currentTab - 1));
    }

    return () => {
      bridgesCount.current = bridges.length;
    };
  }, [bridges]);

  const updateBridge = (index, data) => {
    if (index === -1) index = bridges.length;

    const newBridges = bridges
      .slice(0, index)
      .concat([data])
      .concat(bridges.slice(index + 1, bridges.length));

    newBridges.forEach((rel) => {
      delete rel.name;
      delete rel.title;
      delete rel.icon;
    });

    setBridges(newBridges);
  };

  const removeBridge = ({ post_type }) => {
    const index = bridges.findIndex((b) => b.post_type === post_type);
    const newBridges = bridges.slice(0, index).concat(bridges.slice(index + 1));
    setBridges(newBridges);
  };

  const copyBridge = (post_type) => {
    const i = bridges.findIndex((b) => b.post_type === post_type);
    const bridge = bridges[i];

    const copy = {
      ...bridge,
      post_type: postTypes[0],
      fields: JSON.parse(JSON.stringify(bridge.fields || [])),
    };

    setBridges(bridges.concat(copy));
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
        {__("Bridges", "posts-bridge")}
      </label>
      <TabPanel
        tabs={tabs}
        onSelect={setCurrentTab}
        initialTabName={currentTab}
      >
        {(bridge) => {
          bridge.name = bridge.name >= 0 ? bridges[+bridge.name].name : "add";
          return (
            <Bridge
              data={bridge}
              remove={removeBridge}
              update={(data) =>
                updateBridge(
                  bridges.findIndex(
                    ({ post_type }) => post_type === bridge.post_type
                  ),
                  data
                )
              }
            />
          );
        }}
      </TabPanel>
    </div>
  );
}
