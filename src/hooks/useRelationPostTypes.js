// source
import { useRelations } from "../providers/Settings";

const { useMemo } = wp.element;

export default function useRelationPostTypes() {
  const relations = useRelations();

  return useMemo(() => {
    return new Set(relations.map(({ post_type }) => post_type));
  }, [relations]);
}
