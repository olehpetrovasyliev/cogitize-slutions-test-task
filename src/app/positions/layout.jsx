"use client";
import Image from "next/image";
import styles from "../page.module.scss";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { child, get, ref } from "firebase/database";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PositionsLayout({ children }) {
  const [positions, setPositions] = useState([]);
  const pathname = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      const positionsRef = ref(db);

      try {
        const snapshot = await get(child(positionsRef, "positions"));
        const data = snapshot.val();

        if (data) {
          const positionsArray = Object.values(data);
          setPositions((prev) => [...prev, ...positionsArray]);
        }
      } catch (error) {
        console.error("Error fetching data from Realtime Database: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <aside className={styles.grid}>
        <ul className={styles.positionsList}>
          {positions.map((pos) => {
            const isActive = pathname.startsWith(`/positions/${pos.id}`);
            return (
              <li>
                <Link
                  href={`/positions/${pos.id}`}
                  className={
                    isActive
                      ? `${styles.position} ${styles.active}`
                      : styles.position
                  }
                >
                  <div>
                    <h2 className={styles.positionName}>{pos.position}</h2>
                    <h3 className={styles.tasksNum}>
                      {pos.tasks > 0 ? pos.tasks + "заданий" : "от 10 lvl"}
                    </h3>
                  </div>
                  <p className={styles.price}>
                    {"$" + pos.price}
                    <span>/час</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
        <button className={styles.addBtn}>
          <Link href="/positions/addNew">Создать новую должность</Link>
        </button>
      </aside>
      {children}
    </main>
  );
}
