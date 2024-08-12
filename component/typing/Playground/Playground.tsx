import styles from "./Playground.module.css";
import {makeArray} from "@/utils/extension/arrayHelper";
import React, {Dispatch, useEffect, useState} from "react";
import ShowLine from "@/component/typing/ShowLine/ShowLine";
import TypingInput from "@/component/typing/TypingInput/TypingInput";
import UserText from "@/component/typing/UserText/UserText";
import {initLineRange, TLineRange} from "@/utils/playgroundHelper";
import {TTextCounts} from "@/app/typing/page";
import FocusAlert from "@/component/typing/FocusAlert/FocusAlert";
import {ISettings, TWeight} from "@/static/settings";
import ProgressBar from "@/component/ProgressBar/ProgressBar";


interface IPlayground {
  targetList: string[];
  setTextCounts: Dispatch<React.SetStateAction<TTextCounts>>;
  totalUserText?: string[];
  setTotalUserTexts: Dispatch<React.SetStateAction<string[] | undefined>>;
  isEnd: boolean;
  setIsEnd: Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
  fontSize: number;
  fontWeight: TWeight;
  isShowProgressBar: boolean;
  progress: number;
  settings: ISettings;
}

const Playground = ({
  targetList, setTextCounts, totalUserText, setTotalUserTexts, isEnd, setIsEnd, inputRef,
  fontSize, fontWeight, isShowProgressBar, progress, settings
  }: IPlayground) => {
  const [validationResultArray, setValidationResultArray] = useState<boolean[][]>(makeArray(targetList.length, []));
  const [lineRange, setLineRange] = useState<TLineRange>(initLineRange(targetList));
  const [showCaret, setShowCaret] = useState(!isEnd);
  const [hasInputFocus, setHasInputFocus] = useState(true);
  
  useEffect(() => {
    const onFocus = () => setHasInputFocus(true);
    const onBlur = () => setHasInputFocus(false);
    const inputEl = inputRef.current;
    
    if (inputEl) {
      inputEl.addEventListener('focus', onFocus);
      inputEl.addEventListener('blur', onBlur);
    } else console.error('inputEl not initial');
    
    return () => {
      if (inputEl) {
        inputEl.removeEventListener('focus', onFocus);
        inputEl.removeEventListener('blur', onBlur);
      }
    }
  }, []);
  
  if (!totalUserText) return;
  
  return (
    <div className={styles.container}>
      {(!hasInputFocus && !isEnd) && <FocusAlert inputRef={inputRef}/>}
      <div className={styles.text_wrap}>
        <ShowLine
          targetList={targetList}
          totalUserText={totalUserText}
          lineRange={lineRange}
          fontSize={fontSize}
          fontWeight={fontWeight}
        />
        <UserText
          totalUserText={totalUserText}
          lineRange={lineRange}
          validResult={validationResultArray}
          showCaret={showCaret}
          fontSize={fontSize}
          fontWeight={fontWeight}
        />
      </div>
      <TypingInput
        targetList={targetList}
        totalUserText={totalUserText}
        setTotalUserText={setTotalUserTexts}
        setValidationResultArr={setValidationResultArray}
        lineRange={lineRange}
        setLineRange={setLineRange}
        setCaret={setShowCaret}
        setTextCounts={setTextCounts}
        setIsEnd={setIsEnd}
        inputRef={inputRef}
        settings={settings}
      />
      {isShowProgressBar && <ProgressBar progress={progress} />}
    </div>
  );
}

export default Playground;