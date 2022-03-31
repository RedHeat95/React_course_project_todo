import { idText } from "typescript";
import { ACTIONS } from "../constants";

interface ITask {
  key: number;
  id: number;
  // todoId: number; у нас массив тасок будет внутри объекта тудушки, дублировать id не надо
  completed: boolean;
  name: string;
}

export interface ITodoItem {
  key: number;
  id: string;
  completed: boolean;
  name: string;

  //по аналогии с тудушками
  tasks?: ITask[];
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
      key: new Date().getTime(),
      id: "id" + Math.random().toString(16).slice(2),
      completed: false,
      name: action.name,
      tasks: [],
    };

    const newTodos = [...state.todos, newTodo];

    return {
      todos: newTodos,
    };
  }

  if (action.type === ACTIONS.ADD_TASKS) {
    const todos = state.todos.map((item: ITodoItem) => {
      //заходим только в ту тудушку, которая сейчас активная
      if (item.id === action.id) {
        //объект новой таски
        const task = {
          id: "id" + Math.random().toString(16).slice(2),
          name: action.name,
          completed: false,
        };

        //проверяем будет ли свойство tasks в объекте item
        const prevTasks = item.tasks || [];
        //новый массив тасок
        const tasks = [...prevTasks, task];
        //заменяем массив с тасками на новый и возвращаем этот объекта
        return { ...item, tasks };
      }
      //возвращаем item чтобы в map не было undefined
      return item;
    });

    return {
      todos: todos,
    };
  }

  if (action.type === ACTIONS.CHECK) {
    const newTodos = state.todos.map((item: ITodoItem) => {
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
    const newTodos = state.todos.filter(
      (item: ITodoItem) => item.id !== action.id
    );
    return {
      todos: newTodos,
    };
  }

  return state;
};
