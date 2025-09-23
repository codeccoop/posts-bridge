// source
import { useBridges } from "./useAddon";

const { useMemo } = wp.element;

export default function useBridgeNames() {
  const [bridges] = useBridges();

  return useMemo(() => {
    return new Set(bridges.map(({ post_type }) => post_type));
  }, [bridges]);
}
