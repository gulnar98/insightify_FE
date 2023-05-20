import style from "./assets/css/style.module.css";
import plusIcon from "./assets/images/plus-icon.svg";
import plusIconHover from "./assets/images/plus-icon-hover.svg";
import { useState } from "react";

function AddFilterBtn({ children, isOpen, setIsOpen }) {
  const [isHover, setIsHover] = useState(false);

  const openFilterPopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.container}>
      <button
        onClick={openFilterPopup}
        className={`${style.addFilterBtn} ${isOpen && style.isActive}`}
        data-filter={"filter"}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={isHover || isOpen ? plusIconHover.src : plusIcon.src}
          alt="plusIcon"
          data-filter={"filter"}
        />
        Add filter
      </button>
      {children}
    </div>
  );
}

export default AddFilterBtn;
