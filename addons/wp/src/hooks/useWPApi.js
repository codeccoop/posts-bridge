import { useApis } from "../../../../src/providers/Settings";

export default function useWPApi() {
  const [{ "wp-api": api = { relations: [], credentials: {} } }, patch] =
    useApis();
  const setApi = (api) => patch({ "wp-api": api });
  return [api, setApi];
}
