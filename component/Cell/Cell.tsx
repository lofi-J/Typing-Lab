import styles from "./Cell.module.css";
import React, {CSSProperties} from "react";


interface ICell {
  type: 'placeholder' | 'print';
  char: string;
  isCollect?: boolean;
  isTypingNow?: boolean;
}

const getColor = (type: ICell.type, isCollect?: ICell.isCollect) => {
  if (type === 'placeholder') {
    return 'var(--gray-600)';
  } else {
    if (isCollect) {
      return 'var(--primary-color)';
    } else {
      return 'red';
    }
  }
}

const Cell = React.memo(({type, char, isCollect, isTypingNow=false}: ICell) => {
  const style: CSSProperties = {
    color: getColor(type, isCollect),
    width: char === ' ' ? 'var(--cell-blank-width)' : 'var(--cell-width)',
    opacity: (type === 'placeholder' && isTypingNow) ? '0' : '1'
  }
  
  return (
    <span
      className={styles.cell}
      style={{...style}}
    >
      {char}
    </span>
  )
});

Cell.displayName = 'Cell';

export default Cell;