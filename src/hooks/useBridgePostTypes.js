// source
import { useBridges } from "../providers/Settings";

const { useMemo } = wp.element;

export default function useBridgePostTypes() {
  const bridges = useBridges();

  return useMemo(() => {
    return new Set(bridges.map(({ post_type }) => post_type));
  }, [bridges]);
}
