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
        <div className={styles.headerMenu}>
          <BurgerButton />
          {isLoggedIn ? (
            <>
              <img
                className={styles.userAvatar}
                src={uAvatar ? "" : "../images/defaultAvatar.png"}
                alt="avatar"
              />
              <h1 className={styles.userName} style={{ color: theme.username }}>
                {username}
              </h1>
            </>
          ) : null}
        </div>
        {isOpen ? <NavBar /> : null}
      </Container>
    </nav>
  );
};
