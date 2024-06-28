import styles from "./TypingLine.module.css";
import {indexToKey} from "@/utils/playgroundHelper";
import Cell from "@/component/typing/Cell/Cell";

interface ITypingLine {
  lineIndex: number;
  line: string;
}

const TypingLine = ({lineIndex, line}: ITypingLine) => {
  return (
    <div className={styles.line}>
      {!!line.length && line.split('').map((char, i) => (
        <Cell key={indexToKey(`line-cell-${lineIndex}`, i)} char={char} />
      ))}
    </div>
  );
}

export default TypingLine;