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
    if (char === ' ') currentWidth += 10;
    else currentWidth += 22;
    
    // check width at face to blank
    if (char === ' ' && currentWidth >= 880) {
      saveAndInit();
    }
  }
  saveAndInit();

  return result;
}