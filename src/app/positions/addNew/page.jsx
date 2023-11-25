"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
