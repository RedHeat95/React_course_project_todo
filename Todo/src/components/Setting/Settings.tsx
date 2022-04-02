import { useContext, useState, DragEvent } from "react";
import { useDispatch } from "react-redux";

import { ThemeContext } from "../../context/ThemeContext";
import { addAvatar } from "../../redux/actions/authActions";

import styles from "./Settings.module.css";
import { Container } from "../Container/Container";
import { Button } from "../Buttons/Button/Button";
import { Modal } from "../Modal/Modal";

export const Setting = () => {
  const { isDark, theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drag, setDrag] = useState(false);

  const [image, setImage] = useState<Blob | null>(null);
  const [imageFile, setImageFile] = useState("");

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setImage(e.dataTransfer.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0]);

    reader.onload = (e: any) => {
      setImageFile(e.target.result);
    };

    setDrag(false);
    setIsModalVisible(false);
  };

  const removeImage = () => {
    setImage(null);
    setImageFile("");
  };

  const addNewAvatar = () => {
    dispatch(addAvatar(imageFile));
    setImage(null);
    setImageFile("");
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
                className={styles.settingImg}
                src={
                  isDark
                    ? "./assets/images/settingsWhite.png"
                    : "./assets/images/settingsDark.png"
                }
                alt="imgSettings"
                onClick={() => setIsModalVisible(true)}
              />
            </div>
            {image ? (
              <>
                <img
                  className={styles.prevImg}
                  src={imageFile}
                  alt="new avatar"
                />
                <Button text="Remove image" onClick={removeImage} />
              </>
            ) : null}

            <Button text="Save" onClick={addNewAvatar} />
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
