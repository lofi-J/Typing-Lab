import styles from "./Playground.module.css";
import '@/utils/extension/arrayExtensions';
import {useState} from "react";
import ShowLine from "@/component/typing/ShowLine/ShowLine";
import TypingInput from "@/component/typing/TypingInput/TypingInput";
import UserText from "@/component/typing/UserText/UserText";
import {initLineRange, TLineRange} from "@/utils/playgroundHelper";
import { TLang } from "@/static/texts/default_article";


interface IPlayground {
  targetList: string[];
  langType: TLang;
}

const initValidationResultArray = (arr: string[]): boolean[][] => {
  return Array.from({length: arr.length}, () => []);
}

const Playground = ({targetList, langType}: IPlayground) => {
  const [totalUserText, setTotalUserTexts] = useState<string[]>(Array.from({length: targetList.length}, () => ''));
  const [validationResultArray, setValidationResultArray] = useState<boolean[][]>(initValidationResultArray(targetList));
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
        langType={langType}
      />
    </div>
  );
}

export default Playground;