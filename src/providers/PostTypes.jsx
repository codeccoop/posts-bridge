// vendor
import React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "@wordpress/element";

// source
import useRelationPostTypes from "../hooks/useRelationPostTypes";

const PostTypesContext = createContext([]);

export default function PostTypesProvider({ children }) {
  const [postTypes, setPostTypes] = useState([]);

  useEffect(() => {
    wppb.on("postTypes", setPostTypes);
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
