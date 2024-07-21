import styles from "./WpmDashboard.module.css";
import React from "react";
import {TTextCounts} from "@/app/typing/page";
import LineChart from "@/component/chart/LineChart";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import {calculateAccuracy} from "@/utils/dashboardHelper";
import { TbTargetArrow } from "react-icons/tb";
import { GiKeyboard } from "react-icons/gi";
import IconCountCard from "@/component/cards/IconCountCard/IconCountCard";


interface IWpmDashboard {
  wpmQueue: number[];
  wpm: number;
  textCounts: TTextCounts;
  time: {minutes: number, seconds: number};
}

const WpmDashboard = ({wpmQueue, wpm, time, textCounts}: IWpmDashboard) => {
  
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
              <span>{time.minutes}m</span>
              <span style={{paddingLeft: '0.5rem'}}>{time.seconds}s</span>
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