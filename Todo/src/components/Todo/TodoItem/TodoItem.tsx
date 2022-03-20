import { DragEvent } from "react";

import { ITodoItem } from "../../../redux/reducers/todosReducer";

import styles from "./TodoItem.module.css";
import { Button } from "../../Buttons/Button/Button";
import { BurgerButton } from "../../Buttons/BurgerButton/BurgerButton";

export interface ITodoItemWithBtn extends ITodoItem {
  onComplete: () => void;
  onDelete: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
}

export const TodoItem = ({
  id,
  text,
  completed,
  onComplete,
  onDelete,
  onDragStart,
  onDragLeave,
  onDragEnd,
  onDragOver,
  onDrop,
  onClick,
}: ITodoItemWithBtn) => {
  return (
    <div
      className={styles.todoItem}
      key={id}
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable={true}
    >
      <div className={styles.todoBtn}>
        <Button text="&#10003;" onClick={onComplete} />
      </div>

      <p
        className={styles.todoText}
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
        onClick={onClick}
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
