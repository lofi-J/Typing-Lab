import styles from "./Cell.module.css";
import {CSSProperties, memo} from "react";

export type TCellColor = 'gray' | 'red' | 'white';

interface ICell {
  char: string;
  color: TCellColor;
  hidden?: boolean;
  width: string;
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

const Cell = ({char, color, hidden, width}: ICell) => {
  const style: CSSProperties = {
    color: getColor(color),
    opacity: hidden ? '0' : '1',
    width: width
  }
  return (
    <span className={styles.cell} style={style}>{char}</span>
  );
}

export default memo(Cell);