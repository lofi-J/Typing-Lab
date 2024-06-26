'use client';

import style from "./TextWriterAnimation.module.css";
import React, {useEffect, useState} from "react";


interface ITextWriter {
  text: string;
  delay?: number;
  rewrite?: boolean;
  hasCaret?: boolean;
  playOnRender?: boolean;
  setIsDoneForParent?: React.Dispatch<React.SetStateAction<boolean>>
}

const TextWriterAnimation = ({text, delay=150, rewrite, hasCaret=false, playOnRender=true, setIsDoneForParent}: ITextWriter) => {
  const [localRewrite, setLocalRewrite] = useState(rewrite);
  const [currentText, setCurrentText] = useState(playOnRender ? '' : text);
  const [currentIndex, setCurrentIndex] = useState(playOnRender ? 0 : text.length);
  const [isDone, setIsDone] = useState(false);
  
  useEffect(() => {
    if (localRewrite !== rewrite) {
      setCurrentText('');
      setCurrentIndex(0);
      setLocalRewrite(rewrite);
    }
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay)
      
      return () => {
        if (text.length-1 === currentIndex) {
          if(setIsDoneForParent) {
            setIsDoneForParent(true);
          }
          setIsDone(true);
        }
        clearTimeout(timeout);
      }
    }
  }, [currentIndex, delay, text, rewrite, localRewrite])
  
  return (
    <span className={`${hasCaret ? style.caret : ''} ${isDone ? style.done : ''}`}>
      {currentText}
    </span>
  );
}

export default TextWriterAnimation;