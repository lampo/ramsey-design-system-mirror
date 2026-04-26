import { useMemo } from "react";
import { generateUniqueId } from "@ramsey-design-system/common";

/**
 * React hook that generates a stable unique ID
 * @param prefix - Optional prefix to add after 'rds-'
 * @returns A memoized unique ID that remains stable across renders
 * @example
 * const id = useUniqueId(); // 'rds-a1b2c3d4-...'
 * const id = useUniqueId('dialog-title'); // 'rds-dialog-title-a1b2c3d4-...'
 */
export function useUniqueId(prefix?: string): string {
  return useMemo(() => generateUniqueId(prefix), [prefix]);
}
