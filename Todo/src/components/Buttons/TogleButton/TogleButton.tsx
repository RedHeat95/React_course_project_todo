import { useState } from "react";
import { Context } from "../../../Context/Context";
import styles from "./TogleButton.module.css";

export const TogleButton = () => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};
