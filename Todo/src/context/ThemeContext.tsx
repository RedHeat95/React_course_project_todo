import { createContext, ReactNode, useEffect, useState } from "react";

const darkTheme = {
  backgroundHeader: "#303030",
  backgroundColor: "#808080",
  backgroundTodoList: "#303030",
  backgroundTodo: "#303030",
  burgerButton: "#ffffff",
  username: "#ffffff",
  textName: "#ffffff",
};

const lightTheme = {
  backgroundHeader: "#C0C0C0",
  backgroundColor: "#ffffff",
  backgroundTodoList: "#F4F6F8",
  backgroundTodo: "#F4F6F8",
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
