import style from "./style.module.css";

function NavList({ children, isHorizontal }) {
  return (
    <ul
      className={`${isHorizontal && style.horizontal} ${style.navListWrapper}`}
    >
      {children}
    </ul>
  );
}

export default NavList;
