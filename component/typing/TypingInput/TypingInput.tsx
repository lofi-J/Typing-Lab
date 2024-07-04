import styles from "./TypingInput.module.css";
import {TLineRange, validateTypingLine} from "@/utils/playgroundHelper";
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
  
  const MAX_LINE_INDEX = targetList.length-1;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const baseLine = targetList[lineRange.start]; // 타이핑 해야하는 라인 string[]
  
  const [localValue, setLocalValue] = useState('');
  const [localValid, setLocalValid] = useState<boolean[]>(Array.from({ length: baseLine.length }, () => true));
  const [isBlockInput, setIsBlockInput] = useState(false);
  
  
  const setValid = (value: string, isCorrect: boolean) => {
    const index = value.length-1; // value길이 0이하인 경우는 호출 되지 않음
    const result = [...localValid];
    result[index] = isCorrect;
    setLocalValid(result);
  }
  
  // SET local value, local valid
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    
    if (value.length === 0) return; // ''인 경우 validation을 진행하지 않는다.
    
    const isCorrect = validateTypingLine(baseLine, value);
    setValid(value, isCorrect);
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

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key || e.keyCode;
    
    // 13: Enter의 keyCode
    if (key === 'Enter' || key === 13) {
      e.preventDefault();
      setLocalValue('');
      moveToNextLineRange();
    }
  }
  
  
  // localValue와 totalUserText동기화
  useEffect(() => {
    const result = [...totalUserText];
    result[lineRange.start] = localValue;
    setTotalUserText(result);
  }, [localValue, lineRange]);
  
  
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