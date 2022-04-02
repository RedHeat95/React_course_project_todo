import { ReactNode } from "react";
import styles from "./Modal.module.css";

interface IProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isVisible, onClose }: IProps) => {
  return isVisible ? (
    <>
      <div className={styles.background} onClick={onClose}></div>
      <div className={styles.inner}>
        <img
          src="./assets/images/close.svg"
          alt="closeModal"
          className={styles.close}
          onClick={onClose}
        />
        {children}
      </div>
    </>
  ) : null;
};
