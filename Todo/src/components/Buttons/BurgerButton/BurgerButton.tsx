import { useContext } from "react";
import { Context } from "../../../Context/Context";
import styles from "./BurgerButton.module.css";

export const BurgerButton = () => {
  const { isOpen, changeIsOpen } = useContext(Context);

  return (
    <div className={styles.burgerWrapper}>
      <div
        className={
          isOpen ? `${styles.burger}  ${styles.open}` : `${styles.burger}`
        }
        onClick={changeIsOpen}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
