import styles from "./ShowLine.module.css";
import React from "react";
import "@/utils/extension/arrayExtensions";
import {indexToKey, TLineRange} from "@/utils/playgroundHelper";
import Cell from "@/component/typing/Cell/Cell";
import {TWeight} from "@/static/settings";

interface IShowLine {
  targetList: string[];
  totalUserText: string[];
  lineRange: TLineRange;
  fontSize: number;
  fontWeight: TWeight;
}

const ShowLine = ({targetList, totalUserText, lineRange, fontSize, fontWeight}: IShowLine) => {
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
              hidden={(index === 0 && i < userTextLength)}
              size={fontSize}
              weight={fontWeight}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ShowLine;