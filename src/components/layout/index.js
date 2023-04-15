import { useState } from "react";
import Header from "../header";
import Collapse from "../Navigation/Collapse";
import NavItem from "../Navigation/NavItem";
import NavList from "../Navigation/NavList";
import { navItems } from "./constants";

import style from "./style.module.css";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={style.container}>
      <Header />

      <NavList direction={"vertical"} isOpen={isOpen}>
        {navItems.map((item, index) => (
          <NavItem key={`item-${index}`} {...item} isOpen={isOpen}>
            {item.label}
          </NavItem>
        ))}
        <Collapse isOpen={isOpen} setIsOpen={setIsOpen}>
          Collapse
        </Collapse>
      </NavList>
      {children}
    </div>
  );
}

export default Layout;
