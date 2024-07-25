import styles from "./RoundCard.module.css";
import {CSSProperties, ReactNode} from "react";
import {IconType} from "react-icons";


interface IRoundCard {
  title: string;
  icon: IconType;
  value: string | number | ReactNode;
  style?: CSSProperties;
}

const RoundCard = ({title, icon: Icon, value, style}: IRoundCard) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <Icon size={20} style={style} />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
}

export default RoundCard;