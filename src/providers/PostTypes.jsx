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

// source
import useRelationPostTypes from "../hooks/useRelationPostTypes";

const PostTypesContext = createContext([]);

export default function PostTypesProvider({ setLoading, children }) {
  const [postTypes, setPostTypes] = useState([]);

  useEffect(() => {
    setLoading(true);
    apiFetch({
      path: `${window.wpApiSettings.root}wp-bridges/v1/posts-bridge/types`,
      headers: {
        "X-WP-Nonce": wpApiSettings.nonce,
      },
    })
      .then((postTypes) => setPostTypes(postTypes))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PostTypesContext.Provider value={postTypes}>
      {children}
    </PostTypesContext.Provider>
  );
}

export function usePostTypes({ filter } = { filter: false }) {
  const postTypes = useContext(PostTypesContext);
  if (filter) {
    const relationPostTypes = useRelationPostTypes();
    return postTypes.filter((pt) => !relationPostTypes.has(pt));
  }

  return postTypes;
}
