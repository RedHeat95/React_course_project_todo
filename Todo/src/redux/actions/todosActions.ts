import { ACTIONS } from "../constants";

export const addTodo = (name: string) => {
  return { type: ACTIONS.ADD_TODO, name: name };
};

export const checkTodo = (id: string) => {
  return { type: ACTIONS.CHECK, id: id };
};

export const deleteTodo = (id: string) => {
  return { type: ACTIONS.DELETE, id: id };
};

export const addTask = (name: string, id: string) => {
  return { type: ACTIONS.ADD_TASKS, name: name, id };
};

export const checkTask = (id: string) => {
  return { type: ACTIONS.CHECK_TASKS, id: id };
};

export const deleteTask = (id: string) => {
  return { type: ACTIONS.DELETE_TASKS, id: id };
};
