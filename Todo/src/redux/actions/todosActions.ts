import { ACTIONS } from "../constants";

export const addTodo = (text: string) => {
  return { type: ACTIONS.ADD_TODO, text: text };
};

export const checkTodo = (id: string) => {
  return { type: ACTIONS.CHECK, id: id };
};

export const deleteTodo = (id: string) => {
  return { type: ACTIONS.DELETE, id: id };
};

export const addTask = (text: string) => {
  return { type: ACTIONS.ADD_TASKS, text: text};
};

export const checkTask = (id: string) => {
  return { type: ACTIONS.CHECK_TASKS, id: id };
};

export const deleteTask = (id: string) => {
  return { type: ACTIONS.DELETE_TASKS, id: id };
};
