'use client';

import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import TextWriterAnimation from "@/component/TextWriterAnimation/TextWriterAnimation";


export default function LandingPage() {
  const [isDone, setDone] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleAnyKey = () => {
      router.push('/typing');
    }

    window.addEventListener("keydown", handleAnyKey);

    return () => window.removeEventListener("keydown", handleAnyKey);
  }, [router]);
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <TextWriterAnimation
          text={'Hava a chill typing experience.'}
          delay={50}
          hasCaret={true}
          setIsDoneForParent={setDone}
        />
      </h1>
      {isDone && (
        <div
          className={styles.info}
          onClick={() => router.push('/typing')}
        >
          <p className={styles.p}>Press to any key.</p>
        </div>
      )}
    </main>
  );
}
