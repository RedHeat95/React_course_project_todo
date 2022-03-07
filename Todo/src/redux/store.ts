import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer, IAuthState } from "./reducers/authReducer";

export interface IState {
  authReducer: IAuthState;
}

export const store = createStore(
  combineReducers({ authReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
