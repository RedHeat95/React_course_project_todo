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
