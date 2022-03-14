import { useState, ChangeEvent, KeyboardEvent } from "react";

import styles from "./TodoForm.module.css";
import { Button } from "../../Buttons/Button/Button";
import { Input } from "../../Inputs/Input/Input";

interface IProps {
  addNewTodo: (text: string) => void;
  addNewTodoKey: (text: string) => void;
}

export const TodoForm = ({ addNewTodo, addNewTodoKey }: IProps) => {
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
    <div className={styles.form}>
      <Input value={text} onChange={onChange} onKeyDown={addTodoKey} />
      {/* <Button text="Add" onClick={handleAddNewTodo} /> */}
    </div>
  );
};
