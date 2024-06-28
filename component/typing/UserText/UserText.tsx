import styles from "./UserText.module.css";
import {indexToKey} from "@/utils/playgroundHelper";
import Cell from "@/component/typing/Cell/Cell";

interface IUserText {
  showUserText: string[];
}

const UserText = ({showUserText}: IUserText) => {
  return (
    <div className={styles.line}>
      {showUserText.map((line, index) => (
        <div key={indexToKey('user-line', index)}>
          {line.split('').map((char, i) => (
            <Cell key={indexToKey('user-char', i)} char={char} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserText;