import styles from "./WpmDashboard.module.css";
import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import {TTextCounts} from "@/app/typing/page";
import useElapsedTimer from "@/hooks/useElapsedTimer";
import useCalcWPM from "@/hooks/useCalcWPM";
import LineChart from "@/component/chart/LineChart";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import {converMsToMinSec, calculateAccuracy} from "@/utils/dashboardHelper";
import { TbTargetArrow } from "react-icons/tb";
import { GiKeyboard } from "react-icons/gi";
import IconCountCard from "@/component/cards/IconCountCard/IconCountCard";


interface IWpmDashboard {
  startTime?: moment.Moment;
  textCounts: TTextCounts;
}

const WpmDashboard = ({textCounts, startTime}: IWpmDashboard) => {
  const {elapsed, flagTick} = useElapsedTimer(startTime); // ms
  const wpm = useCalcWPM(textCounts.totalCount, elapsed, flagTick);
  const [wpmQueue, setWpmQueue] = useState<number[]>([]);
  const {minutes, seconds} = converMsToMinSec(elapsed);
  
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
      <div className={styles.chart}>
        <LineChart wpms={wpmQueue} />
      </div>
      <div className={styles.dashboard}>
        <IconCountCard
          icon={IoSpeedometerOutline}
          title={'WPM'}
          value={wpm}
        />
        <IconCountCard
          icon={GoClock}
          title={'시간'}
          value={(
            <>
              <span>{minutes}m</span>
              <span style={{paddingLeft: '0.5rem'}}>{seconds}s</span>
            </>
          )}
        />
        <IconCountCard
          icon={TbTargetArrow}
          title={'정확도'}
          value={calculateAccuracy(textCounts.totalCount, textCounts.wrongCount)}
          unit={'%'}
        />
        <IconCountCard
          icon={GiKeyboard}
          title={'총 타이핑'}
          value={textCounts.totalCount}
          unit={'회'}
        />
      </div>
    </div>
  );
}

export default WpmDashboard;