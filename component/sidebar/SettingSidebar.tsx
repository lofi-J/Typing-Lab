import styles from "./SettingSidebar.module.css";
import React, {SetStateAction} from "react";
import { IoClose } from "react-icons/io5";


interface ISettingSidebar {
  close: React.Dispatch<SetStateAction<boolean>>;
}
const SettingSidebar = ({close}: ISettingSidebar) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.close}>
          <IoClose size={30} />
        </div>
        <div className={styles.title}>
          <h1>Typing Lab Settings</h1>
        </div>
      </div>
    </div>
  );
}

export default SettingSidebar;