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
  const kr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
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

// 테스트
// console.table(splitKR('가')); // { cho: 'ㄱ', jung: 'ㅏ', jong: '' }
// console.table(splitKR('각')); // { cho: 'ㄱ', jung: 'ㅏ', jong: 'ㄱ' }
// console.table(splitKR('한')); // { cho: 'ㅎ', jung: 'ㅏ', jong: 'ㄴ' }
// console.table(splitKR('ㄱ')); // { cho: 'ㄱ', jung: '', jong: '' }
// console.table(splitKR('힣')); // { cho: 'ㅎ', jung: 'ㅣ', jong: 'ㅎ' }
// console.table(splitKR('ㅏ')); // { cho: '', jung: 'ㅏ', jong: '' }
// console.table(splitKR('a'));  // { cho: '', jung: '', jong: '' }
