import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer, IAuthState } from "./reducers/authReducer";
import { todosReducer, ITodosState } from "./reducers/todosReducer";

export interface IState {
  authReducer: IAuthState;
  todosReducer: ITodosState;
}

export const store = createStore(
  combineReducers({ authReducer, todosReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
