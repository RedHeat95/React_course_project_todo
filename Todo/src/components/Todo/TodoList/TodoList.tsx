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
import { ITodoItemWithBtn, TodoItem } from "../TodoItem/TodoItem";
import { TodoAdd } from "../TodoAdd/TodoAdd";
import { TaskItem } from "../TaskItem/TaskItem";
import { Container } from "../../Container/Container";

export const TodoList = () => {
  const { theme } = useContext(ThemeContext);

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

  const addNewTodo = (text: string) => {
    if (text !== "") {
      dispatch(addTodo(text));
    } else {
      alert("Введите что-нибудь");
    }
  };

  const addNewTask = (text: string, id: string) => {
    if (text !== "") {
      dispatch(addTask(text, id));
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

  const addNewTaskKey = (text: string, id: string) => {
    if (text !== "") {
      dispatch(addTask(text, id));
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
    <Container>
      <div className={styles.todo}>
        <div className={styles.todoWrraper}>
          <p className={styles.todoName} style={{ color: theme.textName }}>
            Goals
          </p>
          <div className={styles.todoList}>
            {todosList.sort(sortCards).map((item: any) => {
              return (
                <TodoItem
                  id={item.id}
                  key={item.time}
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
            <TodoAdd addNewTodo={addNewTodo} addNewTodoKey={addNewTodoKey} />
          </div>
        </div>
        <div className={styles.tasks}>
          {openTasks ? (
            <>
              <div className={styles.todoList}>
                {todosList.map((board: any) => {
                  return (
                    <div>
                      <p className={styles.todoName}>{board.text}</p>
                      {board.tasks.map((item: any) => {
                        return (
                          <TaskItem
                            id={item.id}
                            key={item.time}
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
              <div className={styles.addBox}>
                <TodoAdd
                  addNewTodo={addNewTaskKey}
                  addNewTodoKey={addNewTask}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Container>
  );
};
