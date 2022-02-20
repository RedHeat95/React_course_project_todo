import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { TogleButton } from "../Buttons/TogleButton/TogleButton";
import { BurgerButton } from "../Buttons/BurgerButton/BurgerButton";

export const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <NavLink className={styles.pageName} to="/" exact>
        <h1>ToDo</h1>
      </NavLink>

      <NavLink
        className={styles.pageName}
        activeClassName={styles.active}
        to="/login"
        exact
      >
        <h1>LogIn</h1>
      </NavLink>

      <NavLink
        className={styles.pageName}
        activeClassName={styles.active}
        to="/registration"
        exact
      >
        <h1>Registration</h1>
      </NavLink>

      <NavLink className={styles.pageName} to="/" exact>
        <h1>LogOut</h1>
      </NavLink>

      <NavLink className={styles.pageName} to="/support" exact>
        <h1>Support</h1>
      </NavLink>

      <TogleButton />

      <NavLink to="/setting" exact>
        <img className={styles.imgSettings} src="./images/settings.png" />
      </NavLink>

      <BurgerButton />
    </div>
  );
};
