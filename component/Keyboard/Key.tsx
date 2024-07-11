import {memo} from "react";
import styles from "@/component/Keyboard/Keyboard.module.css";
import {IKeyInfo} from "@/static/keymap";

interface IKey {
  detectedKey: string;
  keyInfo: IKeyInfo;
}
const Key = ({ detectedKey, keyInfo }: IKey) => {
  const className = () => {
    if (detectedKey === keyInfo.code) {
      return `${styles.key} ${styles.active}`;
    } else {
      return styles.key;
    }
  }
  
  return <span className={className()}>{keyInfo.text}</span>
}

export default memo(Key);