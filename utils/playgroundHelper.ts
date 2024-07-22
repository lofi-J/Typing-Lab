import {isKR, splitKR} from "@/utils/splitKR";


export type TLineRange = { start: number, end: number };
const LINE_LIMIT = 3;

// 타이핑 타겟 리스트를 이용해 초기 lineRange를 리턴
export const initLineRange = (target: string[]): TLineRange => {
  const length = target.length;
  
  switch (length) {
    case 0:
      return {start: 0, end: 0};
    case 1:
      return {start: 0, end: 0};
    case 2:
      return {start: 0, end: 1};
    default:
      return {start: 0, end: LINE_LIMIT-1};
  }
}

const DOUBLE_MIDDLE = {
  'ㅘ': ['ㅗ', 'ㅏ'],
  'ㅙ': ['ㅗ', 'ㅐ'],
  'ㅚ': ['ㅗ', 'ㅣ'],
  'ㅝ': ['ㅜ', 'ㅓ'],
  'ㅞ': ['ㅜ', 'ㅔ'],
  'ㅟ': ['ㅜ', 'ㅣ'],
  'ㅢ': ['ㅡ', 'ㅣ']
}
const DOUBLE_FINAL = {
  'ㄳ': ['ㄱ', 'ㅅ'], 'ㄵ': ['ㄴ', 'ㅈ'], 'ㄶ': ['ㄴ', 'ㅎ'],
  'ㄺ': ['ㄹ', 'ㄱ'], 'ㄻ': ['ㄹ', 'ㅁ'], 'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'], 'ㄾ': ['ㄹ', 'ㅌ'], 'ㄿ': ['ㄹ', 'ㅍ'],
  'ㅀ': ['ㄹ', 'ㅎ'], 'ㅄ': ['ㅂ', 'ㅅ']
}

/*
* 유저가 타이핑한 문자가 타이핑 타겟과 일치하는지 검사하는 함수
* @param {string} correctChar - 현재 타이핑해야할 텍스트 라인
* @param {string} inputChar - 유저가 타이핑한 라인
* */
export const validateTypingLine = (baseLine: string, inputLine: string) => {
  const index = inputLine.length-1;
  const nextIndex = (index + 1) >= baseLine.length ? undefined : index + 1;
  
  const base = baseLine[index];
  const input = inputLine[index];
  const nextBase = nextIndex ? baseLine[nextIndex] : undefined;
  

  // 비교 대상에 한국어가 포함되어있지 않다면 단순 비교를 진행
  if (!isKR(base) || !isKR(input)) {
    return base === input;
  }
  
  const splitedBase = splitKR(base);
  const splitedInput = splitKR(input);
  const nextSplitedBase = nextBase && splitKR(nextBase);
  
  // 초성 비교
  if (splitedInput.cho && (splitedInput.cho !== splitedBase.cho)) {
    return false;
  }
  // 중성 비교 및 예외 처리
  if (splitedInput.jung && (splitedInput.jung !== splitedBase.jung)) {
    if (DOUBLE_MIDDLE[splitedBase.jung as keyof typeof DOUBLE_MIDDLE]) {
      return splitedInput.jung === DOUBLE_MIDDLE[splitedBase.jung as keyof typeof DOUBLE_MIDDLE][0];
    } else {
      return false;
    }
  }
  // 종성 비교 및 예외 처리
  if (splitedInput.jong && (splitedInput.jong !== splitedBase.jong)) {
    if (!DOUBLE_FINAL[splitedInput.jong as keyof typeof DOUBLE_FINAL] && DOUBLE_FINAL[splitedBase.jong as keyof typeof DOUBLE_FINAL]) {
      if (splitedInput.jong !== DOUBLE_FINAL[splitedBase.jong as keyof typeof DOUBLE_FINAL][0]) {
        return false;
      }
    }
    if (!DOUBLE_FINAL[splitedInput.jong as keyof typeof DOUBLE_FINAL] && !DOUBLE_FINAL[splitedBase.jong as keyof typeof DOUBLE_FINAL]) {
      if (nextIndex && nextSplitedBase && (splitedInput.jong !== nextSplitedBase.cho)) {
        return false;
      } else if (!nextIndex) {
        return false;
      }
    }
    if (DOUBLE_FINAL[splitedInput.jong as keyof typeof DOUBLE_FINAL] && nextIndex) {
      if (nextSplitedBase && (DOUBLE_FINAL[splitedInput.jong as keyof typeof DOUBLE_FINAL][1] !== nextSplitedBase.cho)) {
        return false;
      }
    }
  }

  return true;
}

export const indexToKey = (str: string, index: number) => `${str}-${index}`;