const apiFetch = wp.apiFetch;
const { createContext, useContext, useEffect } = wp.element;

const StoreContext = createContext(() => {});

export default function StoreProvider({ children, setLoading }) {
  const fetchSettings = () => {
    setLoading(true);
    return apiFetch({
      path: "posts-bridge/v1/settings",
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
      path: "posts-bridge/v1/types",
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
