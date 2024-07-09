import styles from "./TypingInput.module.css";
import {makeArray} from "@/utils/extension/arrayHelper";
import {TLineRange, validateTypingLine} from "@/utils/playgroundHelper";
import React, {useState, useEffect, ChangeEvent} from "react";


interface ITypingInput {
  targetList: string[];
  totalUserText: string[];
  setTotalUserText: React.Dispatch<React.SetStateAction<string[]>>;
  setTotalWrongCount: React.Dispatch<React.SetStateAction<number>>;
  lineRange: TLineRange;
  setLineRange: React.Dispatch<React.SetStateAction<TLineRange>>;
  setValidationResultArr: React.Dispatch<React.SetStateAction<boolean[][]>>;
  setCaret: React.Dispatch<React.SetStateAction<boolean>>;
}

const initValidationArray = (baseLine: string) => {
  return makeArray(baseLine.length, true);
}

const TypingInput = (
  {targetList, totalUserText, setTotalUserText, lineRange, setLineRange, setValidationResultArr, setCaret, setTotalWrongCount
}: ITypingInput) => {
  
  const baseLine = targetList[lineRange.start]; // 타이핑 해야하는 라인 string
  const [localValue, setLocalValue] = useState('');
  const [localValid, setLocalValid] = useState<boolean[]>(initValidationArray(baseLine));
  const [isBlockTyping, setIsBlockTyping] = useState(false);
  
  
  const setValid = (value: string, isCorrect: boolean) => {
    const index = value.length-1;
    const result = [...localValid];
    result[index] = isCorrect;
    setLocalValid(result);
  }

  const increaseLineRange = () => {
    const nextStart = (lineRange.start + 1) <= targetList.length-1 ? lineRange.start + 1 : undefined;
    const nextEnd = (lineRange.end + 1) <= targetList.length-1 ? lineRange.end + 1 : undefined;

    setLineRange(prev => {
      return {
        start: nextStart || prev.start,
        end: nextEnd || prev.end
      }
    })
  }
  
  const moveToNextLine = () => {
    setLocalValue('')
    setLocalValid(initValidationArray(baseLine));
    setIsBlockTyping(false);
    increaseLineRange();
  }
  
  // Event
  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key || e.keyCode;

    if (localValue.length > baseLine.length) {
      moveToNextLine();
    }
    
    if (key === 'Enter' || key === 13) {
      e.preventDefault();
      moveToNextLine();
    }
  }
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.length === 0) {
      setLocalValue('');
      setIsBlockTyping(false);
    }
    
    const isCorrect = validateTypingLine(baseLine, value);
    const isDelete = localValue.length > value.length;
    if ((isCorrect && !isBlockTyping) || isDelete) {
      setLocalValue(value);
      setValid(value, isCorrect);
      setIsBlockTyping(false);
      return;
    } else if (!isBlockTyping && !isCorrect) {
      setLocalValue(value);
      setValid(value, isCorrect);
      setIsBlockTyping(true);
      return;
    }
    setTotalWrongCount(prev => prev + 1);
  }
  
  // IME 키보드 시스템 종성 예외처리
  const onComposingEnd = () => {
    const value = localValue;
    const index = value.length - 1;
    const isCorrect = value[index] === baseLine.slice(index, index + 1);
    
    setLocalValid(prev => {
      const newValid = [...prev];
      newValid[index] = isCorrect;
      return newValid;
    })
  }
  
  // localValue와 totalUserText동기화
  useEffect(() => {
    // value
    const result = [...totalUserText];
    result[lineRange.start] = localValue;
    setTotalUserText(result);
    
    // validation
    setValidationResultArr(prev => {
      const result = [...prev];
      result[lineRange.start] = localValid;
      return result;
    })
  }, [localValue, lineRange, localValid, setValidationResultArr, setTotalUserText]);
  
  
  return (
    <div>
      <input
        type={'text'}
        value={localValue}
        className={styles.input}
        onChange={onChange}
        onKeyDown={onKeydown}
        onCompositionEnd={onComposingEnd}
        autoFocus={true}
        onFocus={() => setCaret(true)}
        onBlur={() => setCaret(false)}
      />
    </div>
  );
}

export default TypingInput;