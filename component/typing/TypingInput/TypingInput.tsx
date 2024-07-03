import styles from "./TypingInput.module.css";
import {isValidInputByLang, TLineRange, validateTypingLine} from "@/utils/playgroundHelper";
import {isKR, isEN} from "@/utils/splitKR";
import React, {useState, useEffect, useRef, ChangeEvent} from "react";
import { TLang } from "@/static/texts/default_article";


interface ITypingInput {
  targetList: string[];
  totalUserText: string[];
  setTotalUserText: React.Dispatch<React.SetStateAction<string[]>>;
  lineRange: TLineRange;
  setLineRange: React.Dispatch<React.SetStateAction<TLineRange>>;
  setValidationResultArr: React.Dispatch<React.SetStateAction<boolean[][]>>;
  langType: TLang;
}

const TypingInput = (
  {targetList, totalUserText, setTotalUserText, lineRange, setLineRange, setValidationResultArr, langType
}: ITypingInput) => {
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const MAX_LINE_INDEX = totalUserText.length-1;
  const [isRecentInputValid, setIsRecentInputValid] = useState(true);
  const [isComposing, setIsComposing] = useState(false); // IME 키보드 입력 처리 시스템 작동 여부
  
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
        if (index === lineRange.start) {
          const newRow = [...row];
          newRow[charIndex] = isCorrect;
          return newRow;
        } else {
          return [...row];
        }
      });
    })
  }
  
  const onChangeEN = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isRecentInputValid) return;
    
    setInputText(value);
    const isCorrect = value[value.length-1] === targetList[lineRange.start][value.length-1];
    setValidationArr(isCorrect, value.length-1);
    setIsRecentInputValid(isCorrect);
  }
  
  const onChangeKR = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isRecentInputValid) {
      return;
    }
    
    setInputText(value);
    // compare targetList with input value
    const isCorrect = validateTypingLine(targetList.copy(lineRange.start, lineRange.end)[0], value);
    if (typeof isCorrect === 'boolean' && !isComposing) {
      setValidationArr(isCorrect, value.length-1);
      setIsRecentInputValid(isCorrect);
    }
  }

  const moveToNextLineRange = () => {
    const nextStart = (lineRange.start + 1) <= MAX_LINE_INDEX ? lineRange.start + 1 : undefined;
    const nextEnd = (lineRange.end + 1) <= MAX_LINE_INDEX ? lineRange.end + 1 : undefined;

    setLineRange(prev => {
      return {
        start: nextStart || prev.start,
        end: nextEnd || prev.end
      }
    })
  }
  
  const clearInputBuffer = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key || e.keyCode;
    // const value = e.target.value;
    
    if ((key === 'Backspace' || key === 8) && !isRecentInputValid) {
      setIsRecentInputValid(true);
      // setInputText(value.copy(0, value.length-1));
    }
    
    // 13: Enter의 keyCode
    if (key === 'Enter' || key === 13) {
      e.preventDefault();
      clearInputBuffer();
      moveToNextLineRange();
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
    <div>
      <input
        ref={inputRef}
        type={'text'}
        value={totalUserText[lineRange.start]}
        className={styles.input}
        onChange={langType === 'kr' ? onChangeKR : onChangeEN}
        onKeyDown={onKeydown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        autoFocus={true}
      />
    </div>
  );
}

export default TypingInput;