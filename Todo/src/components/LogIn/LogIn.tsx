import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./LogIn.module.css";
import { Container } from "../Container/Container";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";

export const LogIn = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const [isLogged, setIsLogged] = useState(location.pathname.includes("login"));

  useEffect(() => {
    setIsLogged(location.pathname.includes("login"));
  }, [location.pathname]);

  return (
    <div className={styles.logIn} style={{ background: theme.backgroundColor }}>
      <Container>
        <div className={styles.formWrapper}>
          {isLogged ? (
            <p className={styles.formTitle} style={{ color: theme.textName }}>
              Login
            </p>
          ) : (
            <p className={styles.formTitle} style={{ color: theme.textName }}>
              Registration
            </p>
          )}
          {isLogged ? <LoginForm /> : <RegistrationForm />}
        </div>
      </Container>
    </div>
  );
};
