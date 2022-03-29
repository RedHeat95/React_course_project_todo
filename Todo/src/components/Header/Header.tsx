import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";

import { IState } from "../../redux/store";
import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Header.module.css";
import { Container } from "../Container/Container";
import { NavBar } from "../NavBar/NavBar";
import { BurgerButton } from "../Buttons/BurgerButton/BurgerButton";

export const HeaderContext = createContext({
  isOpen: false,
  changeIsOpen: () => {},
});

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeIsOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const { theme } = useContext(ThemeContext);

  const { isLoggedIn, username } = useSelector(
    (state: IState) => state.authReducer
  );

  // Это временно для проверки
  // const uAvatar = true;
  const uAvatar = false;

  return (
    <HeaderContext.Provider value={{ isOpen, changeIsOpen }}>
      <nav className={styles.header}>
        <div
          className={styles.headerMenu}
          style={{ background: theme.backgroundHeader }}
        >
          <Container>
            <BurgerButton />
            {isLoggedIn ? (
              <div className={styles.userData}>
                <img
                  className={styles.userAvatar}
                  src={uAvatar ? "" : "../assets/images/defaultAvatar.png"}
                  alt="avatar"
                />
                <p
                  className={styles.userName}
                  style={{ color: theme.username }}
                >
                  {username}
                </p>
              </div>
            ) : null}
          </Container>
        </div>

        {isOpen ? <NavBar /> : null}
      </nav>
    </HeaderContext.Provider>
  );
};
