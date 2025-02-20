const apiFetch = wp.apiFetch;
const { createContext, useContext, useEffect, useRef } = wp.element;
const { __ } = wp.i18n;

const StoreContext = createContext(() => {});

export default function StoreProvider({ children }) {
  const fetchSettings = () => {
    wppb.emit("loading", true);

    return apiFetch({
      path: "posts-bridge/v1/settings",
    })
      .then((settings) => wppb.emit("fetch", settings))
      .finally(() => wppb.emit("loading", false));
  };

  const onFlush = useRef(() => fetchSettings()).current;

  useEffect(() => {
    fetchSettings();
    wppb.on("flushStore", onFlush);

    return () => {
      wppb.off("flushStore", onFlush);
    };
  }, []);

  const submit = () => {
    wppb.emit("loading", true);

    const settings = wppb.bus("submit", {});
    return apiFetch({
      path: "posts-bridge/v1/settings",
      method: "POST",
      data: settings,
    })
      .then(fetchSettings)
      .catch(() =>
        wppb.emit("error", __("Save settings error", "posts-bridge"))
      )
      .finally(() => wppb.emit("loading", false));
  };

  return (
    <StoreContext.Provider value={submit}>{children}</StoreContext.Provider>
  );
}

export function useStoreSubmit() {
  return useContext(StoreContext);
}
