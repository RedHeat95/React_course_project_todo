import { useState, DragEvent, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IState } from "../../../redux/store";
import {
  addTask,
  addTodo,
  checkTodo,
  deleteTodo,
} from "../../../redux/actions/todosActions";
import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./TodoList.module.css";
import { TodoMenu } from "../TodoMenu/TodoMenu";
import { ITodoItemWithBtn, TodoItem } from "../TodoItem/TodoItem";
import { TodoAdd } from "../TodoAdd/TodoAdd";
import { Title } from "../../Title/Title";

import { TaskItem } from "../TaskItem/TaskItem";

export const TodoList = () => {
  const { isDark, theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const todos = useSelector((state: IState) => state.todosReducer.todos);

  const [todosList, setTodoList] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<null | ITodoItemWithBtn>(null);
  const [activeItem, setActiveItem] = useState<null | ITodoItemWithBtn>(null);

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
          if (e.key === item.key) {
            return { ...e, key: currentTodo.key };
          }
          if (e.key === currentTodo.key) {
            return { ...e, key: item.key };
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

  const addNewTask = (name: string, id: any) => {
    if (name !== "") {
      dispatch(addTask(name, id));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const addNewTaskKey = (name: string, id: any) => {
    if (name !== "") {
      dispatch(addTask(name, id));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const onClickComplete = (id: string) => {
    dispatch(checkTodo(id));
  };

  const onClickDelete = (id: string) => {
    if (window.confirm("Delete ToDo?")) {
      dispatch(deleteTodo(id));
    }
  };

  const onClickItem = (item: any) => {
    setActiveItem(item);
    console.log(activeItem);
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

        {todosList?.map((item: any) => {
          return (
            <div onClick={() => onClickItem(item)}>
              <TodoItem
                key={item.time}
                id={item.id}
                name={item.name}
                completed={item.completed}
                onComplete={() => onClickComplete(item.id)}
                onDelete={() => onClickDelete(item.id)}
                onDragStart={(e) => dragStartcHandler(e, item)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, item)}
              />
            </div>
          );
        })}

        <TodoMenu
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
        />

        <TodoAdd addNewTodo={addNewTodo} addNewTodoKey={addNewTodoKey} />
      </div>

      <div className={styles.todoTasks}>
        {todosList && activeItem && <Title text={activeItem} />}
        {/* {todos.map((item: any) => {
          return (
            <div>
              <TaskItem
                key={item.time}
                id={item.id}
                name={item.name}
                completed={item.completed}
                onComplete={() => onClickComplete(item.id)}
                onDelete={() => onClickDelete(item.id)}
                onDragStart={(e) => dragStartcHandler(e, item)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, item)}
                
            
                
              />
            </div>
          );
        })} */}
        {/* <TodoAdd addNewTodo={addNewTask} addNewTodoKey={addNewTaskKey} /> */}
      </div>
    </div>
  );
};
