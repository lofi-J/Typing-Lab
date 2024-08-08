"use client";

import styles from "./page.module.css";
import SentenceCard from "@/component/cards/SentenceCard/SentenceCard";
import React, {useEffect, useState} from "react";
import {indexToKey} from "@/utils/playgroundHelper";
import SelectBox from "@/component/select/SelectBox/SelectBox";
import {BiTransferAlt} from "react-icons/bi";
import classicLiterature from "../../static/sentences/classicLiterature.json";
import computerScience from "../../static/sentences/computerScience.json";
import fairyTales from "../../static/sentences/fairyTales.json";


type TSentence = 'classicLiterature' | 'computerScience' | 'fairyTales';
interface ISentence {
  "title": string;
  "title_ko": string;
  "sentence": string;
  "sentence_ko": string;
  "author": string;
}

export default function SentencesPage() {
  const [datas, setDatas] = useState<ISentence[]>(classicLiterature);
  const [type, setType] = useState<TSentence>('classicLiterature');
  const [isKorean, setIsKorean] = useState(true);
  
  const options = [
    {value: "classicLiterature", label: "Classic Literature"},
    {value: "computerScience", label: "Computer Science"},
    {value: "fairyTales", label: "Fairy tales"}
  ]

  const switchSentenceType = () => {
    switch (type) {
      case "classicLiterature":
        setDatas(classicLiterature);
        return;
      case "computerScience":
        setDatas(computerScience);
        return;
      case "fairyTales":
        setDatas(fairyTales);
        return;
    }
  }
  
  useEffect(() => {
    switchSentenceType();
  }, [type])
  
  return (
    <main>
      <section className={styles.container}>
        <h1 className={styles.title}>Choose a sentence to practice typing</h1>
        <div className={styles.select_wrap}>
          <SelectBox options={options} setter={setType} />
          <div className={styles.toggle_lang} onClick={() => setIsKorean(prev => !prev)}>
            <span className={isKorean ? styles.lang : styles.active}>EN</span>
            <BiTransferAlt size={20}/>
            <span className={isKorean ? styles.active : styles.lang}>KO</span>
          </div>
        </div>
        <div className={styles.contents}>
          {datas.map((data, index) => (
            <SentenceCard
              key={indexToKey(data.title, index)}
              index={index}
              lang={isKorean ? 'ko' : 'en'}
              title={isKorean ? data.title_ko : data.title}
              author={data.author}
              sentence={isKorean ? data.sentence_ko : data.sentence}
            />
          ))}
        </div>
      </section>
    </main>
  );
}