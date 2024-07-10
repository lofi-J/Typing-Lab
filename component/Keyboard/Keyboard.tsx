'use client';

import styles from "./Keyboard.module.css";
import {useEffect, useState} from "react";
import Key from "@/component/Keyboard/Key";


const Keyboard = () => {
  const [detectedKey, setDetectedKey] = useState('');
  const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];
  const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
  const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
  
  const renderRow = (row: string[], rowName: string) => {
    return (
      <div className={styles.row}>
        {row.map((key, index) => (
          <Key key={`${rowName}-${index}`} text={key} detectedKey={detectedKey} />
        ))}
      </div>
    );
  }
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setDetectedKey(e.key);
    }
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className={styles.keyboard_container}>
      {renderRow(firstRow, 'low1')}
      {renderRow(secondRow, 'low2')}
      {renderRow(thirdRow, 'low3')}
      <div className={`${styles.key} ${styles.spacebar} ${detectedKey === ' ' ? styles.active : ''}`}>spacebar</div>
    </div>
  );
}

export default Keyboard;