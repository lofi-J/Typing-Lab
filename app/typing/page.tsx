import styles from "./page.module.css";
import Playground from "@/component/typing/Playground/Playground";
import GradientCard from "@/component/Card/GradientCard/GradientCard";
import sentence from "@/static/texts/두고가는계절";
// import sentence from "@/static/texts/ENdummy";
import {splitTextByLine} from "@/utils/splitTextByLine";


export default function Typing() {
  const targetList = splitTextByLine(sentence.contents);
  
  return (
    <main className={styles.main}>
      <GradientCard style={{width: 'var(--playground-width)', position: 'relative'}}>
        <Playground targetList={targetList} />
      </GradientCard>
    </main>
  );
}