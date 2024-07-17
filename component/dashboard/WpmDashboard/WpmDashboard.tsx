import styles from "./WpmDashboard.module.css";
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import {TTextCounts} from "@/app/typing/page";
import useElapsedTimer from "@/hooks/useElapsedTimer";
import useCalcWPM from "@/hooks/useCalcWPM";
import LineChart from "@/component/chart/LineChart";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";


interface IWpmDashboard {
  startTime?: moment.Moment;
  textCounts: TTextCounts;
}

const WpmDashboard = ({textCounts, startTime}: IWpmDashboard) => {
  const {elapsed, flagTick} = useElapsedTimer(startTime); // ms
  const wpm = useCalcWPM(textCounts.totalCount, elapsed, flagTick);
  const [wpmQueue, setWpmQueue] = useState<number[]>([]);
  
  useEffect(() => {
    setWpmQueue(prev => {
      if (prev.length >= 10) {
        const arr = prev.slice(1);
        return [...arr, wpm];
      } else {
        return [...prev, wpm]
      }
    });
  }, [wpm])
  
  
  // TODO 정확도, 총 타자 수 등 ...
  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <LineChart wpms={wpmQueue} />
      </div>
      <div className={styles.vital}>
        <div className={styles.wpm}>
          <IoSpeedometerOutline />
          <span>{wpm}</span>
        </div>
        <div>
          <GoClock />
          <span>{elapsed}</span>
        </div>
      </div>
    </div>
  );
}

export default WpmDashboard;