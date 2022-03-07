import { ACTIONS } from "../constants";

export interface IAuthState {
  isLoggedIn: boolean;
  id: number;
  username: string;
  email: string;
  error: any;
}

const defaultState: IAuthState = {
  isLoggedIn: false,
  id: 0,
  username: "",
  email: "",
  error: null,
};

export const authReducer = (state = defaultState, action: any) => {
  if (action.type === ACTIONS.REGISTER_FAILURE) {
    return { ...state, error: action.error };
  }

  if (action.type === ACTIONS.REGISTER_SUCCESS) {
    return {
      ...state,
      id: action.id,
      username: action.username,
      email: action.email,
      error: null,
    };
  }

  if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...state,
      isLoggedIn: true,
      id: action.id,
      username: action.username,
      email: action.email,
      error: null,
    };
  }

  return state;
};
