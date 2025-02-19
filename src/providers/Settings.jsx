import useDiff from "../hooks/useDiff";

const { createContext, useContext, useState, useEffect, useRef } = wp.element;
const { __ } = wp.i18n;

const defaults = {
  general: {
    backends: [],
    whitelist: false,
    synchronize: {
      enabled: false,
      recurrence: "hourly",
    },
    addons: {},
    post_types: [],
  },
  apis: {},
};

const SettingsContext = createContext([defaults, () => {}]);

export default function SettingsProvider({ children, handle = ["general"] }) {
  const initialState = useRef(null);
  const currentState = useRef(defaults);
  const [state, setState] = useState(defaults);
  const [reload, setReload] = useState(false);
  // const [flush, setFlush] = useState(false);
  currentState.current = state;

  const onPatch = useRef((state) => setState(state)).current;

  const onFetch = useRef((settings) => {
    const newState = {
      general: { ...defaults.general, ...settings.general },
      apis: Object.fromEntries(
        Object.entries(settings)
          .filter(([key]) => key !== "general")
          .map(([key, data]) => [
            key,
            { ...(defaults.apis[key] || {}), ...data },
          ])
      ),
    };

    setState(newState);
    const previousState = initialState.current;
    initialState.current = { ...newState };
    if (previousState === null) return;

    const reload = Object.keys(newState.general.addons).reduce(
      (changed, addon) => {
        return (
          changed ||
          newState.general.addons[addon] !== previousState.general.addons[addon]
        );
      },
      false
    );

    setReload(reload);

    // const flush =
    //   !reload &&
    //   Object.keys(newState.general.integrations).reduce(
    //     (changed, integration) =>
    //       changed ||
    //       newState.general.integrations[integration] !==
    //         previousState.general.integrations[integration],
    //     false
    //   );

    // setFlush(flush);
  }).current;

  const onSubmit = useRef((bus) => {
    const state = currentState.current;
    if (handle.indexOf("general") !== -1) {
      bus.data.general = state.general;
    }
    Object.entries(state.apis).forEach(([name, value]) => {
      if (handle.indexOf(name) !== -1) {
        bus.data[name] = value;
      }
    });
  }).current;

  const beforeUnload = useRef((ev) => {
    const state = currentState.current;
    if (useDiff(state, initialState.current) && !window.__wppbReloading) {
      ev.preventDefault();
      ev.returnValue = true;
    }
  }).current;

  useEffect(() => {
    wppb.on("patch", onPatch);
    wppb.on("fetch", onFetch);
    wppb.join("submit", onSubmit);
    window.addEventListener("beforeunload", beforeUnload);

    () => {
      wppb.off("patch", onPatch);
      wppb.off("fetch", onFetch);
      wppb.leave("submit", onSubmit);
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  useEffect(() => {
    if (reload) {
      window.__wppbReloading = true;
      window.location.reload();
    }
  }, [reload]);

  // useEffect(() => {
  //   if (flush && !window.__wpfbFlushing) {
  //     window.__wpfbFlushing = true;
  //     wpfb.emit("flushStore");
  //     setFlush(false);
  //   }

  //   return () => {
  //     if (flush) {
  //       window.__wpfbFlushing = false;
  //     }
  //   };
  // }, [flush]);

  const patchState = (partial) => wppb.emit("patch", { ...state, ...partial });

  return (
    <SettingsContext.Provider value={[state, patchState]}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useGeneral() {
  const [{ general }, patch] = useContext(SettingsContext);
  return [general, (general) => patch({ general })];
}

export function useApis() {
  const [{ apis }, patch] = useContext(SettingsContext);
  return [apis, (api) => patch({ apis: { ...apis, ...api } })];
}

export function useBridges() {
  const [apis] = useApis();

  return Object.keys(apis).reduce((bridges, api) => {
    return bridges.concat(apis[api].bridges);
  }, []);
}

export function usePostTypes({ filter = false }) {
  const [{ general }] = useContext(SettingsContext);
  const bridges = useBridges();

  let postTypes = general.post_types || [];

  if (filter) {
    const bridgedPostTypes = new Set(bridges.map(({ post_type }) => post_type));
    postTypes = postTypes.filter((postType) => !bridgedPostTypes.has(postType));
  }

  return postTypes;
}
