'use client';

import {useEffect, useState} from "react";
import style from "@/styles/TextWriterAnimation.module.css";


interface ITextWriter {
  text: string;
  delay?: number;
  rewrite?: boolean;
  hasCaret?: boolean;
  playOnRender?: boolean;
}

const TextWriterAnimation = ({text, delay=150, rewrite, hasCaret=false, playOnRender=true}: ITextWriter) => {
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