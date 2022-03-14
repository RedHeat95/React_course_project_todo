import { DragEvent } from "react";

import { ITodoItem } from "../../../redux/reducers/todosReducer";

import styles from "./TodoItem.module.css";
import { Button } from "../../Buttons/Button/Button";
import { BurgerButton } from "../../Buttons/BurgerButton/BurgerButton";

export interface ITodoItemWithBtn extends ITodoItem {
  onComplete: () => void;
  onDelete: () => void;
}

export const TodoItem = ({
  id,
  text,
  completed,
  onComplete,
  onDelete,
}: ITodoItemWithBtn) => {
  return (
    <div className={styles.todoItem} id={id}>
      <div className={styles.todoBtn}>
        <Button text="&#10003;" onClick={onComplete} />
      </div>

      <p
        className={styles.todoText}
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {text}
      </p>
      <BurgerButton />
      <div className={styles.todoBtn}>
        <Button text="X" onClick={onDelete} />
      </div>
    </div>
  );
};
