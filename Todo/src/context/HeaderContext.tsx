import { createContext, useState } from "react";
import { Header } from "../components/Header/Header";

export const HeaderContext = createContext({
  isOpen: false,
  changeIsOpen: () => {},
});

export const HeaderProdiver = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeIsOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <HeaderContext.Provider value={{ isOpen, changeIsOpen }}>
      <Header />
      {/* Разместил здесь, если HeaderProdiver внути Header NavBar не открывается */}
      {/* Есть вариат лучшего решения? */}
    </HeaderContext.Provider>
  );
};
