import styles from "./TypingEndModal.module.css";
import CustomModal from "@/component/modal/CustomModal";


interface ITypingEndModal {
  close: () => void;
}

const TypingEndModal = ({close}: ITypingEndModal) => {
  
  return (
    <CustomModal close={close}>
      <div className={styles.head}>
        <strong>Typing Lab</strong>
      </div>
      <div className={styles.result}>
      
      </div>
    </CustomModal>
  );
}

export default TypingEndModal;