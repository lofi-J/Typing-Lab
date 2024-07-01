import styles from "./Cell.module.css";
import {CSSProperties} from "react";

export type TCellColor = 'gray' | 'red' | 'white';

interface ICell {
  key?: string;
  char: string;
  color: TCellColor;
  hidden?: boolean;
}

const getColor = (color: TCellColor) => {
  switch (color) {
    case 'white':
      return 'var(--primary-color)';
    case 'gray':
      return 'var(--gray-500)';
    case 'red':
      return 'var(--red)';
    default:
      return 'var(--primary-color)';
  }
}

const Cell = ({char, color, hidden}: ICell) => {
  const style: CSSProperties = {
    color: getColor(color),
    opacity: hidden ? '0' : '1'
  }
  return (
    <span className={styles.cell} style={style}>{char}</span>
  );
}

export default Cell;