import { useState, DragEvent, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IState } from "../../../redux/store";
import {
  addTask,
  addTodo,
  checkTask,
  checkTodo,
  deleteTask,
  deleteTodo,
} from "../../../redux/actions/todosActions";
import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./TodoList.module.css";
import { TodoMenu } from "../TodoMenu/TodoMenu";
import { ITodoItemWithBtn, TodoItem } from "../TodoItem/TodoItem";
import { TodoAdd } from "../TodoAdd/TodoAdd";
import { Title } from "../../Title/Title";

export const TodoList = () => {
  const { isDark, theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const todos = useSelector((state: IState) => state.todosReducer.todos);

  const [todosList, setTodoList] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<null | ITodoItemWithBtn>(null);
  const [activeItem, setActiveItem] = useState<null | ITodoItemWithBtn>(null);

  const activeItemFromState = activeItem
    ? todos.find((item) => activeItem.id === item.id)
    : null;

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const dragStartcHandler = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    setCurrentTodo(item);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    e.preventDefault();

    setTodoList(
      todosList.map((e) => {
        if (currentTodo) {
          if (e.time === item.time) {
            return { ...e, time: currentTodo.time };
          }
          if (e.time === currentTodo.time) {
            return { ...e, time: item.time };
          }
        }
        return e;
      })
    );
  };

  const sortCards = (a: any, b: any): any => {
    if (a.key > b.key) {
      return 1;
    } else {
      return -1;
    }
  };

  const addNewTodo = (name: string) => {
    if (name !== "") {
      dispatch(addTodo(name));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const addNewTodoKey = (name: string) => {
    if (name !== "") {
      dispatch(addTodo(name));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const addNewTask = (name: string) => {
    if (name !== "" && activeItem) {
      dispatch(addTask(name, activeItem.id));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const addNewTaskKey = (name: string) => {
    if (name !== "" && activeItem) {
      dispatch(addTask(name, activeItem.id));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const onClickCompleteTodo = (id: number) => {
    dispatch(checkTodo(id));
  };

  const onClickCompleteTask = (id: number) => {
    dispatch(checkTask(id));
  };

  const onClickDeleteTodo = (id: number) => {
    if (window.confirm("Delete ToDo?")) {
      dispatch(deleteTodo(id));
    }
  };

  const onClickDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const onClickItem = (item: any) => {
    setActiveItem(item);
  };

  return (
    <div className={styles.todo}>
      <div
        className={styles.todoWrraper}
        style={{ background: theme.backgroundTodoList }}
      >
        <div className={styles.todoAll}>
          <TodoMenu
            src={
              isDark
                ? "./assets/images/allTodoWhite.svg"
                : "./assets/images/allTodoDark.svg"
            }
            text="Show all"
          />
        </div>

        {todosList.map((item: any) => {
          return (
            <div key={item.id} onClick={() => onClickItem(item)}>
              <TodoItem
                id={item.id}
                time={item.time}
                name={item.name}
                completed={item.completed}
                onComplete={() => onClickCompleteTodo(item.id)}
                onDelete={() => onClickDeleteTodo(item.id)}
                onDragStart={(e) => dragStartcHandler(e, item)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, item)}
              />
            </div>
          );
        })}

        {/* <TodoMenu
          src={
            isDark
              ? "../../assets/images/tickWhite.svg"
              : "../../assets/images/tickDark.svg"
          }
          text="Completely"
        />
        <TodoMenu
          src={
            isDark
              ? "../../assets/images/basketWhite.svg"
              : "../../assets/images/basketDark.svg"
          }
          text="Basket"
        /> */}

        <TodoAdd addNewTodo={addNewTodo} addNewTodoKey={addNewTodoKey} />
      </div>

      <div className={styles.todoTasks}>
        {todosList && activeItemFromState && (
          <Title text={activeItemFromState} />
        )}
        {activeItemFromState?.tasks?.map((item: any) => {
          return (
            <TodoItem
              key={item.id}
              id={item.id}
              time={item.time}
              name={item.name}
              completed={item.completed}
              onComplete={() => onClickCompleteTask(item.id)}
              onDelete={() => onClickDeleteTask(item.id)}
              onDragStart={(e) => dragStartcHandler(e, item)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, item)}
            />
          );
        })}
        {activeItemFromState ? (
          <TodoAdd addNewTodo={addNewTask} addNewTodoKey={addNewTaskKey} />
        ) : null}
      </div>
    </div>
  );
};
