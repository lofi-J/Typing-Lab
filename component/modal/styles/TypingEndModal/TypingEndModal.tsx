import styles from "./TypingEndModal.module.css";
import CustomModal from "@/component/modal/CustomModal";
import {TTextCounts} from "@/app/typing/page";
import LineChart from "@/component/chart/LineChart";
import {clearChartOption} from "@/utils/chartHelper";


interface ITypingEndModal {
  close: () => void;
  wpm: number;
  textCounts: TTextCounts;
  time: {minutes: number, seconds: number};
  wpmHistory: number[];
}

const TypingEndModal = ({close, wpm, textCounts, time, wpmHistory}: ITypingEndModal) => {
  
  
  return (
    <CustomModal close={close}>
      <div className={styles.container}>
        <div className={styles.head}>
          <strong className={styles.title}>Typing Lab</strong>
          <span className={styles.sub_title}>Did you enjoy your typing sesstion?</span>
        </div>
        <div className={styles.result}>
          <div className={styles.data_wrap}>
          
          </div>
          <div className={styles.chart}>
            <div className={styles.chart_title}>WPM per Progress</div>
            <LineChart
              wpms={wpmHistory}
              customOptions={clearChartOption}
              Xtitle={'Progress'}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
}

export default TypingEndModal;