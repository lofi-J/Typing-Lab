const CHO = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
  'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
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
  'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

const HANGUL_START_CODE = '가'.charCodeAt(0);

const CHO_PERIOD = 21 * 28; // 588 ( 28 * 21 )
const JUNG_PERIOD = 28; // 28

export function isKR(char: string) {
  const kr = /^[ㄱ-ㅎㅏ-ㅣ가-힣]$/;
  return kr.test(char);
}

export function splitKR(char: string) {
  const code = char.charCodeAt(0);

  if (!isKR(char)) return { cho: '', jung: '', jong: '' };
  
  if (char >= 'ㄱ' && char <= 'ㅎ') {
    return { cho: char, jung: '', jong: '' };
  }

  if (char >= 'ㅏ' && char <= 'ㅣ') {
    return { cho: '', jung: char, jong: '' };
  }
  
  const charCode = code - HANGUL_START_CODE;

  const choIndex = Math.floor(charCode / CHO_PERIOD);
  const jungIndex = Math.floor((charCode % CHO_PERIOD) / JUNG_PERIOD);
  const jongIndex = charCode % JUNG_PERIOD;

  return {
    cho: CHO[choIndex],
    jung: JUNG[jungIndex],
    jong: JONG[jongIndex]
  };
}