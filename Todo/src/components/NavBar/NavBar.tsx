import { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { IState } from "../../redux/store";
import { HeaderContext } from "../Header/Header";
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
    <div
      className={styles.navbar}
      style={{ background: theme.backgroundHeader }}
    >
      <Container>
        <div className={styles.navbarMebu}>
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
                  isDark
                    ? "./assets/images/exitWhite.png"
                    : "./assets/images/exitDark.png"
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
          {isLoggedIn ? (
            <NavLink to="/setting" exact>
              <img
                className={styles.imgSettings}
                src={
                  isDark
                    ? "./assets/images/settingsWhite.png"
                    : "./assets/images/settingsDark.png"
                }
                alt="imgSettings"
                onClick={changeIsOpen}
              />
            </NavLink>
          ) : null}

          <BurgerButton />
        </div>
      </Container>
    </div>
  );
};
