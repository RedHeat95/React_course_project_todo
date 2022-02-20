import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TodoList.module.css";

import { TodoItem } from "../TodoItem/TodoItem";

export const TodoList = () => {
  const [todos, setTodos] = useState<any>([]);

  return (
    <div className={styles.todoList}>
      <h1 className={styles.todoName}>JUST DO IT!!!</h1>

      {todos.map((item: any) => {
        return (
          <TodoItem
            key={item.id}
            text={item.text}
            time={item.time}
            completed={item.completed}
          />
        );
      })}
    </div>
  );
};
