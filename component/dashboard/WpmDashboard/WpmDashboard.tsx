import styles from "./WpmDashboard.module.css";
import React from "react";
import {TTextCounts} from "@/app/typing/page";
import LineChart from "@/component/chart/LineChart";
import {calculateAccuracy} from "@/utils/dashboardHelper";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { TbTargetArrow } from "react-icons/tb";
import { GiKeyboard } from "react-icons/gi";
import IconCountCard from "@/component/cards/IconCountCard/IconCountCard";
import {realTimeChartOption} from "@/utils/chartHelper";


interface IWpmDashboard {
  wpmQueue: number[];
  wpm: number;
  textCounts: TTextCounts;
  time: {minutes: number, seconds: number};
  progress: number;
}

const WpmDashboard = ({wpmQueue, wpm, time, textCounts, progress}: IWpmDashboard) => {
  
  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <LineChart wpms={wpmQueue} title={'WPM(word per minutes)'} customOptions={realTimeChartOption} />
      </div>
      <div className={styles.dashboard}>
        <IconCountCard
          icon={IoSpeedometerOutline}
          title={'WPM'}
          value={wpm}
        />
        <IconCountCard
          icon={GoClock}
          title={'TIME'}
          value={(
            <>
              <span>{time.minutes}m</span>
              <span style={{paddingLeft: '0.5rem'}}>{time.seconds}s</span>
            </>
          )}
        />
        <IconCountCard
          icon={TbTargetArrow}
          title={'ACC'}
          value={calculateAccuracy(textCounts.totalCount, textCounts.wrongCount)}
          unit={'%'}
        />
        <IconCountCard
          icon={GiKeyboard}
          title={'Progress'}
          value={Math.round(progress)}
          unit={'%'}
        />
      </div>
    </div>
  );
}

export default WpmDashboard;