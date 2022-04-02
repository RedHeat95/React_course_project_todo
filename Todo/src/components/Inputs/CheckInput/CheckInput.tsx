import styles from "./CheckInput.module.css";

interface IProps {
  value: boolean;
  onChange: () => void;
}

export const CheckInput = ({ value, onChange }: IProps) => {
  return (
    <div className={styles.checkbox}>
      <label className={value ? styles.labelActive : styles.label}>
        <input
          type="checkbox"
          className={styles.input}
          checked={value}
          onChange={onChange}
        />
        <img src="./assets/images/check.svg" alt="check" />
      </label>
    </div>
  );
};
