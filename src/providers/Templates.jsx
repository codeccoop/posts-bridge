// source
import { useApis } from "./Settings";

const apiFetch = wp.apiFetch;
const { createContext, useContext, useEffect, useState, useMemo, useRef } =
  wp.element;
const { __ } = wp.i18n;

const TemplatesContext = createContext({
  templates: [],
  template: null,
  setTemplate: () => {},
  config: {},
  submit: () => {},
});

export default function TemplatesProvider({ children }) {
  const [apis] = useApis();

  const [api, setApi] = useState(null);
  const [template, setTemplate] = useState(null);
  const [config, setConfig] = useState(null);

  const templates = useMemo(() => {
    if (!api) return [];
    return apis[api]?.templates || [];
  }, [api, apis]);

  const onApi = useRef((api) => setApi(api)).current;

  useEffect(() => {
    wppb.on("api", onApi);

    return () => {
      wppb.off("api", onApi);
    };
  }, []);

  useEffect(() => {
    if (!template) {
      setConfig(null);
    } else {
      fetchConfig(template);
    }
  }, [template]);

  const fetchConfig = (template) => {
    wppb.emit("loading", true);

    return apiFetch({
      path: "posts-bridge/v1/templates/" + template,
    })
      .then(setConfig)
      .catch(() =>
        wppb.emit("error", __("Loading config error", "posts-bridge"))
      )
      .finally(() => wppb.emit("loading", false));
  };

  const submit = ({ fields, integration }) => {
    if (!template) {
      return;
    }

    wppb.emit("loading", true);

    return apiFetch({
      path: "posts-bridge/v1/templates/" + template,
      method: "POST",
      data: {
        template,
        integration,
        fields,
      },
    })
      .then(() => wppb.emit("flushStore"))
      .catch(() => {
        wppb.emit("error", __("Template submit error", "posts-bridge"));
      })
      .finally(() => wppb.emit("loading", false));
  };

  return (
    <TemplatesContext.Provider
      value={{
        template,
        setTemplate,
        templates,
        config,
        submit,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplate() {
  const { template, setTemplate } = useContext(TemplatesContext);
  return [template, setTemplate];
}

export function useTemplates() {
  const { templates } = useContext(TemplatesContext);
  return templates || [];
}

export function useConfig() {
  const { config } = useContext(TemplatesContext);
  return config;
}

export function useSubmitTemplate() {
  const { submit } = useContext(TemplatesContext);
  return (data) => submit(data);
}
