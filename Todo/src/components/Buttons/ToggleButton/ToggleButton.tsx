import styles from "./ToggleButton.module.css";

interface IProps {
  inputChecked: boolean;
  onChange: () => void;
}

export const ToggleButton = ({ inputChecked, onChange }: IProps) => {
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
