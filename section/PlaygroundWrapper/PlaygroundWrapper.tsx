import styles from "./PlaygroundWrapper.module.css";
import {CSSProperties, ReactNode} from "react";

interface IPlaygroundWrapper {
  children: ReactNode;
  style?: CSSProperties;
}
const PlaygroundWrapper = ({children, style}: IPlaygroundWrapper) => {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}

export default PlaygroundWrapper;