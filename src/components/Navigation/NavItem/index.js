import style from "./style.module.css";

function NavItem({ label, isActive }) {
  return (
    <li className={`${style.navItemWrapper} ${isActive && style.isActive}`}>
      🔥 {label}
    </li>
  );
}

export default NavItem;
