import styles from "./IconCountCard.module.css";
import {IconType} from "react-icons";
import {ReactNode} from "react";


interface IIconCountCard {
  icon: IconType;
  title: string;
  value: number | string | ReactNode;
  unit?: string;
}

const IconCountCard = ({icon: Icon, title, value, unit}: IIconCountCard) => {
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Icon size={15} />
        <span>{title}</span>
      </div>
      <div className={styles.body}>
        <span>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
    </div>
  );
}

export default IconCountCard;