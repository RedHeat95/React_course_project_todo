import { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { IState } from "../../redux/store";
import { HeaderContext } from "../../context/HeaderContext";
import { ThemeContext } from "../../context/ThemeContext";

import styles from "./NavBar.module.css";
import { Container } from "../Container/Container";
import { ToggleButton } from "../Buttons/ToggleButton/ToggleButton";
import { BurgerButton } from "../Buttons/BurgerButton/BurgerButton";

export const NavBar = () => {
  const { changeIsOpen } = useContext(HeaderContext);
  const { isDark, changeIsDark, theme } = useContext(ThemeContext);

  const isLoggedIn = useSelector(
    (state: IState) => state.authReducer.isLoggedIn
  );

  return (
    <div className={styles.navBar}>
      <Container>
        <div className={styles.menuNavBar}>
          <NavLink
            className={styles.pageName}
            style={{ color: theme.textName }}
            onClick={changeIsOpen}
            to="/"
            exact
          >
            ToDo
          </NavLink>

          {isLoggedIn ? (
            <NavLink
              className={styles.pageName}
              style={{ color: theme.textName }}
              to="/"
              exact
            >
              LogOut
              <img
                className={styles.exit}
                src={
                  isDark ? "./images/exitWhite.png" : "./images/exitDark.png"
                }
                alt="exit"
              />
            </NavLink>
          ) : (
            <>
              <NavLink
                className={styles.pageName}
                style={{ color: theme.textName }}
                onClick={changeIsOpen}
                to="/login"
                exact
              >
                LogIn
              </NavLink>

              <NavLink
                className={styles.pageName}
                style={{ color: theme.textName }}
                onClick={changeIsOpen}
                to="/registration"
                exact
              >
                Registration
              </NavLink>
            </>
          )}

          <NavLink
            className={styles.pageName}
            style={{ color: theme.textName }}
            to="/support"
            onClick={changeIsOpen}
            exact
          >
            Support
          </NavLink>

          <ToggleButton
            inputChecked={isDark}
            onChange={() => {
              changeIsDark();
            }}
          />

          <NavLink to="/setting" exact>
            <img
              className={styles.imgSettings}
              src={
                isDark
                  ? "./images/settingsWhite.png"
                  : "./images/settingsDark.png"
              }
              alt="imgSettings"
              onClick={changeIsOpen}
            />
          </NavLink>

          <BurgerButton />
        </div>
      </Container>
    </div>
  );
};