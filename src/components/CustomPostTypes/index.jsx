// source
import {
  useCustomPostTypes,
  useRegisterCustomPostType,
  useUnregisterCustomPostType,
} from "../../providers/CustomPostTypes";
import TabTitle from "../TabTitle";
import CustomPostType from "../CustomPostType";
import AddIcon from "../icons/Add";
import NewCustomPostType from "../CustomPostType/NewCPT";

const { TabPanel } = wp.components;
const { useEffect, useMemo, useRef } = wp.element;
const { __ } = wp.i18n;

const CSS = `.cpts-tabs-panel .components-tab-panel__tabs{overflow-x:auto;}
.cpts-tabs-panel .components-tab-panel__tabs>button{flex-shrink:0;}`;

export default function CustomPostTypes() {
  const customPostTypes = useCustomPostTypes();

  const tabs = useMemo(() => {
    return customPostTypes
      .map((name, index) => ({
        index,
        name: String(index),
        title: name,
        icon: <TabTitle name={name} />,
      }))
      .concat([
        {
          index: -1,
          name: "new",
          title: __("Add a CPT", "posts-bridge"),
          icon: (
            <div style={{ marginBottom: "-2px" }}>
              <AddIcon width="15" height="15" />
            </div>
          ),
        },
      ]);
  });

  const register = useRegisterCustomPostType();
  const unregister = useUnregisterCustomPostType();

  // const copyPostType = (name) => {
  //   const i = postTypes.findIndex((p) => p.name === name);
  //   const postType = postTypes[i];
  //   const copy = { ...postType };
  //
  //   let isUnique = false;
  //   if (!isUnique) {
  //     copy.name += "-copy";
  //     isUnique = postTypes.find((p) => p.name === copy.name) === undefined;
  //   }
  //
  //   register(copy);
  // };

  const style = useRef(document.createElement("style"));
  useEffect(() => {
    style.current.appendChild(document.createTextNode(CSS));
    document.head.appendChild(style.current);

    return () => {
      document.head.removeChild(style.current);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <TabPanel tabs={tabs} className="cpts-tabs-panel">
        {(tab) => {
          const postType = customPostTypes[tab.index];

          if (!postType) {
            return <NewCustomPostType add={(config) => register(config)} />;
          }

          return (
            <CustomPostType
              name={postType}
              remove={() => unregister(postType)}
              update={(config) => register(config)}
            />
          );
        }}
      </TabPanel>
    </div>
  );
}
