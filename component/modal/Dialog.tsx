import {ReactNode} from "react";
import ModalPortal from "@/component/modal/ModalPortal";
import styles from "./styles/Dialog.module.css";
import useCloseOutside from "@/hooks/useCloseOutside";

const Dialog = ({children, close}: {children: ReactNode, close: () => void}) => {
  const dialogRef = useCloseOutside(close);
  
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