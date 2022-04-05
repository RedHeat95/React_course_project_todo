import { useState, useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Form.module.css";
import { Container } from "../Container/Container";
import { TodoList } from "../Todo/TodoList/TodoList";

export const Form = () => {
  const { theme } = useContext(ThemeContext);

  const [isPlan, setIsPlan] = useState<boolean>(true);

  return (
    <div className={styles.form} style={{ background: theme.backgroundColor }}>
      <Container>
        <div className={styles.formWrapper}>
          <div className={styles.formTitle}>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => setIsPlan(true)}
            >
              Plan
            </p>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => setIsPlan(false)}
            >
              Day
            </p>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => setIsPlan(false)}
            >
              Week
            </p>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => setIsPlan(false)}
            >
              Month
            </p>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => setIsPlan(false)}
            >
              Year
            </p>
          </div>

          {isPlan ? <TodoList /> : null}
        </div>
      </Container>
    </div>
  );
};
