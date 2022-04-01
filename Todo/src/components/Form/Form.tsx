import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Form.module.css";
import { Container } from "../Container/Container";
import { TodoList } from "../Todo/TodoList/TodoList";

export const Form = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const [isPlan, setIsPlan] = useState(location.pathname.includes("/"));

  useEffect(() => {
    setIsPlan(location.pathname.includes("/"));
  }, [location.pathname]);

  const switchForm = (value: boolean) => {
    setIsPlan(value);
  };

  return (
    <div className={styles.form} style={{ background: theme.backgroundColor }}>
      <Container>
        <div className={styles.formWrraper}>
          <div className={styles.formTitle}>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => switchForm(true)}
            >
              Plan
            </p>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => switchForm(false)}
            >
              Day
            </p>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => switchForm(false)}
            >
              Week
            </p>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => switchForm(false)}
            >
              Month
            </p>
            <p
              className={styles.title}
              style={{ color: theme.textName }}
              onClick={() => switchForm(false)}
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
