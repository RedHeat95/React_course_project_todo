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
import { ITask, ITodoItem } from "../../../redux/reducers/todosReducer";

import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./TodoList.module.css";
import { TodoMenu } from "../TodoMenu/TodoMenu";
import { ITodoItemWithBtn, TodoItem } from "../TodoItem/TodoItem";
import { TodoAdd } from "../TodoAdd/TodoAdd";
import { Title } from "../../Title/Title";

const todoFromLocalStorage = JSON.parse(localStorage.getItem("todos") || "[]");

export const TodoList = () => {
  const { isDark, theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const todos = useSelector((state: IState) => state.todosReducer.todos);

  const [showAll, setShowAll] = useState(false);
  const [todosList, setTodosList] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<null | ITodoItemWithBtn>(null);
  const [currentTask, setCurrentTask] = useState<null | ITodoItemWithBtn>(null);
  const [activeItem, setActiveItem] = useState<null | ITodoItemWithBtn>(null);

  useEffect(() => {
    setTodosList(todos);
  }, [todos]);

  const activeItemFromState = activeItem
    ? todosList.find((item: ITodoItem) => activeItem.id === item.id)
    : null;

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

  const dropHandlerTodo = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    e.preventDefault();

    const newTodos = todosList.map((elem: ITodoItem) => {
      if (currentTodo) {
        if (elem.id === item.id) {
          return currentTodo;
        }
        if (elem.id === currentTodo.id) {
          return item;
        }
      }
      return elem;
    });
    setTodosList(newTodos);
  };

  const dropHandlerTask = (
    e: DragEvent<HTMLDivElement>,
    item: ITodoItemWithBtn
  ) => {
    e.preventDefault();

    const newTodos = todosList.map((element: ITodoItem) => {
      if (activeItem) {
        const newTasks = element.tasks?.map((elem: ITask) => {
          if (currentTask) {
            if (elem.id === item.id) {
              return currentTask;
            }
            if (elem.id === currentTask.id) {
              return item;
            }
          }
          return elem;
        });

        return { ...element, tasks: newTasks };
      }
      return element;
    });
    setTodosList(newTodos);
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
    if (activeItem) {
      dispatch(checkTask(id, activeItem.todoId));
    }
  };

  const onClickDeleteTask = (id: number) => {
    if (activeItem) {
      dispatch(deleteTask(id, activeItem.todoId));
    }
  };

  const onClickItem = (item: ITodoItemWithBtn) => {
    setActiveItem(item);
  };

  const onEditNameTitle = (id: number, name: string) => {
    const newTodosTitle = todosList.map((item: ITodoItem) => {
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
          {todosList.map((item: any) => {
            return (
              <TodoItem
                key={item.id}
                id={item.id}
                todoId={item.todoId}
                time={item.time}
                name={`${item.name} ${
                  item?.tasks?.length > 0 ? ` (${item.tasks?.length})` : ""
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
          todosList.map((elem: ITodoItem) => {
            return (
              <div className={styles.todoAll}>
                <Title text={elem} onEditTitle={onEditNameTitle} />
                {elem?.tasks?.map((item: any) => {
                  return (
                    <TodoItem
                      key={item.id}
                      id={item.id}
                      todoId={item.todoId}
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
            {activeItemFromState?.tasks?.map((item: any) => {
              return (
                <TodoItem
                  key={item.id}
                  id={item.id}
                  todoId={item.todoId}
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
