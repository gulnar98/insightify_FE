import style from "./style.module.css";
import PropTypes from "prop-types";

function NavList({ children, direction }) {
  return (
    <ul className={`${style[direction]} ${style.navListWrapper}`}>
      {children}
    </ul>
  );
}

NavList.defaultProps = {
  direction: "vertical",
};

NavList.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default NavList;
