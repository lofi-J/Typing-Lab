import styles from "./TypingInput.module.css";
import {makeArray} from "@/utils/extension/arrayHelper";
import {TLineRange, validateTypingLine} from "@/utils/playgroundHelper";
import React, {useState, useEffect, useRef, ChangeEvent} from "react";


interface ITypingInput {
  targetList: string[];
  totalUserText: string[];
  setTotalUserText: React.Dispatch<React.SetStateAction<string[]>>;
  lineRange: TLineRange;
  setLineRange: React.Dispatch<React.SetStateAction<TLineRange>>;
  setValidationResultArr: React.Dispatch<React.SetStateAction<boolean[][]>>;
}

const initValidationArray = (baseLine: string) => {
  return makeArray(baseLine.length, true);
}

const TypingInput = (
  {targetList, totalUserText, setTotalUserText, lineRange, setLineRange, setValidationResultArr
}: ITypingInput) => {
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const baseLine = targetList[lineRange.start]; // 타이핑 해야하는 라인 string
  
  const [localValue, setLocalValue] = useState('');
  const [localValid, setLocalValid] = useState<boolean[]>(initValidationArray(baseLine));
  
  
  const setValid = (value: string, isCorrect: boolean) => {
    const index = value.length-1; // value길이 0이하인 경우는 호출 되지 않음
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
    if (value.length === 1 && value === ' ') return;
    setLocalValue(value);
    
    if (value.length === 0) return; // validation을 진행하지 않는다.
    
    const isCorrect = validateTypingLine(baseLine, value);
    setValid(value, isCorrect);
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
        ref={inputRef}
        type={'text'}
        value={localValue}
        className={styles.input}
        onChange={onChange}
        onKeyDown={onKeydown}
        autoFocus={true}
      />
    </div>
  );
}

export default TypingInput;