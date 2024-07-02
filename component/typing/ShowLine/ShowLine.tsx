import styles from "./ShowLine.module.css";
import React from "react";
import {indexToKey, TLineRange} from "@/utils/playgroundHelper";
import Cell from "@/component/typing/Cell/Cell";

interface IShowLine {
  targetList: string[];
  totalUserText: string[];
  lineRange: TLineRange;
}

const ShowLine = ({targetList, totalUserText, lineRange}: IShowLine) => {
  const lines = targetList.copy(lineRange.start, lineRange.end);
  const userTextLength = totalUserText[lineRange.start].length;

  return (
    <div className={styles.lines}>
      {lines && lines.map((line, index) => (
        <div key={indexToKey('show-line', index)} className={styles.line}>
          {line.split('').map((char, i) => (
            <Cell
              key={indexToKey('cell', i)}
              char={char}
              color={"gray"}
              width={char === ' ' ? '0.8rem' : 'auto'}
              hidden={(index === lineRange.start && i < userTextLength)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ShowLine;