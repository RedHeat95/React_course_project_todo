import styles from "./TogleButton.module.css";

interface IProps {
  inputChecked: boolean;
  onChange: () => void;
}

export const TogleButton = ({ inputChecked, onChange }: IProps) => {
  return (
    <>
      <div className={styles.switchCheckbox}>
        <label className={styles.switch}>
          <input type="checkbox" onChange={onChange} checked={inputChecked} />
          <span className={styles.slider}> </span>
        </label>
      </div>
    </>
  );
};
