import styles from "./Playground.module.css";
import {makeArray} from "@/utils/extension/arrayHelper";
import {useState} from "react";
import ShowLine from "@/component/typing/ShowLine/ShowLine";
import TypingInput from "@/component/typing/TypingInput/TypingInput";
import UserText from "@/component/typing/UserText/UserText";
import {initLineRange, TLineRange} from "@/utils/playgroundHelper";


interface IPlayground {
  targetList: string[];
}

const Playground = ({targetList}: IPlayground) => {
  const [totalUserText, setTotalUserTexts] = useState<string[]>(makeArray(targetList.length, ''));
  const [validationResultArray, setValidationResultArray] = useState<boolean[][]>(makeArray(targetList.length, []));
  const [lineRange, setLineRange] = useState<TLineRange>(initLineRange(targetList));
  
  
  return (
    <div className={styles.container}>
      <div className={styles.text_wrap}>
        <ShowLine
          targetList={targetList}
          totalUserText={totalUserText}
          lineRange={lineRange}
        />
        <UserText totalUserText={totalUserText} lineRange={lineRange} validResult={validationResultArray} />
      </div>
      <TypingInput
        targetList={targetList}
        totalUserText={totalUserText}
        setTotalUserText={setTotalUserTexts}
        setValidationResultArr={setValidationResultArray}
        lineRange={lineRange}
        setLineRange={setLineRange}
      />
    </div>
  );
}

export default Playground;