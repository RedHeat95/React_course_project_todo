import { ACTIONS } from "../constants";

export const addTodo = (name: string) => {
  return { type: ACTIONS.ADD_TODO, name: name };
};

export const checkTodo = (id: number) => {
  return { type: ACTIONS.CHECK_TODO, id: id };
};

export const deleteTodo = (id: number) => {
  return { type: ACTIONS.DELETE_TODO, id: id };
};

export const addTask = (name: string, id: number) => {
  return { type: ACTIONS.ADD_TASKS, name: name, id };
};

export const checkTask = (id: number, todoId: number) => {
  return { type: ACTIONS.CHECK_TASKS, id: id, todoId };
};

export const deleteTask = (id: number, todoId: number) => {
  return { type: ACTIONS.DELETE_TASKS, id: id, todoId };
};
