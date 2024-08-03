import styles from "./FocusAlert.module.css";
import React, {useEffect} from "react";
import { FaArrowPointer } from "react-icons/fa6";
import {excludedKeys} from "@/static/keymap";


interface IFocusAlert {
  inputRef: React.RefObject<HTMLInputElement>
}

const FocusAlert = ({inputRef}: IFocusAlert) => {
  const focus = () => {
    if (inputRef) {
      const inputEl = inputRef.current;
      if (inputEl) {
        inputEl.focus();
      }
    }
  }
  
  useEffect(() => {
    const handleAnyKey = (event: KeyboardEvent) => {
      const key = event.key;
      if (!excludedKeys.includes(key)) {
        setTimeout(() => {
          focus();
        }, 0.2);
      }
    }
    window.addEventListener("keydown", handleAnyKey);
    
    return () => window.removeEventListener("keydown", handleAnyKey);
  }, []);
  
  return (
    <div className={styles.container} onClick={focus}>
      <div className={styles.text_wrap}>
        <FaArrowPointer size={14} />
        <span>click here or press any key to focus</span>
      </div>
    </div>
  );
}

export default FocusAlert;