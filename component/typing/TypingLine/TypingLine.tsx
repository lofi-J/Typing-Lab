import styles from "./TypingLine.module.css";
import {indexToKey} from "@/utils/playgroundHelper";
import Cell from "@/component/typing/Cell/Cell";
import React from "react";

interface ITypingLine {
  key: string;
  lineIndex: number;
  line: string;
}

const TypingLine: React.FC<ITypingLine> = ({lineIndex, line}) => {
  return (
    <div className={styles.line}>
      {!!line.length && line.split('').map((char, i) => (
        <Cell key={indexToKey(`line-cell-${lineIndex}`, i)} char={char} />
      ))}
    </div>
  );
}

export default TypingLine;