'use client';

import styles from "./page.module.css";
import {useEffect, useRef, useState} from "react";
import {splitTextByLine} from "@/utils/splitTextByLine";
import useSetStartTime from "@/hooks/useSetStartTime";
import WpmDashboard from "@/component/dashboard/WpmDashboard/WpmDashboard";
import Playground from "@/component/typing/Playground/Playground";
import Keyboard from "@/component/Keyboard/Keyboard";
import TypingEndModal from "@/component/modal/TypingEndModal/TypingEndModal";
import useElapsedTimer from "@/hooks/useElapsedTimer";
import useCalcWPM from "@/hooks/useCalcWPM";
import {calculateProgress, converMsToMinSec} from "@/utils/dashboardHelper";
import {makeArray} from "@/utils/extension/arrayHelper";
import Loading from "@/component/Loading/Loading";
import LocalStorage from "@/utils/LocalStorage";
import default_article from "../../static/sentences/default_article";
import { IoIosSettings } from "react-icons/io";
import SettingSidebar from "@/component/sidebar/SettingSidebar";


export type TTextCounts = {
  totalCount: number;
  wrongCount: number;
}

export default function Typing() {
  // input
  const inputRef = useRef<HTMLInputElement>(null);
  // data
  const sentence = LocalStorage.getItem("sentence");
  const [targetList, setTargetList] = useState<string[]>();
  const [totalUserText, setTotalUserTexts] = useState<string[]>();
  const [textCounts, setTextCounts] = useState<TTextCounts>({totalCount: 0, wrongCount: 0});
  const startTime = useSetStartTime(textCounts.totalCount);
  const [totalTargetListLength, setTotalTargetListLength] = useState(0);
  const [wpmQueue, setWpmQueue] = useState<number[]>([]);
  // modal
  const [isEnd, setIsEnd] = useState(false);
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  // calculate data
  const {elapsed, flagTick} = useElapsedTimer(startTime, isEnd); // ms
  const wpm = useCalcWPM(textCounts.totalCount, elapsed, flagTick);
  const {minutes, seconds} = converMsToMinSec(elapsed);
  const [progress, setProgress] = useState(0);
  const wpmHistory = useRef<number[]>([]);
  const prevProgressRef = useRef(0);
  
  const closeEndModal = () => setIsEnd(false);
  
  
  // useEffect
  useEffect(() => { // init
    let sentenceObj;
    if (!sentence) {
      sentenceObj = default_article;
    } else {
      sentenceObj = JSON.parse(sentence);
    }
    const result = splitTextByLine(sentenceObj.sentence, 80, sentenceObj.lang);
    setTargetList(result); // 타이핑 해야할 라인들 string[]
    setTotalUserTexts(makeArray(result.length, '')); // 유저가 타이핑 한 라인들 string[]
    setTotalTargetListLength(result.reduce((acc, cur) => acc + cur.length, 0)); // 타이핑해야할 총 텍스트 개수
  }, [sentence])
  
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
    if (progress <= 0) return;
    if (progress > prevProgressRef.current) {
      const increaseCount = progress - prevProgressRef.current;
      for (let i=0; i<increaseCount; i++) {
        wpmHistory.current.push(wpm);
      }
    } else if (progress <= prevProgressRef.current) {
      wpmHistory.current = wpmHistory.current.slice(0, progress);
    }
    prevProgressRef.current = progress;
  }, [progress]);
  
  
  // Loading
  if (targetList === undefined || totalUserText === undefined) {
    return <Loading />
  }
  
  return (
    <main className={styles.main}>
      {isEnd && <TypingEndModal close={closeEndModal} wpm={wpm} textCounts={textCounts} time={{minutes, seconds}} wpmHistory={wpmHistory.current} inputRef={inputRef} />}
      
      <WpmDashboard textCounts={textCounts} wpm={wpm} wpmQueue={wpmQueue} time={{minutes, seconds}} progress={progress} />
      <Playground
        targetList={targetList}
        setTextCounts={setTextCounts}
        totalUserText={totalUserText}
        setTotalUserTexts={setTotalUserTexts}
        isEnd={isEnd}
        setIsEnd={setIsEnd}
        inputRef={inputRef}
      />
      <Keyboard isActive={!isEnd} />
      {/* sidebar */}
      {isShowSidebar ?
        <SettingSidebar
          close={() => setIsShowSidebar(false)}
        /> :
        <div className={styles.settings} onClick={() => setIsShowSidebar(true)}>{<IoIosSettings size={15}/>}</div>
      }
    </main>
  );
}