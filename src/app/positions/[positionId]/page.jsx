"use client";
import React, { useEffect, useState } from "react";
import styles from "../form.module.scss";
import { get, ref, update } from "firebase/database";
import { db } from "../../../../firebase";
import { validationSchema } from "../../../../validationSchema/schema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

const PositionDetailsPage = ({ params }) => {
  const [positionInitialValues, setPositionInitialValues] = useState({
    position: "",
    trading: {
      sell_products: false,
      set_prices: false,
      watch_analytics: false,
    },
    showdown: {
      duel: false,
      make_claims: false,
    },
    production: {
      buy_materials: false,
      appoint_employees: false,
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
            position: data.position || "",
            trading: {
              sell_products: data.trading?.sell_products || false,
              set_prices: data.trading?.set_prices || false,
              watch_analytics: data.trading?.watch_analytics || false,
            },
            showdown: {
              duel: data.showdown?.duel || false,
              make_claims: data.showdown?.make_claims || false,
            },
            production: {
              buy_materials: data.production?.buy_materials || false,
              appoint_employees: data.production?.appoint_employees || false,
            },
            management: {
              appoint_position: data.management?.appoint_position || false,
              kick_out: data.management?.kick_out || false,
            },
          });
        } else {
          console.error(`Position with ID ${params.positionId} not found`);
        }
      } catch (error) {
        console.error("Error fetching position data:", error);
      }
    };

    fetchData();
  }, [params]);
  const handleSubmit = async (values) => {
    try {
      const positionRef = ref(db, `positions/${params.positionId}`);
      const positionSnapshot = await get(positionRef);

      if (!positionSnapshot.exists()) {
        throw new Error(`Position with ID ${params.positionId} does not exist`);
      }

      await update(positionRef, values);

      toast.success("Данные успешно обновлены!");
    } catch (error) {
      console.error("Error updating position:", error);
    }
  };

  return (
    <Formik
      initialValues={positionInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.nameInputWrapper}>
          <label htmlFor="position" className={styles.nameLabel}>
            Название
            <Field
              type="text"
              id="position"
              name="position"
              placeholder="Новое название должности"
              className={styles.nameInput}
            />
          </label>
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
                <label
                  htmlFor="sell_products"
                  className={styles.checkboxWrapper}
                >
                  {" "}
                  <Field
                    type="checkbox"
                    id="sell_products"
                    name="trading.sell_products"
                    className={styles.checkbox}
                    checked={positionInitialValues.sell_products}
                  />
                  <span className={styles.icon}></span>
                  Продавать продукт
                </label>
              </div>
              <div>
                <label htmlFor="set_prices" className={styles.checkboxWrapper}>
                  <Field
                    type="checkbox"
                    id="set_prices"
                    name="trading.set_prices"
                    className={styles.checkbox}
                    checked={positionInitialValues.set_prices}
                  />
                  <span className={styles.icon}></span>
                  Выставлять цены
                </label>
              </div>
              <div>
                <label
                  htmlFor="watch_analytics"
                  className={styles.checkboxWrapper}
                >
                  <Field
                    type="checkbox"
                    id="watch_analytics"
                    name="trading.watch_analytics"
                    className={styles.checkbox}
                    checked={positionInitialValues.watch_analytics}
                  />
                  <span className={styles.icon}></span>
                  Смотреть аналитику
                </label>
              </div>

              <span>Разборки</span>
              <div>
                <label htmlFor="duel" className={styles.checkboxWrapper}>
                  <Field
                    type="checkbox"
                    id="duel"
                    name="showdown.duel"
                    className={styles.checkbox}
                    checked={positionInitialValues.duel}
                  />
                  <span className={styles.icon}></span>
                  Дуель
                </label>
              </div>
              <div>
                <label htmlFor="make_claims" className={styles.checkboxWrapper}>
                  <Field
                    type="checkbox"
                    id="make_claims"
                    name="showdown.make_claims"
                    className={styles.checkbox}
                    checked={positionInitialValues.make_claims}
                  />
                  <span className={styles.icon}></span>
                  Выставлять претензии
                </label>
              </div>
            </div>
            <div>
              <span>Производство</span>
              <div>
                <label
                  htmlFor="buy_materials"
                  className={styles.checkboxWrapper}
                >
                  <Field
                    type="checkbox"
                    id="buy_materials"
                    name="production.buy_materials"
                    className={styles.checkbox}
                    checked={positionInitialValues.buy_materials}
                  />
                  <span className={styles.icon}></span>
                  Закупать сырье
                </label>
              </div>
              <div>
                <label
                  htmlFor="appoint_employees"
                  className={styles.checkboxWrapper}
                >
                  <Field
                    type="checkbox"
                    id="appoint_employees"
                    name="production.appoint_employees"
                    className={styles.checkbox}
                    checked={positionInitialValues.appoint_employees}
                  />
                  <span className={styles.icon}></span>
                  Назначать рабочих
                </label>
              </div>

              <span>Управление</span>
              <div>
                <label
                  htmlFor="appoint_position"
                  className={styles.checkboxWrapper}
                >
                  <Field
                    type="checkbox"
                    id="appoint_position"
                    name="management.appoint_position"
                    className={styles.checkbox}
                    checked={positionInitialValues.appoint_position}
                  />
                  <span className={styles.icon}></span>
                  Назначать должности
                </label>
              </div>
              <div>
                <label htmlFor="kick_out" className={styles.checkboxWrapper}>
                  <Field
                    type="checkbox"
                    id="kick_out"
                    name="management.kick_out"
                    className={styles.checkbox}
                    checked={positionInitialValues.kick_out}
                  />
                  <span className={styles.icon}></span>
                  Выгонять из банды
                </label>
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
