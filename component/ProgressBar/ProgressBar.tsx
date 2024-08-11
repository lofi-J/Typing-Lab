import styles from "./ProgressBar.module.css";
import {CSSProperties} from "react";


const ProgressBar = ({progress}: {progress: number}) => {
  const inlineStyle: CSSProperties = {
    width: `${progress}%`
  }
  return (
    <div className={styles.bar}>
      <div className={styles.gage} style={inlineStyle} />
    </div>
  );
}

export default ProgressBar;