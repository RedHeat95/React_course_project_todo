import { ChangeEventHandler, KeyboardEvent } from "react";
import styles from "./Input.module.css";

interface IProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const CheckInput = ({ value, onChange, onKeyDown }: IProps) => {
  return (
    <input
      className={styles.input}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      type="text"
    />
  );
};
