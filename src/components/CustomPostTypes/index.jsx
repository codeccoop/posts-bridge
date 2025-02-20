// source
import {
  useCustomPostTypes,
  useRegisterCustomPostType,
  useUnregisterCustomPostType,
} from "../../providers/CustomPostTypes";
import CopyIcon from "../CopyIcon";
import CustomPostType from "./CustomPostType";

const { TabPanel } = wp.components;
const { useState, useEffect, useRef } = wp.element;
const { __ } = wp.i18n;

function TabTitle({ name, focus, setFocus, copy }) {
  return (
    <div
      style={{ position: "relative", padding: "0px 24px 0px 10px" }}
      onMouseEnter={() => setFocus(true)}
      onMouseleave={() => setFocus(false)}
    >
      <span>{name}</span>
      {focus && <CopyIcon onClick={copy} />}
    </div>
  );
}

export default function CustomPostTypes() {
  const postTypes = useCustomPostTypes();

  const [currentTab, setCurrentTab] = useState(
    String(postTypes.length ? 0 : -1)
  );
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = postTypes
    .map((postType, i) => ({
      name: String(i),
      title: postType,
      icon: (
        <TabTitle
          name={postType}
          focus={tabFocus === postType}
          setFocus={(value) => setTabFocus(value ? postType : null)}
          copy={() => copyPostType(postType)}
        />
      ),
    }))
    .concat([
      {
        name: "-1",
        title: __("Add a custom post type", "posts-bridge"),
      },
    ]);

  const postTypesCount = useRef(postTypes.length);
  useEffect(() => {
    if (postTypes.length > postTypesCount.current) {
      setCurrentTab(String(postTypes.length - 1));
    } else if (postTypes.length < postTypesCount.current) {
      setCurrentTab(String(currentTab - 1));
    }

    return () => {
      postTypesCount.current = postTypes.length;
    };
  }, [postTypes]);

  const register = useRegisterCustomPostType();
  const unregister = useUnregisterCustomPostType();

  const copyPostType = (name) => {
    const i = postTypes.findIndex((p) => p.name === name);
    const postType = postTypes[i];
    const copy = { ...postType };

    let isUnique = false;
    if (!isUnique) {
      copy.name += "-copy";
      isUnique = postTypes.find((p) => p.name === copy.name) === undefined;
    }

    register(copy);
  };

  return (
    <div style={{ width: "100%" }}>
      <TabPanel
        tabs={tabs}
        onSelect={setCurrentTab}
        initialTabName={currentTab}
      >
        {(postType) => {
          const name = postType.name >= 0 ? postType.title : "add";

          return (
            <CustomPostType
              name={name}
              remove={() => unregister(name)}
              update={(newPostType) => register(newPostType)}
            />
          );
        }}
      </TabPanel>
    </div>
  );
}
