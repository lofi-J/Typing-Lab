export const getCSSVariable = (varName: string) => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
  } else {
    return '';
  }
}