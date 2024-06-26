'use client';

import style from "./page.module.css";
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
    <main className={style.main}>
      <h1 className={style.title}>
        <TextWriterAnimation
          text={'Hava a chill typing experience.'}
          delay={50}
          hasCaret={true}
          setIsDoneForParent={setDone}
        />
      </h1>
      {isDone && (
        <div
          className={style.info}
          onClick={() => router.push('/typing')}
        >
          <p className={style.p}>Press to any key.</p>
        </div>
      )}
    </main>
  );
}
