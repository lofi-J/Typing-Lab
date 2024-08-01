import styles from "./Playground.module.css";
import {makeArray} from "@/utils/extension/arrayHelper";
import React, {useEffect, useState} from "react";
import ShowLine from "@/component/typing/ShowLine/ShowLine";
import TypingInput from "@/component/typing/TypingInput/TypingInput";
import UserText from "@/component/typing/UserText/UserText";
import {initLineRange, TLineRange} from "@/utils/playgroundHelper";
import {TTextCounts} from "@/app/typing/page";


interface IPlayground {
  targetList: string[];
  setTextCounts: React.Dispatch<React.SetStateAction<TTextCounts>>;
  totalUserText?: string[];
  setTotalUserTexts: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  isEnd: boolean;
  setIsEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

const Playground = ({targetList, setTextCounts, totalUserText, setTotalUserTexts, isEnd, setIsEnd}: IPlayground) => {
  const [validationResultArray, setValidationResultArray] = useState<boolean[][]>(makeArray(targetList.length, []));
  const [lineRange, setLineRange] = useState<TLineRange>(initLineRange(targetList));
  const [showCaret, setShowCaret] = useState(true);
  
  useEffect(() => {
    if (isEnd) {
      setShowCaret(false);
    } else {
      setShowCaret(true);
    }
  }, [isEnd]);
  
  if (!totalUserText) return;
  
  return (
    <div className={styles.container}>
      <div className={styles.text_wrap}>
        <ShowLine
          targetList={targetList}
          totalUserText={totalUserText}
          lineRange={lineRange}
        />
        <UserText
          totalUserText={totalUserText}
          lineRange={lineRange}
          validResult={validationResultArray}
          showCaret={showCaret}
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
      />
    </div>
  );
}

export default Playground;