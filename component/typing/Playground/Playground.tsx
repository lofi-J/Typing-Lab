import styles from "./Playground.module.css";
import {makeArray} from "@/utils/extension/arrayHelper";
import React, {useState} from "react";
import ShowLine from "@/component/typing/ShowLine/ShowLine";
import TypingInput from "@/component/typing/TypingInput/TypingInput";
import UserText from "@/component/typing/UserText/UserText";
import {initLineRange, TLineRange} from "@/utils/playgroundHelper";
import {TTextCounts} from "@/app/typing/page";


interface IPlayground {
  targetList: string[];
  setTextCounts: React.Dispatch<React.SetStateAction<TTextCounts>>;
}

const Playground = ({targetList, setTextCounts}: IPlayground) => {
  const [totalUserText, setTotalUserTexts] = useState<string[]>(makeArray(targetList.length, ''));
  const [validationResultArray, setValidationResultArray] = useState<boolean[][]>(makeArray(targetList.length, []));
  const [lineRange, setLineRange] = useState<TLineRange>(initLineRange(targetList));
  const [showCaret, setShowCaret] = useState(true);
  
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
      />
    </div>
  );
}

export default Playground;