'use client';

import styles from "./page.module.css";
import {useState} from "react";
import Playground from "@/component/typing/Playground/Playground";
import PlaygroundWrapper from "@/section/PlaygroundWrapper/PlaygroundWrapper";
import {splitTextByLine} from "@/utils/splitTextByLine";
import default_article from "@/static/texts/default_article";
import sentence from "@/static/texts/static_kr_01";
import WpmDashboard from "@/component/dashboard/WpmDashboard/WpmDashboard";
import useSetStartTime from "@/hooks/useSetStartTime";


export type TTextCounts = {
  totalCount: number;
  wrongCount: number;
}

const PLAYGROUND_WIDTH = 80;

export default function Typing() {
  const [targetList, setTargetList] = useState(splitTextByLine(sentence.contents, PLAYGROUND_WIDTH, sentence.lang));
  const [textCounts, setTextCounts] = useState<TTextCounts>({totalCount: 0, wrongCount:0});
  const {totalCount, wrongCount} = textCounts;
  const startTime = useSetStartTime(totalCount);
  
  
  return (
    <main className={styles.main}>
      <WpmDashboard textCounts={textCounts} startTime={startTime} />
      <PlaygroundWrapper style={{width: `${PLAYGROUND_WIDTH}rem`, position: 'relative'}}>
        <Playground
          targetList={targetList || splitTextByLine(default_article.contents, PLAYGROUND_WIDTH, sentence.lang)}
          setTextCounts={setTextCounts}
        />
      </PlaygroundWrapper>
    </main>
  );
}