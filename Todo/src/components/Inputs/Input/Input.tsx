import { ChangeEventHandler, KeyboardEventHandler, useContext } from "react";

import { ThemeContext } from "../../../context/ThemeContext";

import styles from "./Input.module.css";

interface IPost {
  type?: string;
  text?: string;
  value?: string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export const Input = ({
  type = "text",
  text,
  value,
  error,
  onChange,
  onKeyDown,
}: IPost) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.inputBox}>
      {text ? (
        <p className={styles.inputText} style={{ color: theme.textName }}>
          {text}
        </p>
      ) : null}
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {error ? <p style={{ color: theme.textName }}>{error}</p> : null}
    </div>
  );
};
