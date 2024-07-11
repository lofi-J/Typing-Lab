import {memo} from "react";
import styles from "@/component/Keyboard/Keyboard.module.css";
import {IKeyInfo} from "@/static/keymap";

interface IKey {
  detectedKey: string;
  keyInfo: IKeyInfo;
  style?: string;
}
const Key = ({ detectedKey, keyInfo, style }: IKey) => {
  const className = () => {
    if (detectedKey === keyInfo.code) {
      return `${styles.key} ${styles.active} ${style}`;
    } else {
      return `${styles.key} ${style}`;
    }
  }
  
  return <span className={className()}>{keyInfo.text}</span>
}

export default memo(Key);