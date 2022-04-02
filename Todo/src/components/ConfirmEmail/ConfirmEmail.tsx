import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./ConfirmEmail.module.css";
import { Container } from "../Container/Container";

export const ConfirmEmail = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.confirm}
      style={{ background: theme.backgroundColor }}
    >
      <Container>
        <p className={styles.confirmEmail} style={{ color: theme.textName }}>
          Registration Confirmation
        </p>
      </Container>
    </div>
  );
};
