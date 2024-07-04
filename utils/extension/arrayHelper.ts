export const makeArray = <T>(length, value: T): T[] => {
  return Array.from({ length }, () => value);
}