import styles from "./Keyboard.module.css";
import {useEffect, useState} from "react";
import Key from "@/component/Keyboard/Key";
import {firstRow, secondRow, thirdRow, IKeyInfo} from "@/static/keymap";


const Keyboard = ({isActive}: {isActive: boolean}) => {
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
    if (!isActive) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      setDetectedKey(e.code);
    }
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);
  
  return (
    <div className={styles.keyboard_container}>
      {renderRow(firstRow, 'low1')}
      {renderRow(secondRow, 'low2')}
      {renderRow(thirdRow, 'low3')}
      <Key keyInfo={{text: 'spacebar', code: 'Space'}} detectedKey={detectedKey} style={styles.spacebar} />
    </div>
  );
}

export default Keyboard;