import style from "./assets/css/style.module.css";
import lastDayIcon from "./assets/images/last-time-icon.svg";
import downArrow from "./assets/images/down-arrow.svg";

function LastDaySelect({ children, isOpen, setIsOpen }) {
  const lastDayClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.container}>
      <button
        onClick={lastDayClick}
        className={style.lastDayWrapper}
        data-select="select"
      >
        <img data-select="select" src={lastDayIcon.src} alt="lastDayIcon" />
        <h2 data-select="select">Last 30 days</h2>
        <img data-select="select" src={downArrow.src} alt="downArrow" />
      </button>
      {children}
    </div>
  );
}

export default LastDaySelect;
