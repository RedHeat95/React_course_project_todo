import { useState, ChangeEvent, KeyboardEvent } from "react";

import styles from "./TodoAdd.module.css";
import { TodoMenu } from "../TodoMenu/TodoMenu";

interface IProps {
  addNewTodo: (text: string) => void;
  addNewTodoKey: (text: string) => void;
}

export const TodoAdd = ({ addNewTodo, addNewTodoKey }: IProps) => {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addTodoKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTodoKey(text);
      setText("");
      setOpenAdd(!openAdd);
    }
  };

  const AddTodo = () => {
    addNewTodo(text);
    setText("");
    setOpenAdd(!openAdd);
  };

  const onClose = () => {
    setText("");
    setOpenAdd(!openAdd);
  };

  return (
    <div className={styles.add}>
      <div className={styles.addFront} onClick={onClose}>
        <TodoMenu src={"./assets/images/add.svg"} text="Add" />
      </div>
      {openAdd ? (
        <div className={styles.addWindow}>
          <img
            src="./assets/images/close.svg"
            alt="close"
            className={styles.imgClose}
            onClick={onClose}
          />
          <input
            className={styles.addInput}
            placeholder="Enter..."
            value={text}
            onChange={onChange}
            onKeyDown={addTodoKey}
          />

          <button className={styles.addBtn} onClick={AddTodo}>
            Add
          </button>
        </div>
      ) : null}
    </div>
  );
};
