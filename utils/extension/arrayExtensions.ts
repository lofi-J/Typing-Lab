// @ts-ignore
Array.prototype.copy = function(startIndex = 0, endIndex = this.length - 1) {
  if (startIndex < 0 || endIndex > this.length - 1 || startIndex > endIndex) {
    throw new RangeError("startIndex 또는 endIndex가 올바르지 않습니다");
  }
  return this.slice(startIndex, endIndex + 1);
}
