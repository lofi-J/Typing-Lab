import {useEffect, useState} from "react";

const useWrite = (curInputCode: string) => {
  const [typingText, setTypingText] = useState('');
  
  return { typingText };
}

export default useWrite;
