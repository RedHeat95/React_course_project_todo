import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import styles from "./ErrorPage.module.css";
import { Container } from "../Container/Container";

export const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.errorPage}
      style={{ background: theme.backgroundColor }}
    >
      <Container>
        <p className={styles.error} style={{ color: theme.textName }}>
          404
        </p>
        <p className={styles.errorPageTitle} style={{ color: theme.textName }}>
          The requested URL could not be found on this server. That's all we
          know.
        </p>
      </Container>
    </div>
  );
};
