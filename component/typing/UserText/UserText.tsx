import styles from "./UserText.module.css";
import {indexToKey, TLineRange} from "@/utils/playgroundHelper";
import Cell from "@/component/typing/Cell/Cell";


interface IUserText {
  totalUserText: string[];
  lineRange: TLineRange;
  validResult: boolean[][];
}

const UserText = ({totalUserText, lineRange, validResult}: IUserText) => {
  const showUserText = totalUserText.copy(lineRange.start, lineRange.end);
  const showResultArr = validResult.copy(lineRange.start, lineRange.end);
  
  const getColor = (lineIndex: number, charIndex: number) => {
    const isCorrect = showResultArr[lineIndex][charIndex];
    return isCorrect ? 'white' : 'red';
  }
  
  return (
    <div className={styles.lines}>
      {showUserText.map((line, index) => (
        <div key={indexToKey('user-line', index)} className={styles.line}>
          {index === 0 && <span></span>}
          {line.split('').map((char, i) => (
            <Cell
              key={indexToKey('user-char', i)}
              char={char}
              color={getColor(index, i)}
              hidden={false}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserText;