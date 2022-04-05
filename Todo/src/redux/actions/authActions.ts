import { Dispatch } from "redux";

import { getProfile, loginUser } from "../../services/auth";
import { ACTIONS } from "../constants";

interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

interface IProfile {
  id: number;
  username: string;
  email: string;
}

export const register = ({ username, email, password }: IRegisterData) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(
        "https://studapi.teachmeskills.by/auth/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const result = await response.json();

      if (response.ok === false) {
        throw result;
      }

      dispatch(registerSuccess(result));
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };
};

const registerFailure = (error: any) => {
  return {
    type: ACTIONS.REGISTER_FAILURE,
    error: error,
  };
};

const registerSuccess = (profile: IProfile) => {
  return {
    type: ACTIONS.REGISTER_SUCCESS,
    ...profile,
  };
};

const loginSuccess = (profile: IProfile) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    ...profile,
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const { access, refresh } = await loginUser(email, password);

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      const profile = await getProfile();

      dispatch(loginSuccess(profile));
    } catch (error) {
      dispatch(registerFailure(error));
    }
  };
};

export const addAvatar = (avatar: string) => {
  return {
    type: ACTIONS.ADD_AVATAR,
    avatar: avatar,
  };
};

export const logOut = () => {
  return {
    type: ACTIONS.LOGOUT,
  };
};
