/**
 * Generates a unique ID with the 'rds-' base prefix and optional additional prefix
 * @param prefix - Optional prefix to add after 'rds-' (e.g., 'checkbox' becomes 'rds-checkbox-{uuid}')
 * @returns A unique ID string in the format `rds-{prefix}-{uuid}` or `rds-{uuid}` if no prefix
 * @example
 * generateUniqueId() // 'rds-a1b2c3d4-...'
 * generateUniqueId('checkbox') // 'rds-checkbox-a1b2c3d4-...'
 * generateUniqueId('textarea-counterID') // 'rds-textarea-counterID-a1b2c3d4-...'
 */
export function generateUniqueId(prefix?: string): string {
  const fullPrefix = prefix ? `rds-${prefix}` : "rds";
  return `${fullPrefix}-${crypto.randomUUID()}`;
}

export default generateUniqueId;
