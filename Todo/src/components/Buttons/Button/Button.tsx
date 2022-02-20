import styles from "./Button.module.css";

interface IProps {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: IProps) => {
  return (
    <div className={styles.btnBox}>
      <button className={styles.btn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
