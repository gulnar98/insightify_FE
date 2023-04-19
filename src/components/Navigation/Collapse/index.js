import collapseLeft from "@//assets/images/nav-icons/collapse-left.svg";
import collapseRight from "@//assets/images/nav-icons/collapse-right.svg";

import style from "./style.module.css";

function Collapse({ children, isOpen, setIsOpen }) {
  const setCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <button onClick={setCollapse} className={style.collapseBtn}>
      {isOpen ? (
        <img src={collapseLeft.src} />
      ) : (
        <img src={collapseRight.src} />
      )}
      {isOpen && children}
    </button>
  );
}

export default Collapse;
