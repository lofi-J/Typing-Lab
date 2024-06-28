import styles from "./Cell.module.css";

interface ICell {
  char: string;
}

const Cell = ({char}: ICell) => {
  return (
    <span className={styles.cell}>{char}</span>
  );
}

export default Cell;