import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { IState } from "../../redux/store";
import { HeaderContext } from "../Header/Header";
import { ThemeContext } from "../../context/ThemeContext";

import styles from "./NavBar.module.css";
import { Container } from "../Container/Container";
import { ToggleButton } from "../Buttons/ToggleButton/ToggleButton";
import { BurgerButton } from "../Buttons/BurgerButton/BurgerButton";
import { logOut } from "../../redux/actions/authActions";

export const NavBar = () => {
  const { changeIsOpen } = useContext(HeaderContext);
  const { isDark, changeIsDark, theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: IState) => state.authReducer.isLoggedIn
  );

  const logout = () => {
    dispatch(logOut());
  };

  return (
    <div
      className={styles.navbar}
      style={{ background: theme.backgroundHeader }}
    >
      <Container>
        <div className={styles.navbarMenu}>
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
              onClick={changeIsOpen}
              to="/"
              exact
            >
              <div onClick={logout}>
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
              </div>
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
