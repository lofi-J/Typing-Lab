'use client';

import styles from "./Playground.module.css";
import {useEffect, useRef, useState} from "react";
import Cell from "@/component/Cell/Cell";

interface IPlayground {
  typingTarget: string;
}

const Playground = ({typingTarget}: IPlayground) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputText, setInputText] = useState('');
  
  const handleInputText = (value: string) => {
    setInputText(value);
  }
  
  useEffect(() => {
    if (inputRef.current) { inputRef.current.focus(); }
  }, [])
  
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={inputText}
          onChange={e => handleInputText(e.target.value)}
        />
        <div className={styles.target_text}>
          {typingTarget.split('').map((letter, index) => (
            <span key={`-${index}`}>{letter}</span>
          ))}
        </div>
        <div className={styles.print}>
          <span />
          {inputText.split('').map((letter, index) => (
            <Cell 
              key={`+${index}`}
              isCollect={false}
            >
              {letter}
              </Cell>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Playground;