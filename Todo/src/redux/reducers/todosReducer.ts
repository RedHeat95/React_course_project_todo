import { ACTIONS } from "../constants";

export interface ITodoItem {
  key: number;
  id: number;
  text: string;
  completed: boolean;

  tasks?: [
    {
      key: number;
      id: number;
      completed: boolean;
      text: string;
    }
  ];
}

export interface ITodosState {
  todos: ITodoItem[];
  tasks: ITodoItem[];
}

export const defaultState: ITodosState = {
  todos: [],
  tasks: [],
};

export const todosReducer = (state = defaultState, action: any) => {
  if (action.type === ACTIONS.ADD_TODO) {
    const newTodo = {
      key: new Date().getTime(),
      id: "id" + Math.random().toString(16).slice(2),
      completed: false,
      text: action.text,
      tasks: [],
    };

    const newTodos = [...state.todos, newTodo];

    return {
      todos: newTodos,
    };
  }

  if (action.type === ACTIONS.ADD_TASKS) {
    const newTask = {
      key: new Date().getTime(),
      idTask: "id" + Math.random().toString(16).slice(2),
      completed: false,
      text: action.text,
    };

    const newTasks = [...state.tasks, newTask];

    return {
      todos: newTasks,
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
