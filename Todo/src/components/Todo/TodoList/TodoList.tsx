import { useState, DragEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IState } from "../../../redux/store";
import {
  addTodo,
  checkTodo,
  deleteTodo,
} from "../../../redux/actions/todosActions";

import styles from "./TodoList.module.css";
import { ITodoItemWithBtn, TodoItem } from "../TodoItem/TodoItem";
import { TodoForm } from "../TodoForm/TodoForm";

export const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state: IState) => state.todosReducer.todos);

  const [todosList, setTodoList] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<any>();

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  console.log(todos);
  console.log(todosList);

  const dragStartcHandler = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    setCurrentTodo(item);
  };

  const dragEndHandler = (e: any) => {
    e.preventDefault();
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
  };

  const dropHandler = (e: any, item: ITodoItemWithBtn) => {
    e.preventDefault();
    setTodoList(
      todosList.map((e) => {
        if (e.id === item.id) {
          return { ...e, id: currentTodo.id };
        }
        if (e.id === currentTodo.id) {
          return { ...e, id: item.id };
        }
        return e;
      })
    );
  };

  const sortCards = (a: any, b: any) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  };

  const addNewTodo = (text: string) => {
    if (text !== "") {
      dispatch(addTodo(text));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const addNewTodoKey = (text: string) => {
    if (text !== "") {
      dispatch(addTodo(text));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const onClickComplete = (id: string) => {
    dispatch(checkTodo(id));
  };

  const onClickDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className={styles.todoWrraper}>
      <div className={styles.todoBox}>
        <p className={styles.todoName}>Goals</p>
        <div className={styles.todoList}>
          {todosList.sort(sortCards).map((item: any) => {
            return (
              <TodoItem
                id={item.id}
                text={item.text}
                completed={item.completed}
                onComplete={() => onClickComplete(item.id)}
                onDelete={() => onClickDelete(item.id)}
                onDragStart={(e) => dragStartcHandler(e, item)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, item)}
              />
            );
          })}
        </div>

        <div className={styles.addBox}>
          <TodoForm addNewTodo={addNewTodo} addNewTodoKey={addNewTodoKey} />
        </div>
      </div>
    </div>
  );
};
