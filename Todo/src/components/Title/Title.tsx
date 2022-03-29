import { ITodoItem } from "../../redux/reducers/todosReducer";
import styles from "./Title.module.css";

interface IProps {
  text: ITodoItem;
}

export const Title = ({ text }: IProps) => {
  return (
    <div className={styles.title}>
      <h3 className={styles.titleText}>
        {text.name}
        <img
          className={styles.titleImg}
          src="./assets/images/edit.svg"
          alt="edit"
        />
      </h3>
    </div>
  );
};
