const CHO = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
  'ㄹ', 'ㅁ', 'ㅂ','ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
  'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];
const JUNG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ',
  'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ',
  'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
  'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
];
const JONG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
  'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
  'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
  'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ','ㅎ',
];

const HANGUL_START_CODE = '가'.charCodeAt(0);
const HANGUL_END_CODE = '힣'.charCodeAt(0);

const CHO_PERIOD = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0)); // 588 ( 28 * 21 )
const JUNG_PERIOD = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0)); // 28


export function isHangul(str: number) {
  return (HANGUL_START_CODE <= str) && (HANGUL_END_CODE >= str);
}

export function splitKR(char: string) {
  const code = char.charCodeAt(0);
  
  if (!isHangul(code)) return char;
  
  const charCode = code - HANGUL_START_CODE;
  
  const choIndex = Math.floor(charCode / CHO_PERIOD);
  const jungIndex = Math.floor((charCode % CHO_PERIOD) / JUNG_PERIOD);
  const jongIndex = charCode % JUNG_PERIOD;
  
  return {
    cho: CHO[choIndex],
    jung: JUNG[jungIndex],
    jong: JONG[jongIndex]
  }
}