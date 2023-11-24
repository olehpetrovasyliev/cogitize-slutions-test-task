import React from "react";
import styles from "../form.module.scss";

const PositionDetailsPage = ({ params }) => {
  return (
    <form className={styles.form}>
      <div className={styles.nameInputWrapper}>
        <label htmlFor="name" className={styles.nameLabel}>
          Название
        </label>
        <input
          type="text"
          placeholder="Новобранец"
          id="name"
          className={styles.nameInput}
        />
      </div>
      <div className={styles.checkboxesWrapper}>
        <div className={styles.responsibilitiesHeadingLabel}>
          <h3>Обязаности</h3>
        </div>
      </div>
      <button type="submit" className={styles.submitBtn}>
        Сохранить
      </button>
    </form>
  );
};

export default PositionDetailsPage;
