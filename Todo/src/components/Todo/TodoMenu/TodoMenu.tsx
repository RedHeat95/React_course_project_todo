import { useContext } from "react";

import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./TodoMebu.module.css";

interface IProps {
  src: string;
  text: string;
}

export const TodoMenu = ({ src, text }: IProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.todomenu}>
      <img src={src} alt={text} className={styles.todomenuImg} />
      <span style={{ color: theme.textName }}>{text}</span>
    </div>
  );
};
