import styles from "./page.module.css";
import Playground from "@/component/typing/Playground/Playground";
import GradientCard from "@/component/Card/GradientCard/GradientCard";
import sentence from "@/static/texts/두고가는계절";
import {splitTextByLine} from "@/scripts/splitTextByLine";


export default function Typing() {
  const typingTargetList = splitTextByLine(sentence.contents);
  
  return (
    <main className={styles.main}>
      <GradientCard style={{width: 'var(--playground-width)', height: 'var(--playground-height)', position: 'relative'}}>
        <Playground typingTargetList={typingTargetList} />
      </GradientCard>
    </main>
  );
}