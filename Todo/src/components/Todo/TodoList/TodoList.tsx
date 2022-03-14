import { useState, DragEvent } from "react";
import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";

import { IState } from "../../../redux/store";
import {
  addTodo,
  checkTodo,
  deleteTodo,
} from "../../../redux/actions/todosActions";

import styles from "./TodoList.module.css";
import { TodoForm } from "../TodoForm/TodoForm";
import { ITodoItemWithBtn, TodoItem } from "../TodoItem/TodoItem";

import { defaultState, ITodoItem } from "../../../redux/reducers/todosReducer";
import { BurgerButton } from "../../Buttons/BurgerButton/BurgerButton";
import { Button } from "../../Buttons/Button/Button";

export const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state: IState) => state.todosReducer.todos);
  console.log(todos);

  const [todosList, setTodoList] = useState(todos);
  const [currentTodo, setCurrentTodo] = useState<any>();
  console.log(currentTodo);

  const dragStartcHandler = (e: any, item: any) => {
    setCurrentTodo(item);
  };

  const dragEndHandler = (e: any) => {
    e.target.style.background = "red";
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    e.target.style.background = "blue";
  };

  const dropHandler = (e: any, item: any) => {
    e.preventDefault();
    setTodoList(
      todosList.map((c) => {
        if (c.id === item.id) {
          return { ...c, order: currentTodo.order };
        }
        if (c.id === currentTodo.id) {
          return { ...c, order: item.order };
        }
        return c;
      })
    );
    e.target.style.background = "green";
  };

  const sortCards = (a: any, b: any) => {
    if (a.order > b.order) {
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
          {todosList.sort(sortCards).map((item) => {
            <div
              className={styles.todoItem}
              id={item.id}
              onDragStart={(e) => dragStartcHandler(e, item)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, item)}
              draggable={true}
            >
              <div className={styles.todoBtn}>
                <Button text="&#10003;" onClick={() => onClickComplete} />
              </div>

              <p
                className={styles.todoText}
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </p>
              <BurgerButton />
              <div className={styles.todoBtn}>
                <Button text="X" onClick={() => onClickDelete} />
              </div>
            </div>;
          })}
        </div>

        <div className={styles.addBox}>
          <TodoForm addNewTodo={addNewTodo} addNewTodoKey={addNewTodoKey} />
        </div>
      </div>
      ;
    </div>
  );
};
