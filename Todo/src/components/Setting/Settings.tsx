import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Settings.module.css";
import { Container } from "../Container/Container";
import { Input } from "../Inputs/Input/Input";
import { Button } from "../Buttons/Button/Button";

export const Setting = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.setting}
      style={{ background: theme.backgroundColor }}
    >
      <Container>
        <div className={styles.settingWrraper}>
          <h1 className={styles.settingTitle} style={{ color: theme.textName }}>
            Settings
          </h1>
          <div className={styles.changeAvatar}>
            <p className={styles.settingText} style={{ color: theme.textName }}>
              Avatar
            </p>
          </div>
          <Button text="Save" onClick={() => {}} />
        </div>
      </Container>
    </div>
  );
};
