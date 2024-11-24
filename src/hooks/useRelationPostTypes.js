// vendor
import { useMemo } from "@wordpress/element";

// source
import { useRestApi, useRpcApi } from "../providers/Settings";

export default function useRelationPostTypes() {
  const [{ relations: rest }] = useRestApi();
  const [{ relations: rpc }] = useRpcApi();

  return useMemo(() => {
    return new Set(rest.concat(rpc).map(({ post_type }) => post_type));
  }, [rest, rpc]);
}
