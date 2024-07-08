'use client';

import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import TextWriterAnimation from "@/component/TextWriterAnimation/TextWriterAnimation";
import CustomModal from "@/component/modal/CustomModal";


export default function LandingPage() {
  const [isDone, setDone] = useState(false);
  const router = useRouter();
  const [show, setShow] = useState(true);
  
  // useEffect(() => {
  //   const handleAnyKey = () => {
  //     router.push('/typing');
  //   }
  //
  //   window.addEventListener("keydown", handleAnyKey);
  //
  //   return () => window.removeEventListener("keydown", handleAnyKey);
  // }, [router]);
  
  return (
    <main className={styles.main}>
      {show && <CustomModal close={() => setShow(false)}>kjslekfe</CustomModal>}
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
