// vendor
import React from "react";
import {
  TabPanel,
  __experimentalHeading as Heading,
  Button,
  __experimentalSpacer as Spacer,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

// source
import SettingsProvider, { useSubmitSettings } from "../providers/Settings";
import PostTypesProvider from "../providers/PostTypes";
import GeneralSettings from "../GeneralSettings";
import RestApiSettings from "../RestApiSettings";
import RpcApiSettings from "../RpcApiSettings";
import Spinner from "../Spinner";

const tabs = [
  {
    name: "general",
    title: "General",
  },
  {
    name: "rest-api",
    title: "REST API",
  },
  {
    name: "rpc-api",
    title: "Odoo JSON-RPC",
  },
];

function Content({ tab }) {
  switch (tab.name) {
    case "rest-api":
      return <RestApiSettings />;
    case "rpc-api":
      return <RpcApiSettings />;
    default:
      return <GeneralSettings />;
  }
}

function SaveButton({ loading, setLoading }) {
  const __ = wp.i18n.__;
  const submit = useSubmitSettings();

  const [error, setError] = useState(false);

  const onClick = () => {
    setLoading(true);
    submit()
      .then(() => setLoading(false))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  return (
    <Button
      variant={error ? "secondary" : "primary"}
      onClick={onClick}
      style={{ minWidth: "130px", justifyContent: "center" }}
      disabled={loading}
      __next40pxDefaultSize
    >
      {(error && __("Error", "posts-bridge")) || __("Save", "posts-bridge")}
    </Button>
  );
}

export default function SettingsPage() {
  const __ = wp.i18n.__;

  const [loaders, setLoaders] = useState([]);

  const loading = loaders.length > 0;
  const setLoading = (state) => {
    const newLoaders = loaders
      .slice(1)
      .concat(state)
      .filter((state) => state);
    setLoaders(newLoaders);
  };

  return (
    <SettingsProvider setLoading={setLoading}>
      <Heading level={1}>Posts Bridge</Heading>
      <TabPanel
        initialTabName="general"
        tabs={tabs.map(({ name, title }) => ({
          name,
          title: __(title, "posts-bridge"),
        }))}
      >
        {(tab) => (
          <PostTypesProvider setLoading={setLoading}>
            <Spacer />
            <Content tab={tab} />
          </PostTypesProvider>
        )}
      </TabPanel>
      <Spacer />
      <SaveButton loading={loading} setLoading={setLoading} />
      <Spinner show={loading} />
    </SettingsProvider>
  );
}
