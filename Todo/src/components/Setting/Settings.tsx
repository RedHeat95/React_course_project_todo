import { Input } from "../Inputs/Input/Input";
import { Button } from "../Buttons/Button/Button";
import styles from "./Settings.module.css";

export const Setting = () => {
  return (
    <div className={styles.settingWrraper}>
      <div>
        <h1 className={styles.settingTitle}>Settings</h1>
        <div className={styles.changeAvatar}>
          <p>Avatar </p>
          <button>+</button>
        </div>
        <Input text="Name" />
        <Input text="Email" />
        <Input text="Password" />
        <Button text="Save" onClick={() => {}} />
      </div>
    </div>
  );
};
