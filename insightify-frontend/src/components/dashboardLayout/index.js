import DashboardHeader from "../dashboardHeader";
import NavItem from "../Navigation/NavItem";
import NavList from "../Navigation/NavList";
import Collapse from "../Navigation/Collapse";

import { useState } from "react";
import { navItems } from "./constants";

import style from "./style.module.css";
import DropDownProfile from "../dropDownProfile";

function DashboardLayout({ children }) {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div
      className={`${style.container} ${isCollapseOpen && style.isCollapseOpen}`}
    >
      <DashboardHeader setIsOpen={setIsDropDownOpen} isOpen={isDropDownOpen}>
        <DropDownProfile
          setIsOpen={setIsDropDownOpen}
          isOpen={isDropDownOpen}
        />
      </DashboardHeader>

      <nav className={style.navigationBar}>
        <NavList direction={"vertical"} isOpen={isCollapseOpen}>
          {navItems.map((item, index) => (
            <NavItem key={`item-${index}`} {...item} isOpen={isCollapseOpen}>
              {item.label}
            </NavItem>
          ))}
          <Collapse isOpen={isCollapseOpen} setIsOpen={setIsCollapseOpen}>
            Collapse
          </Collapse>
        </NavList>
      </nav>

      <main className={style.childrenContainer}>{children}</main>
    </div>
  );
}

export default DashboardLayout;
