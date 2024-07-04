import { TLang } from "@/static/texts/default_article";
import {isKR, isEN, splitKR} from "@/utils/splitKR";


export type TLineRange = { start: number, end: number };
const LINE_LIMIT = 3;

// 타이핑 타겟 리스트를 이용해 초기 lineRange를 리턴
export const initLineRange = (target: string[]): TLineRange => {
  return {
    start: 0,
    end: target.length > LINE_LIMIT ? LINE_LIMIT-1 : target.length-1
  }
}


// 중성 예외 처리
const doubleMiddle = ['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ'];
const DOUBLE_MIDDLE = {
  'ㅘ': ['ㅗ', 'ㅏ'],
  'ㅙ': ['ㅗ', 'ㅐ'],
  'ㅚ': ['ㅗ', 'ㅣ'],
  'ㅝ': ['ㅜ', 'ㅓ'],
  'ㅞ': ['ㅜ', 'ㅔ'],
  'ㅟ': ['ㅜ', 'ㅣ'],
  'ㅢ': ['ㅡ', 'ㅣ']
}
const checkDoubleMiddle = (inputJung: string, baseJung: string) => {
  const compareTarget = DOUBLE_MIDDLE[baseJung];
  return inputJung === compareTarget[0];
}

// 종성 예외 처리
const doubleFinal = ['ㄳ', 'ㄵ', 'ㄶ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅄ'];
const DOUBLE_FINAL = {
  'ㄳ': ['ㄱ', 'ㅅ'], 'ㄵ': ['ㄴ', 'ㅈ'], 'ㄶ': ['ㄴ', 'ㅎ'],
  'ㄺ': ['ㄹ', 'ㄱ'], 'ㄻ': ['ㄹ', 'ㅁ'], 'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'], 'ㄾ': ['ㄹ', 'ㅌ'], 'ㄿ': ['ㄹ', 'ㅍ'],
  'ㅀ': ['ㄹ', 'ㅎ'], 'ㅄ': ['ㅂ', 'ㅅ']
}
// 겹받침 검사
const checkDoubleFinal = (inputJong: string, baseJong: string) => {
  const compareTarget = DOUBLE_FINAL[baseJong];
  return inputJong === compareTarget[0];
}

/*
* 유저가 타이핑한 문자가 타이핑 타겟과 일치하는지 검사하는 함수
* @param {string} correctChar - 현재 타이핑해야할 텍스트 라인
* @param {string} inputChar - 유저가 타이핑한 라인
* */
export const validateTypingLine = (correctLine: string, inputLine: string) => {
  const index = inputLine.length-1;
  const nextIndex = (index + 1) >= correctLine.length ? undefined : index + 1;
  
  if (index < 0) return; // inputChar의 길이가 0인경우 early return
  
  const base = correctLine[index];
  const input = inputLine[index];
  // next index
  const nextBase = correctLine[nextIndex];

  if (!isKR(base) || !isKR(input)) {
    return base === input;
  }
  
  // 한글의 경우
  const splitedBase = splitKR(base);
  const splitedInput = splitKR(input);
  // next index
  const nextSplitBase = nextBase && splitKR(nextBase);
  
  // 한글을 입력해야하지만 한글을 입력하지 않은 경우
  if (splitedInput.cho && (splitedInput.cho !== splitedBase.cho)) {
    return false;
  }
  if (splitedInput.jung && (splitedInput.jung !== splitedBase.jung)) {
    if (doubleMiddle.includes(splitedBase.jung)) {
      checkDoubleMiddle(splitedInput.jung, splitedBase.jung);
    } else {
      return false;
    }
  }
  if (splitedInput.jong && (splitedInput.jong !== splitedBase.jong)) {
    // 종성 비교 후 불 일치한 경우 겹받침 검사를 진행
    if (doubleFinal.includes(splitedBase.jong)) {
      checkDoubleFinal(splitedInput.jong, splitedBase.jong);
    } else if (nextIndex && doubleFinal.includes(splitedInput.jong)) {
      checkDoubleFinal(nextSplitBase.cho, splitedInput.jong);
    } else if (nextIndex && (nextSplitBase.cho !== splitedInput.jong)) { // 다음 index의 초성과 비교
      return false;
    }
  }
  // 그 외 true
  return true;
}

export const indexToKey = (str: string, index: number) => `${str}-${index}`;

/*
* 전달된 문자열의 감지된 언어를 반환하는 함수
* @param {string}  - 현재 타이핑해야할 텍스트
*
* - 전달된 문자열에서 감지된 첫 언어타입을 return한다.
* */
export const checkLanguage = (word: string): TLang | undefined => {
  let type = undefined;
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (/[a-zA-Z]/.test(char)) {
      return 'en';
    } else if (/[ㄱ-하-ㅣ-가-힣]/.test(char)) {
      return 'kr';
    }
  }
  return undefined;
}

export const isValidInputByLang = (char: string, lang: TLang): boolean => {
  if (lang === 'kr') {
    return isKR(char);
  } else if (lang === 'en') {
    return isEN(char);
  } else {
    throw new Error("Invalid language type");
  }
}