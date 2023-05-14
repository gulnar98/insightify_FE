import DashboardHeader from "../dashboardHeader";
import NavItem from "../Navigation/NavItem";
import NavList from "../Navigation/NavList";
import Collapse from "../Navigation/Collapse";

import { useState } from "react";
import { navItems } from "./constants";

import style from "./style.module.css";
import DropDownProfile from "../dropDownProfile";

function DashboardLayout({ children }) {
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div className={style.container}>
      <DashboardHeader setIsOpen={setIsDropDownOpen} isOpen={isDropDownOpen}>
        <DropDownProfile
          setIsOpen={setIsDropDownOpen}
          isOpen={isDropDownOpen}
        />
      </DashboardHeader>

      <nav>
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

      <main>{children}</main>
    </div>
  );
}

export default DashboardLayout;
