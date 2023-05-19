import style from "./assets/css/style.module.css";
import { useState } from "react";
import selectedIcon from "./assets/images/selected-icon.svg";
import LastDaySelect from "../lastDaySelect";
import AddFilterBtn from "../addFilterBtn";
import DropDown from "../../../UI/drop-down/index";
import FilterPopup from "../filterPopup";
import { lastDayItems } from "../lastDaySelect/constants";

function LastDayAddFilter() {
  const [lastDayDropdown, setLastDayDropdown] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);
  const [lastDate, setLastDate] = useState("Last 30 days");

  const dropdownProps = {
    width: "100%",
    top: "110%",
    right: 0,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 6,
    backgroundColor: "#fff",
    selectedIconSrc: selectedIcon.src,
    isSelected: true,
  };
  return (
    <>
      <LastDaySelect
        lastDate={lastDate}
        isOpen={lastDayDropdown}
        setIsOpen={setLastDayDropdown}
      >
        <DropDown
          {...dropdownProps}
          items={lastDayItems}
          isOpen={lastDayDropdown}
          lastDate={lastDate}
          setLastDate={setLastDate}
          setIsOpen={setLastDayDropdown}
          data={"lastDayDropDown"}
        />
      </LastDaySelect>

      <AddFilterBtn isOpen={filterPopup} setIsOpen={setFilterPopup}>
        <FilterPopup isOpen={filterPopup} setIsOpen={setFilterPopup} />
      </AddFilterBtn>
    </>
  );
}

export default LastDayAddFilter;
