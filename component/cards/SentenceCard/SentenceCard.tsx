import styles from "./SentenceCard.module.css";


interface ISentencCard {
  index: number;
  title: string;
  author: string;
  sentence: string;
}

const SentenceCard = ({index, title, author, sentence}: ISentencCard) => {
  
  return (
    <div className={styles.card_wrap}>
      <div className={styles.numbering}>{(index+1) < 10 && 0}{index+1}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.info_wrap}>
        <div className={styles.author}>{author}</div>
        <div className={styles.sentence}>{sentence}</div>
      </div>
    </div>
  );
}

export default SentenceCard;