import { useContext, useState, DragEvent } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Settings.module.css";
import { Container } from "../Container/Container";
import { Modal } from "../Modal/Modal";

import { Button } from "../Buttons/Button/Button";

export const Setting = () => {
  const { isDark, theme } = useContext(ThemeContext);

  const [drag, setDrag] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: any) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    const formData = new FormData();
    formData.append("file", files[0]);
    setDrag(false);
  };

  return (
    <>
      <div
        className={styles.setting}
        style={{ background: theme.backgroundColor }}
      >
        <Container>
          <div className={styles.settingWrraper}>
            <h1
              className={styles.settingTitle}
              style={{ color: theme.textName }}
            >
              Settings
            </h1>
            <div className={styles.changeAvatar}>
              <p
                className={styles.settingText}
                style={{ color: theme.textName }}
              >
                Avatar
              </p>
              <img
                className={styles.changeImg}
                src={
                  isDark
                    ? "./assets/images/settingsWhite.png"
                    : "./assets/images/settingsDark.png"
                }
                alt="imgSettings"
                onClick={() => setIsModalVisible(true)}
              />
            </div>
            <Button text="Save" onClick={() => {}} />
          </div>
        </Container>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        {drag ? (
          <div
            className={styles.dropArea}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            <p>Отпустить, для загрузки</p>
          </div>
        ) : (
          <div
            className={styles.dropArea}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
          >
            <p>Перенести, для загрузки</p>
          </div>
        )}
      </Modal>
    </>
  );
};
