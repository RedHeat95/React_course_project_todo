import { useState } from "react";
import { ACTIONS } from "../constants";

export interface ITodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface ITodosState {
  todos: ITodoItem[];
}

export const defaultState: ITodosState = {
  todos: [],
};

export const todosReducer = (state = defaultState, action: any) => {
  if (action.type === ACTIONS.ADD_TODO) {
    const newTodo = {
      id: "id" + Math.random().toString(16).slice(2),
      text: action.text,
      completed: false,
    };

    const newTodos = [...state.todos, newTodo];

    return {
      todos: newTodos,
    };
  }

  if (action.type === ACTIONS.CHECK) {
    const newTodos = state.todos.map((item: any) => {
      if (item.id === action.id) {
        item.completed = !item.completed;
      }
      return item;
    });
    return {
      todos: newTodos,
    };
  }

  if (action.type === ACTIONS.DELETE) {
    const newTodos = state.todos.filter((item: any) => item.id !== action.id);
    return {
      todos: newTodos,
    };
  }

  return state;
};
