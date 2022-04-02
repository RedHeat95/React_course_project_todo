import { ACTIONS } from "../constants";

interface ITask {
  id: number;
  time: number;
  completed: boolean;
  name: string;
}

export interface ITodoItem {
  id: number;
  time: number;
  completed: boolean;
  name: string;
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
      id: "id" + Math.random().toString(16).slice(2),
      time: new Date().getTime(),
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
    const newTasks = state.todos.map((item: ITodoItem) => {
      if (item.id === action.id) {
        const task = {
          id: "id" + Math.random().toString(16).slice(2),
          time: new Date().getTime(),
          completed: false,
          name: action.name,
        };

        const prevTasks = item.tasks || [];

        const tasks = [...prevTasks, task];

        return { ...item, tasks };
      }

      return item;
    });

    return {
      todos: newTasks,
    };
  }

  if (action.type === ACTIONS.CHECK_TODO) {
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

  if (action.type === ACTIONS.CHECK_TASKS) {
    const newTasks = state.todos.map((elem: ITodoItem) => {
      elem.tasks?.map((item: ITask) => {
        if (item.id === action.id) {
          item.completed = !item.completed;
        }
        return item;
      });

      return elem;
    });
    return {
      todos: newTasks,
    };
  }

  if (action.type === ACTIONS.DELETE_TODO) {
    const newTodos = state.todos.filter(
      (item: ITodoItem) => item.id !== action.id
    );
    return {
      todos: newTodos,
    };
  }

  if (action.type === ACTIONS.DELETE_TASKS) {
    const newTasks = state.todos.map((elem: ITodoItem) => {
      elem.tasks?.filter((item: ITask) => item.id !== action.id);

      return elem;
    });
    return {
      todos: newTasks,
    };
    // const newTasks = state.todos.tasks?.filter(
    //   (item: ITodoItem) => item.id !== action.id
    // );

    // return {
    //   todos: newTasks,
    // };
  }

  return state;
};
