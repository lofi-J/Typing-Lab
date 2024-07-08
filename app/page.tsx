import styles from "./page.module.css";
import LandingSection from "@/section/LandingSection/LandingSection";

export default function Page() {
  return (
    <main className={styles.main}>
      <LandingSection />
    </main>
  );
}
