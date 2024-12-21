import { useApis } from "../../../../src/providers/Settings";

export default function useWPApi() {
  const [
    { "google-sheets-api": api = { relations: [], authorized: false } },
    patch,
  ] = useApis();

  const setApi = (field) =>
    patch({ "google-sheets-api": { ...api, ...field } });

  return [api, setApi];
}
