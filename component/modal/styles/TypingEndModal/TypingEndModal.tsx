import styles from "./TypingEndModal.module.css";
import {CSSProperties} from "react";
import {TTextCounts} from "@/app/typing/page";
import {cleanChartOption} from "@/utils/chartHelper";
import CustomModal from "@/component/modal/CustomModal";
import LineChart from "@/component/chart/LineChart";
import RoundCard from "@/component/cards/RoundCard/RoundCard";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { TbTargetArrow } from "react-icons/tb";
import {calculateAccuracy} from "@/utils/dashboardHelper";
import {getCSSVariable} from "@/utils/getCSSVariable";


interface ITypingEndModal {
  close: () => void;
  wpm: number;
  textCounts: TTextCounts;
  time: {minutes: number, seconds: number};
  wpmHistory: number[];
}


const stroke: CSSProperties = {
  stroke: getCSSVariable('--background-color'),
}
const inlineStyle: CSSProperties = {
  stroke: stroke.stroke,
  fill: getCSSVariable('--background-color'),
};

const TypingEndModal = ({close, wpm, textCounts, time, wpmHistory}: ITypingEndModal) => {1
  
  return (
    <CustomModal close={close}>
      <div className={styles.container}>
        <div className={styles.head}>
          <strong className={styles.title}>Typing Lab</strong>
          <span className={styles.sub_title}>Did you enjoy your typing sesstion?</span>
        </div>
        <div className={styles.result}>
          <div className={styles.data_wrap}>
            <RoundCard
              title={'WPM'}
              icon={IoSpeedometerOutline}
              value={wpm}
              style={inlineStyle}
            />
            <RoundCard
              title={'TIME'}
              icon={GoClock}
              value={
                <>
                  {time.minutes}<span>m</span>
                  {time.seconds}<span>s</span>
                </>
              }
              style={inlineStyle}
            />
            <RoundCard
              title={'ACC'}
              icon={TbTargetArrow}
              value={calculateAccuracy(textCounts.totalCount, textCounts.wrongCount)}
              style={stroke}
            />
          </div>
          <div className={styles.chart}>
            <div className={styles.chart_inner}>
              <div className={styles.chart_title}>WPM per Progress</div>
              <LineChart
                wpms={wpmHistory}
                customOptions={cleanChartOption}
                chartOptions={{borderWidth: 1}}
                Xtitle={'Progress'}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default TypingEndModal;