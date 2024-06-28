interface Array<T> {
  /**
   * endIndex를 포함한 배열의 특정 구간을 복사합니다.
   * @param startIndex 복사를 시작할 인덱스 (기본값: 0)
   * @param endIndex 복사를 끝낼 인덱스 (기본값: 배열의 길이)
   * @returns 복사된 새 배열
   */
  copy(startIndex?: number, endIndex?: number): T[];
}