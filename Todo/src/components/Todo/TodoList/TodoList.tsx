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
import { ITodoItem } from "../../../redux/reducers/todosReducer";

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

  const [todosList, setTodosList] = useState(todos);
  const [showAll, setShowAll] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<null | ITodoItemWithBtn>(null);
  const [currentTask, setCurrentTask] = useState<null | ITodoItemWithBtn>(null);

  const [activeItem, setActiveItem] = useState<null | ITodoItemWithBtn>(null);

  const activeItemFromState = activeItem
    ? todos.find((item) => activeItem.id === item.id)
    : null;

  useEffect(() => {
    setTodosList(todos);
  }, [todos]);

  const dragStartcHandler = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    setCurrentTodo(item);
  };

  const dragStartcHandlerTasks = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    setCurrentTask(item);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandlerTodo = (e: any, item: ITodoItemWithBtn) => {
    e.preventDefault();

    setTodosList(
      todosList.map((e: ITodoItem) => {
        if (currentTodo) {
          if (e.id === item.id) {
            return { ...e, time: currentTodo.time };
          }
          if (e.id === currentTodo.id) {
            return { ...e, time: item.time };
          }
        }
        return e;
      })
    );
  };

  const dropHandlerTask = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    e.preventDefault();
    setTodosList(
      todosList.map((e: ITodoItem) => {
        e.tasks?.map((elem: ITodoItem) => {
          if (currentTask) {
            if (elem.id === item.id) {
              return { ...elem, time: currentTask.time };
            }
            if (elem.id === currentTask.id) {
              return { ...elem, time: item.time };
            }
          }
          return elem;
        });

        return e;
      })
    );
  };

  const sortTodo = (a: ITodoItem, b: ITodoItem) => {
    if (a.time > b.time) {
      return 1;
    } else {
      return -1;
    }
  };

  const sortTask = (a: ITodoItem, b: ITodoItem) => {
    if (a.time > b.time) {
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

  const onClickDeleteTodo = (id: number) => {
    if (window.confirm("Delete ToDo?")) {
      dispatch(deleteTodo(id));
    }
  };

  const onClickCompleteTask = (id: number) => {
    dispatch(checkTask(id));
  };

  const onClickDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const onClickItem = (item: ITodoItemWithBtn) => {
    setActiveItem(item);
  };

  const onEditNameTitle = (id: number, name: string) => {
    const newTodosTitle = todosList.map((item: any) => {
      if (item.id === id) {
        item.name = name;
      }
      return item;
    });
    setTodosList(newTodosTitle);
  };

  return (
    <div className={styles.todo}>
      <div
        className={styles.todoWrraper}
        style={{ background: theme.backgroundTodoList }}
      >
        <div
          className={styles.todoAll}
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          <TodoMenu
            src={
              isDark
                ? "./assets/images/allTodoWhite.svg"
                : "./assets/images/allTodoDark.svg"
            }
            text="Show all"
          />
        </div>

        <div
          onClick={() => {
            setShowAll(false);
          }}
        >
          {todosList.sort(sortTodo).map((item: any) => {
            return (
              <TodoItem
                key={item.id}
                id={item.id}
                time={item.time}
                name={`${item.name} ${
                  item.tasks.length > 0 ? ` (${item.tasks.length})` : ""
                }`}
                completed={item.completed}
                onComplete={() => onClickCompleteTodo(item.id)}
                onDelete={() => onClickDeleteTodo(item.id)}
                onDragStart={(e) => dragStartcHandler(e, item)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandlerTodo(e, item)}
                onClick={() => onClickItem(item)}
              />
            );
          })}
        </div>

        <TodoAdd addNewTodo={addNewTodo} addNewTodoKey={addNewTodoKey} />
      </div>

      <div className={styles.todoTasks}>
        {showAll ? (
          todosList.map((elem: any) => {
            return (
              <div className={styles.todoAll}>
                <Title text={elem} onEditTitle={onEditNameTitle} />
                {elem?.tasks?.map((item: any) => {
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
                      onDrop={(e) => dropHandlerTask(e, item)}
                    />
                  );
                })}
              </div>
            );
          })
        ) : (
          <>
            {todosList && activeItemFromState && (
              <Title text={activeItemFromState} onEditTitle={onEditNameTitle} />
            )}
            {activeItemFromState?.tasks?.sort(sortTask)?.map((item: any) => {
              return (
                <TodoItem
                  key={item.id}
                  id={item.id}
                  time={item.time}
                  name={item.name}
                  completed={item.completed}
                  onComplete={() => onClickCompleteTask(item.id)}
                  onDelete={() => onClickDeleteTask(item.id)}
                  onDragStart={(e) => dragStartcHandlerTasks(e, item)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandlerTask(e, item)}
                />
              );
            })}

            {activeItem && !activeItemFromState?.tasks?.length && (
              <h1 className={styles.textEmpty}>No tasks</h1>
            )}

            {activeItemFromState ? (
              <TodoAdd addNewTodo={addNewTask} addNewTodoKey={addNewTaskKey} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
