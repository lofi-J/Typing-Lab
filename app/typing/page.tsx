'use client';

import styles from "./page.module.css";
import {useEffect, useState} from "react";
import sentence from "@/static/texts/static_kr_01";
import {splitTextByLine} from "@/utils/splitTextByLine";
import useSetStartTime from "@/hooks/useSetStartTime";
import WpmDashboard from "@/component/dashboard/WpmDashboard/WpmDashboard";
import Playground from "@/component/typing/Playground/Playground";
import Keyboard from "@/component/Keyboard/Keyboard";
import TypingEndModal from "@/component/modal/styles/TypingEndModal/TypingEndModal";
import useElapsedTimer from "@/hooks/useElapsedTimer";
import useCalcWPM from "@/hooks/useCalcWPM";
import {calculateProgress, converMsToMinSec} from "@/utils/dashboardHelper";
import {makeArray} from "@/utils/extension/arrayHelper";
import Loading from "@/component/Loading/Loading";


export type TTextCounts = {
  totalCount: number;
  wrongCount: number;
}

export default function Typing() {
  const [targetList, setTargetList] = useState<string[]>();
  const [totalUserText, setTotalUserTexts] = useState<string[]>();
  const [textCounts, setTextCounts] = useState<TTextCounts>({totalCount: 0, wrongCount:0});
  const startTime = useSetStartTime(textCounts.totalCount);
  const [totalTargetListLength, setTotalTargetListLength] = useState(0);
  const [wpmQueue, setWpmQueue] = useState<number[]>([]);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  // calculate data
  const {elapsed, flagTick} = useElapsedTimer(startTime); // ms
  const wpm = useCalcWPM(textCounts.totalCount, elapsed, flagTick);
  const {minutes, seconds} = converMsToMinSec(elapsed);
  const [progress, setProgress] = useState(0);
  // modal
  const [isEnd, setIsEnd] = useState(false);
  const close = () => setIsEnd(false);
  
  
  useEffect(() => { // init
    const result = splitTextByLine(sentence.contents, 76, sentence.lang);
    setTargetList(result); // 타이핑 해야할 라인들 string[]
    setTotalUserTexts(makeArray(result.length, '')); // 유저가 타이핑 한 라인들 string[]
    setTotalTargetListLength(result.reduce((acc, cur) => acc + cur.length, 0)); // 타이핑해야할 총 텍스트 개수
  }, [])
  
  useEffect(() => { // update
    if (!totalUserText) return;
    
    const inputCount = totalUserText.reduce((acc, cur: string) => {return acc + cur.length}, 0);
    const progress = calculateProgress(totalTargetListLength, inputCount); // targetList가 아직 초기화 되지 않았을 경우 undefined가 될 수 있음
    setProgress(progress || 0); // progress undefined인 경우 진행도 0
  }, [totalUserText]);
  
  useEffect(() => { // update
    setWpmQueue(prev => {
      if (prev.length >= 10) {
        const arr = prev.slice(1);
        return [...arr, wpm];
      } else {
        return [...prev, wpm];
      }
    });
  }, [wpm])
  
  useEffect(() => { // wpmHistory
    setWpmHistory(prev => [...prev, wpm]);
  }, [progress]);
  
  
  // Loading
  if (targetList === undefined) {
    return <Loading />
  }
  
  return (
    <main className={styles.main}>
      {isEnd && <TypingEndModal close={close} wpm={wpm} textCounts={textCounts} time={{minutes, seconds}} wpmHistory={wpmHistory} />}
      <WpmDashboard textCounts={textCounts} wpm={wpm} wpmQueue={wpmQueue} time={{minutes, seconds}} progress={progress} />
      <Playground
        targetList={targetList}
        setTextCounts={setTextCounts}
        totalUserText={totalUserText}
        setTotalUserTexts={setTotalUserTexts}
        setIsEnd={setIsEnd}
      />
      <Keyboard isActive={!isEnd} />
    </main>
  );
}