import { useApis } from "../../../../src/providers/Settings";

export default function useWPApi() {
  const [{ "wp-api": api = { relations: [], credentials: {} } }, patch] =
    useApis();
  const setApi = (value) => patch({ "wp-api": value });
  return [api, setApi];
}
