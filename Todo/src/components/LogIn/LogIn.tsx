import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./LogIn.module.css";
import { Container } from "../Container/Container";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";

export const LogIn = () => {
  const location = useLocation();

  const [isLogged, setIsLogged] = useState(location.pathname.includes("login"));

  useEffect(() => {
    setIsLogged(location.pathname.includes("login"));
  }, [location.pathname]);

  return (
    <Container>
      <div className={styles.formWrapper}>
        {isLogged ? (
          <p className={styles.formTitle}>Login</p>
        ) : (
          <p className={styles.formTitle}>Registration</p>
        )}
        {isLogged ? <LoginForm /> : <RegistrationForm />}
      </div>
    </Container>
  );
};
