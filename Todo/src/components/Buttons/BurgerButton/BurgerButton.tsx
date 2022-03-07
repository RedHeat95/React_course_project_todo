import { useContext } from "react";

import { HeaderContext } from "../../../context/HeaderContext";
import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./BurgerButton.module.css";

export const BurgerButton = () => {
  const { isOpen, changeIsOpen } = useContext(HeaderContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.burgerWrapper}>
      <div
        className={
          isOpen ? `${styles.burger}  ${styles.open}` : `${styles.burger}`
        }
        onClick={changeIsOpen}
      >
        <span style={{ background: theme.burgerButton }}></span>
        <span style={{ background: theme.burgerButton }}></span>
        <span style={{ background: theme.burgerButton }}></span>
        <span style={{ background: theme.burgerButton }}></span>
      </div>
    </div>
  );
};
