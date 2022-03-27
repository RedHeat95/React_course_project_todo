import { useContext } from "react";
import { useSelector } from "react-redux";

import { IState } from "../../redux/store";
import { HeaderContext } from "../../context/HeaderContext";
import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Header.module.css";
import { Container } from "../Container/Container";
import { NavBar } from "../NavBar/NavBar";
import { BurgerButton } from "../Buttons/BurgerButton/BurgerButton";

export const Header = () => {
  const { isOpen } = useContext(HeaderContext);
  const { theme } = useContext(ThemeContext);

  const { isLoggedIn, username } = useSelector(
    (state: IState) => state.authReducer
  );

  // Это временно для проверки
  // const uAvatar = true;
  const uAvatar = false;

  return (
    <nav
      className={styles.header}
      style={{ background: theme.backgroundHeader }}
    >
      <Container>
        <div
          className={styles.headerMenu}
          style={{ background: theme.backgroundHeader }}
        >
          <BurgerButton />
          {isLoggedIn ? (
            <div className={styles.userData}>
              <img
                className={styles.userAvatar}
                src={uAvatar ? "" : "../assets/images/defaultAvatar.png"}
                alt="avatar"
              />
              <p className={styles.userName} style={{ color: theme.username }}>
                {username}
              </p>
            </div>
          ) : null}
        </div>
      </Container>
      {isOpen ? (
        <div
          className={styles.navBarwOpen}
          style={{ background: theme.backgroundHeader }}
        >
          <NavBar />
        </div>
      ) : (
        <div
          className={styles.navBarClose}
          style={{ background: theme.backgroundHeader }}
        >
          <NavBar />
        </div>
      )}
    </nav>
  );
};
