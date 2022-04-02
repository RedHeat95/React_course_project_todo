import { IState } from "../store";

export const saveToLocalStorage = (state: IState) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    alert(e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    alert(e);
  }
};
