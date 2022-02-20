import { createContext, useState } from "react";
import { RootRouter } from "../routing/RootRouter";

export const Context = createContext({
  isOpen: false,
  changeIsOpen: () => {},
});

export const ContextOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeIsOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <Context.Provider
      value={{
        isOpen,
        changeIsOpen,
      }}
    >
      <RootRouter />
    </Context.Provider>
  );
};
