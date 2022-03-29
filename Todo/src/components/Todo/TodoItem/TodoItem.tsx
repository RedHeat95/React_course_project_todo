import { DragEvent, useContext } from "react";

import { ITodoItem } from "../../../redux/reducers/todosReducer";
import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./TodoItem.module.css";
import { CheckInput } from "../../Inputs/CheckInput/CheckInput";

export interface ITodoItemWithBtn extends ITodoItem {
  onComplete: () => void;
  onDelete: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}

export const TodoItem = ({
  name,
  completed,
  onComplete,
  onDelete,
  onDragStart,
  onDragLeave,
  onDragEnd,
  onDragOver,
  onDrop,
}: ITodoItemWithBtn) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.todoItem}
      style={{ background: theme.backgroundTodo }}
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable={true}
    >
      <div className={styles.checkbox} onClick={onComplete}>
        <input type="checkbox" id="check" className={styles.input} />
        <label htmlFor="check" className={styles.label}>
          <img src="./assets/images/check.svg" alt="check" />
        </label>
      </div>

      <span
        className={styles.todoItemText}
        style={{
          textDecoration: completed ? "line-through" : "none",
          color: theme.textName,
        }}
      >
        {name}
      </span>

      <img
        className={styles.todoItemImgRemove}
        src="../../assets/images/remove.svg"
        alt="basket"
        onClick={onDelete}
      />
    </div>
  );
};
