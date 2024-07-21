'use client';

import styles from "./page.module.css";
import {useEffect, useState} from "react";
import sentence from "@/static/texts/static_kr_01";
import {splitTextByLine} from "@/utils/splitTextByLine";
import useSetStartTime from "@/hooks/useSetStartTime";
import default_article from "@/static/texts/default_article";
import WpmDashboard from "@/component/dashboard/WpmDashboard/WpmDashboard";
import Playground from "@/component/typing/Playground/Playground";
import Keyboard from "@/component/Keyboard/Keyboard";
import TypingEndModal from "@/component/modal/styles/TypingEndModal/TypingEndModal";
import useElapsedTimer from "@/hooks/useElapsedTimer";
import useCalcWPM from "@/hooks/useCalcWPM";
import {converMsToMinSec} from "@/utils/dashboardHelper";


export type TTextCounts = {
  totalCount: number;
  wrongCount: number;
}

export default function Typing() {
  const [targetList, setTargetList] = useState<string[]>();
  const [textCounts, setTextCounts] = useState<TTextCounts>({totalCount: 0, wrongCount:0});
  const startTime = useSetStartTime(textCounts.totalCount);
  // calculate data
  const [wpmQueue, setWpmQueue] = useState<number[]>([]);
  const {elapsed, flagTick} = useElapsedTimer(startTime); // ms
  const wpm = useCalcWPM(textCounts.totalCount, elapsed, flagTick);
  const {minutes, seconds} = converMsToMinSec(elapsed);
  // modal
  const [isEnd, setIsEnd] = useState(true); // FIXME default: false
  const close = () => setIsEnd(false);
  
  useEffect(() => {
    setTargetList(splitTextByLine(sentence.contents, 76, sentence.lang));
  }, [])
  
  useEffect(() => {
    setWpmQueue(prev => {
      if (prev.length >= 10) {
        const arr = prev.slice(1);
        return [...arr, wpm];
      } else {
        return [...prev, wpm];
      }
    });
  }, [wpm])
  
  
  return (
    <main className={styles.main}>
      {isEnd && <TypingEndModal close={close} />}
      <WpmDashboard textCounts={textCounts} wpm={wpm} wpmQueue={wpmQueue} time={{minutes, seconds}} />
      <Playground
        targetList={targetList || splitTextByLine(default_article.contents, 80, sentence.lang)}
        setTextCounts={setTextCounts}
      />
      <Keyboard isActive={!isEnd} />
    </main>
  );
}