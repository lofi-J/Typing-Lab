import {ReactNode} from "react";
import styles from "./styles/CustomModal.module.css";
import Dialog from "@/component/modal/Dialog";
import { IoClose } from "react-icons/io5";

interface ICustomModal {
  children: ReactNode;
  close: () => void;
}

const CustomModal = ({children, close}: ICustomModal) => {
  return (
    <Dialog close={close}>
      <IoClose className={styles.x_btn} onClick={close} />
      {children}
    </Dialog>
  );
}

export default CustomModal;