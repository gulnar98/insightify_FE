import style from "./style.module.css";
import LastDaySelect from "./lastDaySelect";
import AddFilterBtn from "./addFilterBtn";
import LastDayDropdown from "./lastDayDropdown";
import { useState } from "react";
import FilterPopup from "./filterPopup";

function LastDayAddFilter() {
  const [lastDayDropdown, setLastDayDropdown] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);

  return (
    <>
      <LastDaySelect isOpen={lastDayDropdown} setIsOpen={setLastDayDropdown}>
        <LastDayDropdown
          isOpen={lastDayDropdown}
          setIsOpen={setLastDayDropdown}
        />
      </LastDaySelect>

      <AddFilterBtn isOpen={filterPopup} setIsOpen={setFilterPopup}>
        <FilterPopup isOpen={filterPopup} setIsOpen={setFilterPopup} />
      </AddFilterBtn>
    </>
  );
}

export default LastDayAddFilter;
