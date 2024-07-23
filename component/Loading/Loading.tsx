import styles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.wrap}>
      <div className={`${styles.ping} ${styles.ping1}`}/>
      <div className={`${styles.ping} ${styles.ping2}`}/>
      <div className={`${styles.ping} ${styles.ping3}`}/>
    </div>
  );
}

export default Loading;