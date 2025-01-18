// vendor
import React from "react";
import apiFetch from "@wordpress/api-fetch";
import { createContext, useContext, useEffect } from "@wordpress/element";

const StoreContext = createContext(() => {});

export default function StoreProvider({ children, setLoading }) {
  const fetchSettings = () => {
    setLoading(true);
    return apiFetch({
      path: `${window.wpApiSettings.root}posts-bridge/v1/settings`,
      headers: {
        "X-WP-Nonce": wpApiSettings.nonce,
      },
    })
      .then((settings) => {
        wppb.emit("fetch", settings);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPostTypes = () => {
    setLoading(true);
    return apiFetch({
      path: `${window.wpApiSettings.root}posts-bridge/v1/types`,
      headers: {
        "X-WP-Nonce": wpApiSettings.nonce,
      },
    })
      .then((postTypes) => {
        wppb.emit("postTypes", postTypes);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPostTypes().then(fetchSettings);
  }, []);

  const submit = () => {
    setLoading(true);

    const settings = wppb.bus("submit", {});
    return apiFetch({
      path: `${window.wpApiSettings.root}posts-bridge/v1/settings`,
      method: "POST",
      headers: {
        "X-WP-Nonce": wpApiSettings.nonce,
      },
      data: settings,
    }).then(fetchSettings);
  };

  return (
    <StoreContext.Provider value={submit}>{children}</StoreContext.Provider>
  );
}

export function useStoreSubmit() {
  return useContext(StoreContext);
}
