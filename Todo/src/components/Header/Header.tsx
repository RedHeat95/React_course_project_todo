import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";
import { NavBar } from "../NavBar/NavBar";

export const Header = () => {
  const { isOpen } = useContext(Context);

  return (
    <nav>
      <HeaderMenu />
      {isOpen ? <NavBar /> : null}
    </nav>
  );
};
