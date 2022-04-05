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
    const stateStore = localStorage.getItem("state");
    return stateStore ? JSON.parse(stateStore) : undefined;
  } catch (e) {
    alert(e);
  }
};
