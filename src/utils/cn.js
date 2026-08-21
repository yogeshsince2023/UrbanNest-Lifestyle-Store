/**
 * Lightweight class name merger (zero external dependencies)
 * Filters falsy values and joins class strings cleanly.
 *
 * @param  {...(string|boolean|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
    .trim();
}

export default cn;
