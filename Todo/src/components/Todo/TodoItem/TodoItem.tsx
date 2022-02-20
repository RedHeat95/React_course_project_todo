import { useState } from "react";
import { Button } from "../../Buttons/Button/Button";
import { BurgerButton } from "../../Buttons/BurgerButton/BurgerButton";
import styles from "./TodoItem.module.css";

interface IProps {
  text: string;
  time: string;
  completed: boolean;
}

export const TodoItem = ({ text, completed }: IProps) => {
  return (
    <div className={styles.todoItem}>
      <Button text="&#10003;" onClick={() => {}} />
      <p
        style={{
          width: "100%",
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {text}
      </p>
      <BurgerButton />
    </div>
  );
};
