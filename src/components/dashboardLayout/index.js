import DashboardHeader from "../dashboardHeader";
import NavItem from "../Navigation/NavItem";
import NavList from "../Navigation/NavList";
import Collapse from "../Navigation/Collapse";

import { useState } from "react";
import { navItems } from "./constants";

import style from "./style.module.css";

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={style.container}>
      <DashboardHeader />

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

export default DashboardLayout;
