export type TLineRange = { start: number, end: number };
const LINE_LIMIT = 3;

// 타이핑 타겟 리스트를 이용해 초기 lineRange를 리턴
export const initLineRange = (target: string[]): TLineRange => {
  return {
    start: 0,
    end: target.length > LINE_LIMIT ? LINE_LIMIT-1 : target.length-1
  }
}

// 다음 라인이 있는지 검사 후 타이핑 라인을 변경
export const nextLineRange = (target: string[], lineRange: TLineRange) => {
  const maxIndex = target.length -1;
  const endIndex = lineRange.end;
  
  if (maxIndex >= endIndex+1) {
    return {
      start: lineRange.start + 1,
      end: lineRange.end + 1
    }
  }
  
  // typing done
  return { ...lineRange };
}

export const checkTypingCompletion = () => {

}

export const indexToKey = (str: string, index: number) => `${str}-${index}`;