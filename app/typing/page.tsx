import styles from "./page.module.css";
import Playground from "@/component/typing/Playground/Playground";
import GradientCard from "@/component/Card/GradientCard/GradientCard";

export default function Typing() {
  return (
    <main className={styles.main}>
      <GradientCard style={{width: '70%', height: '45%', position: 'relative'}}>
        <Playground typingTarget={'hello world'} />
      </GradientCard>
    </main>
  );
}