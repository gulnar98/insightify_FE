import Header from "../header";
import NavItem from "../Navigation/NavItem";
import NavList from "../Navigation/NavList";
import { navItems } from "./constants";

import style from "./style.module.css";

function Layout({ children }) {
  return (
    <div className={style.container}>
      <Header />

      <NavList direction={"vertical"}>
        {navItems.map((item, index) => (
          <NavItem key={`item-${index}`} {...item}>
            {item.label}
          </NavItem>
        ))}
      </NavList>
      {children}
    </div>
  );
}

export default Layout;
