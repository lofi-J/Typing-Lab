import styles from "./WpmDashboard.module.css";
import React from "react";
import moment from "moment/moment";
import {TTextCounts} from "@/app/typing/page";
import useElapsedTimer from "@/hooks/useElapsedTimer";
import useCalcWPM from "@/hooks/useCalcWPM";
import LineChart from "@/component/chart/LineChart";


interface IWpmDashboard {
  startTime?: moment.Moment;
  textCounts: TTextCounts;
}

const WpmDashboard = ({textCounts, startTime}: IWpmDashboard) => {
  const {elapsed, flagTick} = useElapsedTimer(startTime);
  const wpm = useCalcWPM(textCounts.totalCount, elapsed, flagTick);
  
  return (
    <div className={styles.container}>
      <div className={styles.test}>
        <LineChart wpms={[]} />
      </div>
    </div>
  );
}

export default WpmDashboard;