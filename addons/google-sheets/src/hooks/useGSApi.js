import { useApis } from "../../../../src/providers/Settings";

export default function useWPApi() {
  const [{ "google-sheets": api = { bridges: [], authorized: false } }, patch] =
    useApis();

  const setApi = (field) => patch({ "google-sheets": { ...api, ...field } });

  return [api, setApi];
}
