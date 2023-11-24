import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Пожалуйста, выберите вкладку, которой хотите воспользоваться</p>
    </main>
  );
}
