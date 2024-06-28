import styles from "./TypingInput.module.css";
import {TLineRange} from "@/utils/playgroundHelper";
import {SetStateAction} from "react";
import "@/utils/splitKR";

interface ITypingInput {
  lines: string[];
  totalUserText: string[];
  setTotalUserText: (value: (((prevState: string[]) => string[]) | string[])) => void;
  lineRange: TLineRange;
  setLineRange: Dispatch<SetStateAction<TLineRange>>;
}

/*
* lines: 타이핑할 타겟 gray색상
* totalUserText: input을 통해 업데이트할 유저가 입력할 텍스트 리스트 string[]이다.
* lineRange: 현재 보여지는 3개의 라인에 대한 index이다.
*/
const TypingInput = ({lines, totalUserText, setTotalUserText, lineRange, setLineRange}: ITypingInput) => {
  const targetList = lines[0];
  
  // setTotalFn
  const setInputText = (value: string) => {
    const result = [...totalUserText];
    result[lineRange.start] = value;
    setTotalUserText(result);
  }
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }
  
  return (
    <input
      className={styles.input}
      type={'text'}
      onChange={(e) => onChange(e)}
    />
  );
}

export default TypingInput;