"use client";
import React, { useEffect, useState } from "react";
import styles from "../form.module.scss";
import { get, ref, update } from "firebase/database";
import { db } from "../../../../firebase";
import { validationSchema } from "../../../../validationSchema/schema";
import { ErrorMessage, Field, Form, Formik } from "formik";

const PositionDetailsPage = ({ params }) => {
  const [positionInitialValues, setPositionInitialValues] = useState({
    position: "",
    trading: {
      sell_products: false,
      set_prices: false,
      watch_analytics: false,
    },
    production: {
      buy_materials: false,
      appoint_employees: false,
    },
    showdown: {
      duel: false,
      make_claims: false,
    },
    management: {
      appoint_position: false,
      kick_out: false,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionSnapshot = await get(
          ref(db, `positions/${params.positionId}`)
        );

        if (positionSnapshot.exists()) {
          const data = positionSnapshot.val();
          setPositionInitialValues({
            position: data.position,
            trading: data.trading,
            management: data.management,
            production: data.production,
            showdown: data.showdown,
          });
        } else {
          console.error(`Position with ID ${params.positionId} not found`);
        }
      } catch (error) {
        console.error("Error fetching position data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (values) => {
    try {
      const positionRef = ref(db, `positions/${params.positionId}`);
      const positionSnapshot = await get(positionRef);

      if (!positionSnapshot.exists()) {
        throw new Error(`Position with ID ${params.positionId} does not exist`);
      }

      await update(positionRef, values);

      console.log("Position updated successfully!");
    } catch (error) {
      console.error("Error updating position:", error);
    }
  };

  return (
    <Formik
      initialValues={{ ...positionInitialValues }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.nameInputWrapper}>
          <label htmlFor="position" className={styles.nameLabel}>
            Название
          </label>
          <Field
            type="text"
            id="position"
            name="position"
            placeholder="Новобранец"
            className={styles.nameInput}
          />
          <ErrorMessage name="position" component="div" />
        </div>

        <div className={styles.checkboxesWrapper}>
          <div className={styles.responsibilitiesHeadingLabel}>
            <h3>Обязаности</h3>
          </div>

          <div className={styles.responsibilitiesWrapper}>
            <div>
              <span>Торговля</span>
              <div>
                <Field
                  type="checkbox"
                  id="sell_products"
                  name="trading.sell_products"
                />
                <label htmlFor="sell_products">Продавать продукт</label>
              </div>
              <div>
                <Field
                  type="checkbox"
                  id="set_prices"
                  name="trading.set_prices"
                />
                <label htmlFor="set_prices">Выставлять цены</label>
              </div>
              <div>
                <Field
                  type="checkbox"
                  id="watch_analytics"
                  name="trading.watch_analytics"
                />
                <label htmlFor="watch_analytics">Смотреть аналитику</label>
              </div>

              <span>Разборки</span>
              <div>
                <Field type="checkbox" id="duel" name="showdown.duel" />
                <label htmlFor="duel">Дуель</label>
              </div>
              <div>
                <Field
                  type="checkbox"
                  id="make_claims"
                  name="showdown.make_claims"
                />
                <label htmlFor="make_claims">Выставлять претензии</label>
              </div>
            </div>
            <div>
              <span>Производство</span>
              <div>
                <Field
                  type="checkbox"
                  id="buy_materials"
                  name="production.buy_materials"
                />
                <label htmlFor="buy_materials">Закупать сырье</label>
              </div>
              <div>
                <Field
                  type="checkbox"
                  id="appoint_employees"
                  name="production.appoint_employees"
                />
                <label htmlFor="appoint_employees">Назначать рабочих</label>
              </div>

              <span>Управление</span>
              <div>
                <Field
                  type="checkbox"
                  id="appoint_position"
                  name="management.appoint_position"
                />
                <label htmlFor="appoint_position">Назначать должности</label>
              </div>
              <div>
                <Field
                  type="checkbox"
                  id="kick_out"
                  name="management.kick_out"
                />
                <label htmlFor="kick_out">Выгонять из банды</label>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Сохранить
        </button>
      </Form>
    </Formik>
  );
};

export default PositionDetailsPage;
