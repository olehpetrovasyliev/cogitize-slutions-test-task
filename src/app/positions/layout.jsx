"use client";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { onValue, ref } from "firebase/database";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../page.module.scss";
import Dragable from "../../../public/vector/dragable";

const PositionItem = ({ pos, index, pathname, movePosition }) => {
  const isActive = pathname.startsWith(`/positions/${pos.id}`);

  const [{ isDragging }, drag] = useDrag({
    type: "POSITION",
    item: { id: pos.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "POSITION",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        movePosition(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <li>
        <Link
          href={`/positions/${pos.id}`}
          className={
            isActive ? `${styles.position} ${styles.active}` : styles.position
          }
        >
          <div className={styles.positionMainInfoWrapper}>
            <Dragable />
            <div>
              <h2 className={styles.positionName}>{pos.position}</h2>
              <h3 className={styles.tasksNum}>
                {pos.tasks > 0 ? `${pos.tasks} заданий` : "от 10 lvl"}
              </h3>
            </div>
          </div>
          <p className={styles.price}>
            {"$" + pos.price}
            <span>/час</span>
          </p>
        </Link>
      </li>
    </div>
  );
};

export default function PositionsLayout({ children }) {
  const [positions, setPositions] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const positionsRef = ref(db, "positions");

    const unsubscribe = onValue(positionsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const positionsArray = Object.values(data);
        setPositions(positionsArray);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const movePosition = (fromIndex, toIndex) => {
    const updatedPositions = [...positions];
    const [movedPosition] = updatedPositions.splice(fromIndex, 1);
    updatedPositions.splice(toIndex, 0, movedPosition);
    setPositions(updatedPositions);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <aside className={styles.grid}>
          <ul className={styles.positionsList}>
            {positions.map((pos, index) => (
              <PositionItem
                key={pos.id}
                pos={pos}
                index={index}
                pathname={pathname}
                movePosition={movePosition}
              />
            ))}
          </ul>
          <button className={styles.addBtn}>
            <Link href="/positions/addNew">Создать новую должность</Link>
          </button>
        </aside>
        {children}
      </main>
    </DndProvider>
  );
}
