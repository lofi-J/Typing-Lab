export const getCSSVariable = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName);
}