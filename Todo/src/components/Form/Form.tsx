import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./Form.module.css";
import { Container } from "../Container/Container";
import { TodoList } from "../Todo/TodoList/TodoList";

export const Form = () => {
  const location = useLocation();

  const [isPlan, setIsPlan] = useState(location.pathname.includes("/"));

  useEffect(() => {
    setIsPlan(location.pathname.includes("/"));
  }, [location.pathname]);

  const switchForm = (value: boolean) => {
    setIsPlan(value);
  };

  return (
    <Container>
      <div className={styles.formBox}>
        <div className={styles.form}>
          <div className={styles.formTitle}>
            <h1 onClick={() => switchForm(true)}>Plan</h1>
            <h1 onClick={() => switchForm(false)}>Day</h1>
            <h1>Week</h1>
            <h1>Month</h1>
            <h1>Year</h1>
          </div>
        </div>

        {isPlan ? <TodoList /> : null}
      </div>
    </Container>
  );
};
