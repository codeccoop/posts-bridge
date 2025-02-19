import { useApis } from "../../../../src/providers/Settings";

export default function useWPApi() {
  const [{ "wp-rest": api = { bridges: [], credentials: {} } }, patch] =
    useApis();

  const setApi = (api) => patch({ "wp-rest": api });
  return [api, setApi];
}
