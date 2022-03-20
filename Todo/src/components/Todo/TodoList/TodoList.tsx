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
  const [openTasks, setOpenTasks] = useState(false);

  const todos = useSelector((state: IState) => state.todosReducer.todos);

  const [todosList, setTodoList] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<null | ITodoItemWithBtn>(null);

  const [tasksList, setTasksList] = useState(todos);
  const [currentTasks, setCurrentTasks] = useState<null | ITodoItemWithBtn>(
    null
  );

  useEffect(() => {
    setTodoList(todos);
    setTasksList(todos);
  }, [todos]);
  console.log(todos);

  const dragStartcHandler = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    setCurrentTodo(item);
    setCurrentTasks(item);
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

    setTasksList(
      tasksList.map((e: any) => {
        if (currentTasks) {
          if (e.time === item.time) {
            return { ...e, time: currentTasks.time };
          }
          if (e.time === currentTasks.time) {
            return { ...e, time: item.time };
          }
        }
        return e;
      })
    );
  };

  const sortCards = (a: any, b: any): any => {
    if (a.time > b.time) {
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
    <div className={styles.todo}>
      <div className={styles.todoWrraper}>
        <div className={styles.todoBox}>
          <p className={styles.todoName}>Goals</p>
          <div className={styles.todoList}>
            {todosList.sort(sortCards).map((item: any) => {
              return (
                <TodoItem
                  id={item.id}
                  time={item.time}
                  text={item.text}
                  completed={item.completed}
                  onComplete={() => onClickComplete(item.id)}
                  onDelete={() => onClickDelete(item.id)}
                  onDragStart={(e) => dragStartcHandler(e, item)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, item)}
                  onClick={() => setOpenTasks(!openTasks)}
                />
              );
            })}
          </div>

          <div className={styles.addBox}>
            <TodoForm addNewTodo={addNewTodo} addNewTodoKey={addNewTodoKey} />
          </div>
        </div>
      </div>

      {openTasks ? (
        <div className={styles.tasks}>
          <div className={styles.todoBox}>
            {todosList.map((board: any) => {
              return (
                <div className={styles.todoList}>
                  <p className={styles.todoName}>{board.text}</p>
                  {board.tasks.map((item: any) => {
                    return (
                      <TodoItem
                        id={item.id}
                        time={item.time}
                        text={item.text}
                        completed={item.completed}
                        onComplete={() => {}}
                        onDelete={() => {}}
                        onDragStart={(e) => dragStartcHandler(e, item)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, item)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
