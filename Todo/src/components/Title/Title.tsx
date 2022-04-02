import { useContext } from "react";

import { ITodoItem } from "../../redux/reducers/todosReducer";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Title.module.css";

interface IProps {
  text: ITodoItem;
}

export const Title = ({ text }: IProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.title}>
      <p className={styles.titleText} style={{ color: theme.textName }}>
        {text.name}
        <img
          className={styles.titleImg}
          src="./assets/images/edit.svg"
          alt="edit"
        />
      </p>
    </div>
  );
};
