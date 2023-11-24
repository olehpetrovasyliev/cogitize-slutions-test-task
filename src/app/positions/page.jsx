"use client";
import Image from "next/image";
import styles from "../page.module.scss";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { child, get, ref } from "firebase/database";

export default function PositionsPage() {
  const [positions, setPositions] = useState([]);

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

  return <p>Пожалуйста, выберите должность, которую хотите редактировать</p>;
}
