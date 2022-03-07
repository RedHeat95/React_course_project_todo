import { createContext, ReactNode, useEffect, useState } from "react";

const darkTheme = {
  backgroundColor: "#808080",
  backgroundHeader: "#016efc",
  burgerButton: "#ffffff",
  username: "#ffffff",
  textName: "#ffffff",
};

const lightTheme = {
  backgroundColor: "#ffffff",
  backgroundHeader: "#ffffff",
  burgerButton: "#000000",
  username: "#000000",
  textName: "#000000",
};

export const ThemeContext = createContext({
  isDark: false,
  changeIsDark: () => {},
  theme: lightTheme,
});

interface IProps {
  children: ReactNode;
}

export const ThemeProdiver = ({ children }: IProps) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") === "true"
  );

  const changeIsDark = () => {
    setIsDark((isDark) => !isDark);
  };

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{ isDark, changeIsDark, theme: isDark ? darkTheme : lightTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
