import styles from "./Input.module.css";
interface IPost {
  text: string;
}
export const Input = ({ text }: IPost) => {
  return (
    <div>
      <p>{text}</p>
      <input className={styles.input} type="text" />
    </div>
  );
};
