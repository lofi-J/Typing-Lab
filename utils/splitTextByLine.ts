const CHAR_WIDTH = 2.2;
const BLANK_WIDTH = 1;
const EN_CHAR_WIDTH = 1.1;
const EN_BLANK_WIDTH = 0.8;
/*
* string으로 구성된 글을 string[]로 나누어준다.
* @param {string} text - 타이핑 타겟
* */
export const splitTextByLine = (phrase: string, playgroundWidth: number, langType: 'en' | 'ko'): string[] => {
  let result: string[] = [];
  let currentWord = '';
  let currentWidth = 0;
  
  const saveAndInit = () => {
    result.push(currentWord); // Line push
    currentWord = '';
    currentWidth = 0;
  }
  
  for (let i = 0; i < phrase.length; i++) {
    const char = phrase[i];
    currentWord += char;
    
    // acc width
    if (char === ' ') currentWidth += langType === 'ko' ? BLANK_WIDTH : EN_BLANK_WIDTH;
    else currentWidth += langType === 'ko' ? CHAR_WIDTH : EN_CHAR_WIDTH;
    
    // check width at face to blank
    if (char === ' ' && currentWidth >= playgroundWidth) {
      saveAndInit();
    }
  }
  saveAndInit();
  
  // remove last blank
  result = [...result].map(str => str[str.length-1] === ' ' ? str.slice(0, str.length-1) : str);
 
  return result;
}