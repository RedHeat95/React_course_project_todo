import { useContext } from "react";

import { ITodoItem } from "../../redux/reducers/todosReducer";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Title.module.css";

interface IProps {
  text: ITodoItem;
  onEditTitle: (e: number, c: string) => void;
}

export const Title = ({ text, onEditTitle }: IProps) => {
  const { theme } = useContext(ThemeContext);

  const editTitle = () => {
    const newTitle = window.prompt("Название списка", text.name);
    if (newTitle) {
      onEditTitle(text.id, newTitle);
    }
  };

  return (
    <div className={styles.title}>
      <p className={styles.titleText} style={{ color: theme.title }}>
        {text.name}
        <img
          className={styles.titleImg}
          onClick={editTitle}
          src="./assets/images/edit.svg"
          alt="edit"
        />
      </p>
    </div>
  );
};
