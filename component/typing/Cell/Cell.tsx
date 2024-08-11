import styles from "./Cell.module.css";
import {CSSProperties, memo} from "react";
import {TWeight} from "@/static/settings";


export type TCellColor = 'gray' | 'red' | 'white';

interface ICell {
  char: string;
  color: TCellColor;
  hidden?: boolean;
  width: string;
  size: number;
  weight: TWeight;
  id?: string;
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

const Cell = ({char, color, hidden, width, size, weight, id}: ICell) => {
  
  const style: CSSProperties = {
    color: getColor(color),
    opacity: hidden ? '0' : '1',
    width: width,
    fontSize: size,
    fontWeight: weight
  }
  
  const cellClassName = `
    ${styles.cell}
    ${color === 'red' ? styles.shake : ''}
    ${(color === 'red' && char === ' ') ? styles.wrong_blank : ''}
  `;
  
  return (
    <span className={cellClassName} style={style} id={id}>{char}</span>
  );
}

export default memo(Cell);