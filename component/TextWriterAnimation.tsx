'use client';

import styled from "styled-components";
import {useEffect, useState} from "react";

interface ITextWriter {
  text: string;
  delay?: number;
}

const TextWriterAnimation = ({text, delay}: ITextWriter) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay)
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text])
  
  return (
    <StyledTextWriter>{currentText}</StyledTextWriter>
  );
}

const StyledTextWriter = styled.span`
  position: relative;
	font-size: 1.5rem;
  font-weight: bold;
  &::after {
    content: '';
    position: absolute;
    right: -0.3rem;
    top: 20%;
    width: 2px;
    height: 80%;
    background-color: var(--primary-color);
    animation: blink 1s step-start infinite;
  }
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`


export default TextWriterAnimation;