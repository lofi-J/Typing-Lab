import styles from "./TypingInput.module.css";
import {TLineRange} from "@/utils/playgroundHelper";
import {SetStateAction} from "react";

interface ITypingInput {
  lines: string[];
  totalUserText: string[];
  setTotalUserText: (value: (((prevState: string[]) => string[]) | string[])) => void;
  lineRange: TLineRange;
  setLineRange: Dispatch<SetStateAction<TLineRange>>;
}

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