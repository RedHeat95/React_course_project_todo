import { ReactNode, useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./Container.module.css";

interface IProps {
  children: ReactNode;
}

export const Container = ({ children }: IProps) => {
  const { theme } = useContext(ThemeContext);

  return <div className={styles.container}>{children}</div>;
};
