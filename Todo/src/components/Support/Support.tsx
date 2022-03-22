import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Support.module.css";
import { Container } from "../Container/Container";

export const Support = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={styles.support}
      style={{ background: theme.backgroundColor }}
    >
      <Container>
        <p className={styles.supportName} style={{ color: theme.textName }}>
          Мы слышим! Мы думаем! Мы стараемся!
        </p>
      </Container>
    </div>
  );
};
