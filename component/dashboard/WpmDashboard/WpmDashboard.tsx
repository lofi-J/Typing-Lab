import styles from "./WpmDashboard.module.css";
import React, {useEffect, useState} from "react";
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
  const [wpmQueue, setWpmQueue] = useState<number[]>([]);
  const [timeQueue, setTimeQueue] = useState<number[]>([]);
  
  /*
  * data가 number라면 wpmQueue를 set
  * data가 string이라면 timeQueue를 set
  * */
  const setQueue = (data: number | string) => {
    const result = data;
    if (typeof data === 'number') {
    
    } else {
    
    }
  }
  
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
  
  return (
    <div className={styles.container}>
      <div className={styles.test}>
        <LineChart wpms={wpmQueue} times={[]} />
      </div>
    </div>
  );
}

export default WpmDashboard;