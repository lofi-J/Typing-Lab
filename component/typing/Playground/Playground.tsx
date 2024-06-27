'use client';

import styles from "./Playground.module.css";
import {useEffect, useRef, useState, useCallback} from "react";
import Cell from "@/component/Cell/Cell";

interface IPlayground {
  typingTargetList: string[];
}

const Playground = ({typingTargetList}: IPlayground) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const [inputTextList, setInputTextList] = useState(Array.from({length: typingTargetList.length}, () => ''));
  
  const handleInputText = (value: string) => {
    console.log(value);
  }
  
  const handleClickInside = useCallback((event: MouseEvent) => {
    if (containerRef.current && containerRef.current.contains(event.target as Node)) {
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
    }
  }, [containerRef])
  
  // For input focusing
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
    
    document.addEventListener('mousedown', handleClickInside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickInside);
    }
  }, [handleClickInside, focusIndex])
  
  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.board}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={''}
          onChange={e => handleInputText(e.target.value)}
        />
        {typingTargetList.map((list, index) => (
          <div key={`targetList-${index}`} className={styles.wrap}>
            <div className={styles.target_text}>
              {list.split('').map((letter, index) => (
                <Cell
                  key={`-${index}`}
                  type={'placeholder'}
                  char={letter}
                  isTypingNow={false} // TODO
                />
              ))}
            </div>
            <div className={styles.print}>
              {inputTextList[index].split('').map((letter, index) => (
                <Cell
                  key={`+${index}`}
                  type={'print'}
                  char={letter}
                  isCollect={true} // TODO
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playground;