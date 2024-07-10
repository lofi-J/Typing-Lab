'use client';

import styles from "./page.module.css";
import {useState} from "react";
import Playground from "@/component/typing/Playground/Playground";
import {splitTextByLine} from "@/utils/splitTextByLine";
import default_article from "@/static/texts/default_article";
import sentence from "@/static/texts/static_kr_01";
import WpmDashboard from "@/component/dashboard/WpmDashboard/WpmDashboard";
import useSetStartTime from "@/hooks/useSetStartTime";


export type TTextCounts = {
  totalCount: number;
  wrongCount: number;
}

export default function Typing() {
  const [targetList, setTargetList] = useState(splitTextByLine(sentence.contents, 80, sentence.lang));
  const [textCounts, setTextCounts] = useState<TTextCounts>({totalCount: 0, wrongCount:0});
  const {totalCount, wrongCount} = textCounts;
  const startTime = useSetStartTime(totalCount);
  
  
  return (
    <main className={styles.main}>
      <WpmDashboard textCounts={textCounts} startTime={startTime} />
      <Playground
        targetList={targetList || splitTextByLine(default_article.contents, 80, sentence.lang)}
        setTextCounts={setTextCounts}
      />
    </main>
  );
}