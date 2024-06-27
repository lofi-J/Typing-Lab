import styles from "./GradientCard.module.css";
import {CSSProperties, ReactNode} from "react";

interface IGradientCard {
  children: ReactNode;
  style?: CSSProperties;
}
const GradientCard = ({children, style}: IGradientCard) => {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}

export default GradientCard;