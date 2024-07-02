import styles from "./TypingInput.module.css";
import {TLineRange, validateTypingChar} from "@/utils/playgroundHelper";
import React, {ChangeEvent, useEffect} from "react";
import "@/utils/splitKR";


interface ITypingInput {
  targetList: string[];
  totalUserText: string[];
  setTotalUserText: React.Dispatch<React.SetStateAction<string[]>>;
  lineRange: TLineRange;
  setLineRange: React.Dispatch<React.SetStateAction<TLineRange>>;
  setValidationResultArr: React.Dispatch<React.SetStateAction<boolean[][]>>;
}

const TypingInput = (
  {targetList, totalUserText, setTotalUserText, lineRange, setLineRange, setValidationResultArr
}: ITypingInput) => {
  
  const MAX_LINE_INDEX = totalUserText.length-1;
  
  // setTotalUserText Fn
  const setInputText = (value: string) => {
    const result = [...totalUserText];
    result[lineRange.start] = value;
    setTotalUserText(result);
  }
  
  // setResultArray Fn
  const setValidationArr = (isCorrect: boolean, charIndex: number) => {
    if (charIndex < 0) { return; }
    
    setValidationResultArr(prev => {
      return prev.map((row, index) => {
        if (index===lineRange.start) {
          const newRow = [...row];
          newRow[charIndex] = isCorrect;
          return newRow;
        } else {
          return [...row];
        }
      });
    })
  }
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    // validate
    const isCorrect = validateTypingChar(targetList.copy(lineRange.start, lineRange.end)[0], e.target.value);
    if (typeof isCorrect === 'boolean') {
      setValidationArr(isCorrect, e.target.value.length-1);
    }
  }

  // TODO
  const nextLineRange = () => {
    const nextStart = (lineRange.start + 1) <= MAX_LINE_INDEX ? lineRange.start + 1 : undefined;
    const nextEnd = (lineRange.end + 1) <= MAX_LINE_INDEX ? lineRange.end + 1 : undefined;

    setLineRange(prev => {
      return {start: nextStart || prev.start, end: nextEnd || prev.end}
    })
  }
  
  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
      e.preventDefault();
      nextLineRange();
    }
  }
  
  // Backspace 또는 ctrl + a 로 인한 예외 처리
  useEffect(() => {
    const maxLength = totalUserText[lineRange.start].length;
    
    // 수정 중인 인덱스 파트에서 maxLength이상의 결과값들을 제거
    setValidationResultArr(prev => {
      const updateArr = [...prev];
      const currArr = updateArr[lineRange.start];
      
      if (currArr.length > maxLength) {
        updateArr[lineRange.start] = currArr.slice(0, maxLength);
      }
      
      return updateArr;
    })
  }, [totalUserText, lineRange, setValidationResultArr]);
  
  return (
    <input
      className={styles.input}
      type={'text'}
      onChange={onChange}
      onKeyDown={onKeydown}
      autoFocus={true}
    />
  );
}

export default TypingInput;