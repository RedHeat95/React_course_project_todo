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
  const { theme } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(false);
  const changeIsOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const { isLoggedIn, username, avatar } = useSelector(
    (state: IState) => state.authReducer
  );

  return (
    <HeaderContext.Provider value={{ isOpen, changeIsOpen }}>
      <nav
        className={styles.header}
        style={{ background: theme.backgroundHeader }}
      >
        <Container>
          <div className={styles.headerMenu}>
            <BurgerButton />
            {isLoggedIn ? (
              <div className={styles.userData}>
                <img
                  className={styles.userAvatar}
                  src={avatar || "../assets/images/defaultAvatar.png"}
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
          </div>

          {isOpen ? <NavBar /> : null}
        </Container>
      </nav>
    </HeaderContext.Provider>
  );
};
