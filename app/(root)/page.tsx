import TextWriterAnimation from "@/component/TextWriterAnimation";
import style from "./page.module.css";

export default function LandingPage() {
  return (
    <main className={style.main}>
      <h1 className={style.title}>
        <TextWriterAnimation
          text={'Hava a chill typing experience.'}
          delay={50}
          hasCaret={true}
        />
      </h1>
    </main>
  );
}
