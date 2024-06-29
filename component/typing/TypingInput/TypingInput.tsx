import styles from "./TypingInput.module.css";
import {TLineRange} from "@/utils/playgroundHelper";
import React, {SetStateAction} from "react";
import "@/utils/splitKR";


interface ITypingInput {
  lines: string[];
  totalUserText: string[];
  setTotalUserText: (value: (((prevState: string[]) => string[]) | string[])) => void;
  lineRange: TLineRange;
  setLineRange: (value: (((prevState: TLineRange) => TLineRange) | TLineRange)) => void;
}

const TypingInput = ({lines, totalUserText, setTotalUserText, lineRange, setLineRange}: ITypingInput) => {
  const MAX_LINE_INDEX = totalUserText.length-1;

  // setTotalUserText Fn
  const setInputText = (value: string) => {
    const result = [...totalUserText];
    result[lineRange.start] = value;
    setTotalUserText(result);
  }
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const nextLineRange = () => {
    const nextStart = (lineRange.start + 1) <= MAX_LINE_INDEX ? lineRange.start + 1 : undefined;
    const nextEnd = (lineRange.end + 1) <= MAX_LINE_INDEX ? lineRange.end + 1 : undefined;

    setLineRange(prev => {
      return {start: nextStart || prev.start, end: nextEnd || prev.end}
    })
  }
  
  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
      nextLineRange();
    }
  }
  
  
  return (
    <input
      className={styles.input}
      type={'text'}
      onChange={onChange}
      onKeyDown={onKeydown}
    />
  );
}

export default TypingInput;