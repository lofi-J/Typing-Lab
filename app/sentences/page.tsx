"use client";

import styles from "./page.module.css";
import SentenceCard from "@/component/cards/SentenceCard/SentenceCard";
import React, {useState} from "react";
import {indexToKey} from "@/utils/playgroundHelper";
import SelectBox from "@/component/select/SelectBox/SelectBox";
import classicLiterature from "../../static/sentences/classicLiterature.json";



type TSentence = 'classicLiterature' | 'computerScience' | 'fairyTales';

export default function SentencesPage() {
  const [datas, setDatas] = useState(classicLiterature);
  const [type, setType] = useState<TSentence>('classicLiterature');
  
  
  const options = [
    {value: "classicLiterature", label: "Classic Literature"},
    {value: "computerScience", label: "Computer Science"},
    {value: "fairyTales", label: "Fairy tales"}
  ]
  
  
  return (
    <main>
      <section className={styles.container}>
        <h1 className={styles.title}>Choose a sentence to practice typing</h1>
        <div className={styles.select_wrap}>
          <SelectBox options={options} setter={setType} />
        </div>
        <div className={styles.contents}>
          {datas.map((data, index) => (
            <SentenceCard
              key={indexToKey(data.title, index)}
              index={index}
              title={data.title}
              author={data.author}
              sentence={data.sentence}
            />
          ))}
        </div>
      </section>
    </main>
  );
}