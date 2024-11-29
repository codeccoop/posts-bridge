// vendor
import React from "react";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "@wordpress/element";

const defaultSettings = {
  "general": {
    backends: [],
    whitelist: false,
    synchronize: {
      enabled: false,
      recurrence: "hourly",
    },
  },
  "rest-api": {
    relations: [],
  },
  "rpc-api": {
    endpoint: "/jsonrpc",
    database: "crm.lead",
    user: "admin",
    password: "admin",
    relations: [],
  },
};

const SettingsContext = createContext([defaultSettings, () => {}]);

export default function SettingsProvider({ setLoading, children }) {
  const [general, setGeneral] = useState({ ...defaultSettings.general });
  const [restApi, setRestApi] = useState({ ...defaultSettings["rest-api"] });
  const [rpcApi, setRpcApi] = useState({ ...defaultSettings["rpc-api"] });

  const fetchSettings = () => {
    setLoading(true);
    return apiFetch({
      path: `${window.wpApiSettings.root}wp-bridges/v1/posts-bridge/settings`,
      headers: {
        "X-WP-Nonce": wpApiSettings.nonce,
      },
    })
      .then((settings) => {
        setGeneral(settings.general);
        setRestApi(settings["rest-api"]);
        setRpcApi(settings["rpc-api"]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchSettings, []);

  const saveSettings = () => {
    setLoading(true);
    return apiFetch({
      path: `${window.wpApiSettings.root}wp-bridges/v1/posts-bridge/settings`,
      method: "POST",
      headers: {
        "X-WP-Nonce": wpApiSettings.nonce,
      },
      data: {
        general,
        "rest-api": restApi,
        "rpc-api": rpcApi,
      },
    })
      .then(fetchSettings)
      .finally(() => setLoading(false));
  };

  return (
    <SettingsContext.Provider
      value={[
        {
          general,
          setGeneral,
          restApi,
          setRestApi,
          rpcApi,
          setRpcApi,
        },
        saveSettings,
      ]}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useGeneral() {
  const [{ general, setGeneral }] = useContext(SettingsContext);

  const { whitelist, synchronize, backends } = general;

  const update = ({ whitelist, backends, synchronize }) =>
    setGeneral({
      whitelist,
      synchronize,
      backends,
    });

  return [{ whitelist, synchronize, backends }, update];
}

export function useRestApi() {
  const [{ restApi, setRestApi }] = useContext(SettingsContext);
  return [restApi, setRestApi];
}

export function useRpcApi() {
  const [{ rpcApi, setRpcApi }] = useContext(SettingsContext);
  return [rpcApi, setRpcApi];
}

export function useSubmitSettings() {
  const [, submit] = useContext(SettingsContext);
  return submit;
}
