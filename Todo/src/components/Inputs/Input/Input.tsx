import { ChangeEventHandler, KeyboardEventHandler, useContext } from "react";

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
  return (
    <div>
      <p>{text}</p>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {error ? <p>{error}</p> : null}
    </div>
  );
};
