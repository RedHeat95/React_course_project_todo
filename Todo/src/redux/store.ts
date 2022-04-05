import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer, IAuthState } from "./reducers/authReducer";
import { todosReducer, ITodosState } from "./reducers/todosReducer";

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./actions/storeActions";

export interface IState {
  authReducer: IAuthState;
  todosReducer: ITodosState;
}

export const store = createStore(
  combineReducers({ authReducer, todosReducer }),
  loadFromLocalStorage(),
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
