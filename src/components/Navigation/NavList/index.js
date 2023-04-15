import style from "./style.module.css";
import PropTypes from "prop-types";

function NavList({ children, direction, isOpen }) {
  return (
    <ul
      className={`${style[direction]} ${style.navListWrapper} ${
        !isOpen && style.isOpen
      }`}
    >
      {children}
    </ul>
  );
}

NavList.defaultProps = {
  direction: "vertical",
  isOpen: true,
};

NavList.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  isOpen: PropTypes.bool,
};

export default NavList;
