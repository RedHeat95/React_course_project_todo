import { BurgerButton } from "../Buttons/BurgerButton/BurgerButton";
import styles from "./HeaderMenu.module.css";

export const HeaderMenu = () => {
  return (
    <div className={styles.headerMenu}>
      <BurgerButton />
      <img className={styles.userAvatar} src="../images/defoltAvatar.png" />
      <h1 className={styles.userName}>Username</h1>
    </div>
  );
};
