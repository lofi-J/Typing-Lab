'use client';

import styles from "./page.module.css";
import {useEffect, useState} from "react";
import WpmDashboard from "@/component/dashboard/WpmDashboard/WpmDashboard";
import Playground from "@/component/typing/Playground/Playground";
import Keyboard from "@/component/Keyboard/Keyboard";
import {splitTextByLine} from "@/utils/splitTextByLine";
import useSetStartTime from "@/hooks/useSetStartTime";
import default_article from "@/static/texts/default_article";
import sentence from "@/static/texts/static_kr_01";


export type TTextCounts = {
  totalCount: number;
  wrongCount: number;
}

export default function Typing() {
  const [targetList, setTargetList] = useState<string[]>();
  const [textCounts, setTextCounts] = useState<TTextCounts>({totalCount: 0, wrongCount:0});
  const startTime = useSetStartTime(textCounts.totalCount);

  useEffect(() => {
    setTargetList(splitTextByLine(sentence.contents, 76, sentence.lang));
  }, [])
  
  
  return (
    <main className={styles.main}>
      <WpmDashboard textCounts={textCounts} startTime={startTime} />
      <Playground
        targetList={targetList || splitTextByLine(default_article.contents, 80, sentence.lang)}
        setTextCounts={setTextCounts}
      />
      <Keyboard />
    </main>
  );
}