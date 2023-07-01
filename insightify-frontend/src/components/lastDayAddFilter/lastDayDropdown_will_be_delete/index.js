import style from "./assets/css/style.module.css";
import { useEffect, useRef } from "react";

function LastDayDropdown({ isOpen, setIsOpen }) {
  const lastDates = ["Last 24 hours", "Last week", "Last 2 week"];
  const dropDownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target) &&
      event.target.dataset.select !== "select"
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropDownRef}
      className={`${style.container} ${isOpen && style.isOpen}`}
    >
      <ul className={style.list}>
        {lastDates.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default LastDayDropdown;

/*
Last 24 hours
Last week
Last 2 week
*/
