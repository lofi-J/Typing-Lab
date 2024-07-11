import styles from "./Keyboard.module.css";
import {useEffect, useState} from "react";
import Key from "@/component/Keyboard/Key";
import {firstRow, secondRow, thirdRow, IKeyInfo} from "@/static/keymap";


const Keyboard = () => {
  const [detectedKey, setDetectedKey] = useState('');
  
  const renderRow = (row: IKeyInfo[], rowName: string) => {
    return (
      <div className={styles.row}>
        {row.map((key, index) => (
          <Key key={`${rowName}-${index}`} keyInfo={key} detectedKey={detectedKey} />
        ))}
      </div>
    );
  }
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.code);
      setDetectedKey(e.code);
    }
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className={styles.keyboard_container}>
      {renderRow(firstRow, 'low1')}
      {renderRow(secondRow, 'low2')}
      {renderRow(thirdRow, 'low3')}
      <div className={`${styles.key} ${styles.spacebar} ${detectedKey === 'Space' ? styles.active : ''}`}>spacebar</div>
    </div>
  );
}

export default Keyboard;