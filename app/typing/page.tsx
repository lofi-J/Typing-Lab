import style from "./page.module.css";
import Playground from "@/component/typing/Playground/Playground";

export default function Typing() {
  return (
    <main className={style.main}>
      <div className={style.container}>
        {/* temporary */}
        <Playground typingTarget={'hello world'} />
      </div>
    </main>
  );
}