import styles from "./CheckInput.module.css";

export const CheckInput = () => {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id="check" className={styles.input} />
      <label htmlFor="check" className={styles.label}>
        <img src="./assets/images/check.svg" alt="check" />
      </label>
    </div>
  );
};
