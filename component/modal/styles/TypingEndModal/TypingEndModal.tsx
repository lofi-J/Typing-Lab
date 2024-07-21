import styles from "./TypingEndModal.module.css";
import CustomModal from "@/component/modal/CustomModal";
import {TTextCounts} from "@/app/typing/page";


interface ITypingEndModal {
  close: () => void;
  wpm: number;
  textCounts: TTextCounts;
  time: {minutes: number, seconds: number};
}

const TypingEndModal = ({close, wpm, textCounts, time}: ITypingEndModal) => {
  
  return (
    <CustomModal close={close}>
      <div className={styles.container}>
        <div className={styles.head}>
          <strong className={styles.title}>Typing Lab</strong>
          <span className={styles.sub_title}>Did you enjoy your typing sesstion?</span>
        </div>
        <div className={styles.result}>
        
        </div>
      </div>
    </CustomModal>
  );
}

export default TypingEndModal;