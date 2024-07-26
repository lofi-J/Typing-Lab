import styles from "./TypingInput.module.css";
import {makeArray} from "@/utils/extension/arrayHelper";
import {TLineRange, validateTypingLine} from "@/utils/playgroundHelper";
import React, {useState, useEffect, ChangeEvent} from "react";
import {TTextCounts} from "@/app/typing/page";
import {checkSyllableLevel} from "@/utils/playgroundHelper";


interface ITypingInput {
  targetList: string[];
  totalUserText: string[];
  setTotalUserText: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  lineRange: TLineRange;
  setLineRange: React.Dispatch<React.SetStateAction<TLineRange>>;
  setValidationResultArr: React.Dispatch<React.SetStateAction<boolean[][]>>;
  setCaret: React.Dispatch<React.SetStateAction<boolean>>;
  setTextCounts: React.Dispatch<React.SetStateAction<TTextCounts>>;
  setIsEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

const initValidationArray = (baseLine: string) => {
  return makeArray(baseLine.length, true);
}

const TypingInput = (
  {targetList, totalUserText, setTotalUserText, lineRange, setLineRange,
  setValidationResultArr, setCaret, setTextCounts, setIsEnd
}: ITypingInput) => {
 
  const baseLine = targetList[lineRange.start]; // 타이핑 해야하는 라인 string
  const [localValue, setLocalValue] = useState('');
  const [localValid, setLocalValid] = useState<boolean[]>(initValidationArray(baseLine));
  const [isBlockTyping, setIsBlockTyping] = useState(false);
  const [isPressEnter, setIsPressEnter] = useState(false);
  const maxTextCount = targetList.reduce((acc, cur: string) => {return acc + cur.length}, 0);
  
  // increase state
  const updateTextStatus = (key: keyof TTextCounts) => {
    setTextCounts(prev => ({...prev, [key]: prev[key] + 1}));
  }
  
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
  
  // setEnd
  const handleEnd = () => {
    const inputCount = totalUserText.reduce((acc, cur: string) => {return acc + cur.length}, 0);
    if (inputCount >= maxTextCount) {
      setIsEnd(true);
    }
  }
  
  const moveToNextLine = () => {
    handleEnd();
    setLocalValue('');
    setLocalValid(initValidationArray(baseLine));
    setIsBlockTyping(false);
    increaseLineRange();
  }
  
  const checkIMESystemDelete = (currentValue: string) => {
    if (localValue.length === 0) return false;
    
    const prevSyllableLevel = checkSyllableLevel(localValue[localValue.length-1]);
    const currentSyllableLevel = checkSyllableLevel(currentValue[currentValue.length-1]);
    
    return prevSyllableLevel > currentSyllableLevel;
  }
  
  // Event
  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key || e.keyCode;

    if (e.code === 'Space' || (key === 'Enter' || key === 13)) {
      if (localValue.length >= baseLine.length) {
        moveToNextLine();
        setIsPressEnter(true);
      }
    } else setIsPressEnter(false);
  }
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isPressEnter) return;

    if (value.length === 0) {
      setLocalValue('');
      setIsBlockTyping(false);
      return;
    }
    
    const isCorrect = validateTypingLine(baseLine, value);
    const isDelete = localValue.length > value.length;
    
    if (isBlockTyping && checkIMESystemDelete(value) || isDelete) {
      setLocalValue(value);
      setValid(value, isCorrect);
      setIsBlockTyping(false);
    } else if ((isCorrect && !isBlockTyping) || isDelete) {
      setLocalValue(value);
      setValid(value, isCorrect);
      setIsBlockTyping(false);
      if (!isDelete) {
        updateTextStatus('totalCount');
      }
      return;
    } else if (!isBlockTyping && !isCorrect) {
      setLocalValue(value);
      setValid(value, isCorrect);
      setIsBlockTyping(true);
      updateTextStatus('wrongCount');
      updateTextStatus('totalCount');
      return;
    }
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
  );
}

export default TypingInput;