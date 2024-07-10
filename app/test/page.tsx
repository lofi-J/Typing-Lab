import styles from "./test.module.css";
import Keyboard from "@/component/Keyboard/Keyboard";

export default function Test() {
  return (
    <main>
      <div className={styles.test}>
        <Keyboard />
      </div>
    </main>
  );
}