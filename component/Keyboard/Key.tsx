import {memo} from "react";
import styles from "@/component/Keyboard/Keyboard.module.css";

interface IKey {
  detectedKey: string;
  text: string;
}
const Key = ({ detectedKey, text }: IKey) => {
  const className = () => {
    if (detectedKey === text) {
      return `${styles.key} ${styles.active}`;
    } else {
      return styles.key;
    }
  }
  
  return <span className={className()}>{text}</span>
}

export default memo(Key);