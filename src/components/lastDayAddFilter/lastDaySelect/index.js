import style from "./assets/css/style.module.css";
import lastDayIcon from "./assets/images/last-time-icon.svg";
import downArrow from "./assets/images/down-arrow.svg";

function LastDaySelect({ lastDate, children, isOpen, setIsOpen }) {
  const lastDayClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.container}>
      <button
        onClick={lastDayClick}
        className={style.lastDayBtn}
        data-dataname="lastDayDropDown"
      >
        <img
          data-dataname="lastDayDropDown"
          src={lastDayIcon.src}
          alt="lastDayIcon"
        />
        <h2 data-dataname="lastDayDropDown">{lastDate}</h2>
        <img
          data-dataname="lastDayDropDown"
          src={downArrow.src}
          alt="downArrow"
        />
      </button>
      {children}
    </div>
  );
}

export default LastDaySelect;
