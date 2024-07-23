import styles from "./TypingEndModal.module.css";
import CustomModal from "@/component/modal/CustomModal";
import {TTextCounts} from "@/app/typing/page";
import LineChart from "@/component/chart/LineChart";


interface ITypingEndModal {
  close: () => void;
  wpm: number;
  textCounts: TTextCounts;
  time: {minutes: number, seconds: number};
  wpmHistory: number[];
}

const TypingEndModal = ({close, wpm, textCounts, time, wpmHistory}: ITypingEndModal) => {
  console.log(textCounts);
  
  return (
    <CustomModal close={close}>
      <div className={styles.container}>
        <div className={styles.head}>
          <strong className={styles.title}>Typing Lab</strong>
          <span className={styles.sub_title}>Did you enjoy your typing sesstion?</span>
        </div>
        <div className={styles.result}>
          <LineChart wpms={wpmHistory} title={'WPM per Progress'} />
        </div>
      </div>
    </CustomModal>
  );
}

export default TypingEndModal;