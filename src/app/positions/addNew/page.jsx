"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../form.module.scss";
import { db } from "../../../../firebase";
import { ref, update } from "firebase/database";
import { validationSchema } from "../../../../validationSchema/schema";

const PositionDetailsPage = () => {
  const handleSubmit = async (values) => {
    try {
      const positionId = crypto.randomUUID();
      const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      const randomSalary = getRandomNumber(50, 200);
      const randomTasksNumber = getRandomNumber(0, 50);
      const updatedData = {
        ...values,
        id: positionId,
        price: randomSalary,
        tasks: randomTasksNumber,
      };

      const positionRef = ref(db, `positions/${positionId}`);

      await update(positionRef, updatedData);

      console.log("Form submitted successfully and database updated!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Formik
      initialValues={{
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
      }}
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
              placeholder="Новобранец"
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
