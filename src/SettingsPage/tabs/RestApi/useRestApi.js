import { useApis } from "../../../providers/Settings";

export default function useRestApi() {
  const [{ "rest-api": api = { relations: [] } }, patch] = useApis();
  const setApi = (value) => patch({ "rest-api": value });
  return [api, setApi];
}
