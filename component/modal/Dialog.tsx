import {ReactNode} from "react";
import ModalPortal from "@/component/modal/ModalPortal";
import styles from "./styles/Dialog.module.css";
import useCloseModal from "@/hooks/useCloseModal";

const Dialog = ({children, close}: {children: ReactNode, close: () => void}) => {
  const dialogRef = useCloseModal(close);
  
  return (
    <ModalPortal>
      <div className={styles.dialog}>
        <div className={styles.modal} ref={dialogRef}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}

export default Dialog;