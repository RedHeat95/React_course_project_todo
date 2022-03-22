import { DragEvent, useContext } from "react";

import { ITodoItem } from "../../../redux/reducers/todosReducer";
import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./TodoItem.module.css";

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
  const { isDark, theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.todoItem}
      style={{ background: theme.backgroundTodo }}
      key={id}
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable={true}
    >
      <div onClick={onComplete}>
        <img
          className={styles.imgBtn}
          src={
            isDark
              ? "../../assets/images/tickWhite.svg"
              : "../../assets/images/tickDark.svg"
          }
          alt="tick"
        />
      </div>

      <p
        className={styles.todoText}
        style={{
          textDecoration: completed ? "line-through" : "none",
          color: theme.textName,
        }}
        onClick={onClick}
      >
        {text}
      </p>
      <div onClick={onDelete}>
        <img
          className={styles.imgBtn}
          src={
            isDark
              ? "../../assets/images/basketWhite.svg"
              : "../../assets/images/basketDark.svg"
          }
          alt="basket"
        />
      </div>
    </div>
  );
};
