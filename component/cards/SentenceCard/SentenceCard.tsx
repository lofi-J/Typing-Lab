import styles from "./SentenceCard.module.css";
import LocalStorage from "@/utils/LocalStorage";
import Link from "next/link";
import {TLang} from "@/static/sentences/default_article";


interface ISentencCard {
  index: number;
  lang: TLang;
  title: string;
  author: string;
  sentence: string;
}

const SentenceCard = ({index, lang, title, author, sentence}: ISentencCard) => {
  const data = {
    title: title,
    author: author,
    sentence: sentence,
    lang: lang
  }
  
  const onClick = () => {
    LocalStorage.setItem("sentence", JSON.stringify(data));
  }
  
  return (
    <div className={styles.card_wrap}>
      <div className={styles.numbering}>{(index + 1) < 10 && 0}{index + 1}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.info_wrap}>
        <div className={`${styles.author} author`}>{author}</div>
        <div className={styles.sentence}>{sentence}</div>
      </div>
      <Link href={'/typing'} className={styles.apply_btn} onClick={onClick}>Start Typing</Link>
    </div>
  );
}

export default SentenceCard;