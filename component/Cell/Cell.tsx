import styles from "./Cell.module.css";


interface ICell {
  children: React.ReactNode;
  isCollect: boolean;
}
const Cell = ({children, isCollect}: ICell) => {
  
  return (
    <span className={styles.cell}>{children}</span>
  )
}

export default Cell;