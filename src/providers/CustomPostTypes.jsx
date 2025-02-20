const apiFetch = wp.apiFetch;
const { createContext, useContext, useEffect, useState } = wp.element;
const { __ } = wp.i18n;

const CustomPostTypesContext = createContext({
  postTypes: [],
  postType: null,
  setPostType: () => {},
  data: null,
  submit: () => {},
});

export default function CustomPostTypesProvider({ children }) {
  const [postTypes, setPostTypes] = useState([]);
  const [postType, setPostType] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPostTypes();
  }, []);

  useEffect(() => {
    if (!postType) {
      setData(null);
    } else {
      fetchData(postType);
    }
  }, [postType]);

  const fetchPostTypes = () => {
    wppb.emit("loading", true);

    apiFetch({
      path: "posts-bridge/v1/post_types",
    })
      .then(setPostTypes)
      .catch(() =>
        wppb.emit("error", __("Loading post types error", "posts-bridge"))
      )
      .finally(() => wppb.emit("loading", false));
  };

  const fetchData = (postType) => {
    return apiFetch({
      path: "posts-bridge/v1/post_types/" + postType,
    })
      .then(setData)
      .catch(() =>
        wppb.emit("error", __("Loading post type error", "posts-bridge"))
      );
  };

  const register = (data) => {
    wppb.emit("loading", true);

    return apiFetch({
      path: "posts-bridge/v1/post_types/" + data.name,
      method: "POST",
      data,
    })
      .then((data) => {
        setData(data);
        fetchPostTypes();
        wppb.emit("flushStore");
        return true;
      })
      .catch(() =>
        wppb.emit("error", __("Post type submit error", "posts-bridge"))
      )
      .finally(() => wppb.emit("loading", false));
  };

  const unregister = (postType) => {
    wppb.emit("loading", true);

    return apiFetch({
      path: "posts-bridge/v1/post_types/" + postType,
      method: "DELETE",
    })
      .then(() => {
        setData(null);
        fetchPostTypes();
        wppb.emit("flushStore");
        return true;
      })
      .catch(() =>
        wppb.emit("error", __("Post type unregistration error", "posts-bridge"))
      )
      .finally(() => wppb.emit("loading", false));
  };

  return (
    <CustomPostTypesContext.Provider
      value={{
        postType,
        setPostType,
        postTypes,
        data,
        register,
        unregister,
      }}
    >
      {children}
    </CustomPostTypesContext.Provider>
  );
}

export function useCustomPostType() {
  const { postType, setPostType } = useContext(CustomPostTypesContext);
  return [postType, setPostType];
}

export function useCustomPostTypes() {
  const { postTypes } = useContext(CustomPostTypesContext);
  return postTypes || [];
}

export function useCustomPostTypeData(name) {
  const { postType, setPostType, data } = useContext(CustomPostTypesContext);
  if (postType !== name) {
    setPostType(name);
  }

  return data;
}

export function useRegisterCustomPostType() {
  const { register } = useContext(CustomPostTypesContext);
  return (data) => register(data);
}

export function useUnregisterCustomPostType() {
  const { unregister } = useContext(CustomPostTypesContext);
  return (name) => unregister(name);
}
