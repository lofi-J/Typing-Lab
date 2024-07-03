'use client';

import styles from "./page.module.css";
import {useState} from "react";
import Playground from "@/component/typing/Playground/Playground";
import GradientCard from "@/component/Card/GradientCard/GradientCard";
import {splitTextByLine} from "@/utils/splitTextByLine";
import default_article from "@/static/texts/default_article";
// import sentence from "@/static/texts/static_kr_01";
import sentence from "@/static/texts/static_en_01";


const PLAYGROUND_WIDTH = 80;

export default function Typing() {
  const [targetList, setTargetList] = useState(splitTextByLine(sentence.contents, PLAYGROUND_WIDTH, sentence.lang));
  const [lang, setLang] = useState(sentence.lang);


  return (
    <main className={styles.main}>
      <GradientCard style={{width: `${PLAYGROUND_WIDTH}rem`, position: 'relative'}}>
        <Playground 
          targetList={targetList || splitTextByLine(default_article.contents, PLAYGROUND_WIDTH, sentence.lang)}
          langType={lang || default_article.lang} 
        />
      </GradientCard>
    </main>
  );
}