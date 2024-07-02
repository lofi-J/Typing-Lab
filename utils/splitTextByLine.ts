const CHAR_WIDTH = 22;
const BLANK_WIDTH = 10;
/*
* string으로 구성된 글을 string[]로 나누어준다.
* @param {string} text - 타이핑 타겟
* */
export const splitTextByLine = (text: string): string[] => {
  const result: string[] = [];
  let currentWord = '';
  let currentWidth = 0;
  
  const saveAndInit = () => {
    result.push(currentWord);
    currentWord = '';
    currentWidth = 0;
  }
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    currentWord += char;
    
    // acc width
    if (char === ' ') currentWidth += BLANK_WIDTH;
    else currentWidth += CHAR_WIDTH;
    
    // check width at face to blank
    if (char === ' ' && currentWidth >= 850) {
      saveAndInit();
    }
  }
  saveAndInit();

  return result;
}