import { useState, ChangeEvent, KeyboardEvent } from "react";

import styles from "./TodoAdd.module.css";

interface IProps {
  addNewTodo: (e: string) => void;
  addNewTodoKey: (e: string) => void;
}

export const TodoAdd = ({ addNewTodo, addNewTodoKey }: IProps) => {
  const [text, setText] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addTodoKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTodoKey(text);
      setText("");
    }
  };

  const handleAddNewTodo = () => {
    addNewTodo(text);
    setText("");
  };

  return (
    <div className={styles.add}>
      <input
        className={styles.addInput}
        value={text}
        onChange={onChange}
        onKeyDown={addTodoKey}
      />

      <img
        className={styles.addImg}
        onClick={handleAddNewTodo}
        src="../../assets/images/add.svg"
        alt="add"
      />
    </div>
  );
};
