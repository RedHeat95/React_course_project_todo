import { useState, useContext } from "react";

import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./TodoMebu.module.css";

interface IProps {
  src: string;
  text: string;
}

export const TodoMenu = ({ src, text }: IProps) => {
  const { theme } = useContext(ThemeContext);
  const [isActive, setisActive] = useState(false);

  return (
    <div className={isActive ? styles.todomenuActive : styles.todomenu}>
      <img src={src} alt={text} className={styles.todomenuImg} />
      <span
        className={isActive ? styles.todomenuNameActive : styles.todomenuName}
        style={{ color: theme.textName }}
      >
        {text}
      </span>
    </div>
  );
};
