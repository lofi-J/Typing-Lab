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

/*
* 유저가 타이핑한 문자가 타이핑 타겟과 일치하는지 검사하는 함수
* @param {string} correctChar - 현재 타이핑해야할 텍스트 라인
* @param {string} inputChar - 유저가 타이핑한 라인
* */
export const validateTypingLine = (correctLine: string, inputLine: string) => {
  const index = inputLine.length-1;
  if (index < 0) return; // inputChar의 길이가 0인경우 early return
  
  const base = correctLine[index];
  const input = inputLine[index];

  if (!isKR(base)) {
    return base === input;
  }
  
  // 한글의 경우
  const splitedBase = splitKR(base);
  const splitedInput = splitKR(input);
  
  // 한글을 입력해야하지만 한글을 입력하지 않은 경우
  if (splitedInput.cho && (splitedInput.cho !== splitedBase.cho)) {
    return false;
  }
  if (splitedInput.jung && (splitedInput.jung !== splitedBase.jung)) {
    return false;
  }
  if (splitedInput.jong && (splitedInput.jong !== splitedBase.jong)) {
    return false;
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