import styles from "./asset/css/style.module.css";
import Input from "../../../UI/input";
import FilterBody from "../filterBody";
import search from "./asset/image/searchBtn.svg";
import { useEffect, useRef, useState } from "react";
import { filters } from "./constant";
import VotePopUp from "../../VotePopUp";

function FilterPopup({ isOpen, setIsOpen }) {
  const popupRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [isOnChange, setIsOnchange] = useState(false);
  const [isVotePopup, setIsVotePopup] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      event.target.dataset.filter !== "filter"
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        ref={popupRef}
        className={`${styles.wrapper} ${isOpen && styles.isOpen}`}
      >
        <div className={styles.inputContainer}>
          <button>
            <img className={styles.imgIcon} src={search.src} alt="search" />
          </button>
          <Input
            setOnChangeEvent={setSearchText}
            setIsOnchange={setIsOnchange}
            border="none"
            fontSize="14px"
            placeholder="Jump to..."
          />
        </div>
        <div className={styles.box}>
          {filters.map((group, index) => {
            const filteredFilters = group.filters.filter((filter) =>
              filter.text.toLowerCase().includes(searchText.toLowerCase())
            );

            if (filteredFilters.length === 0) {
              return null;
            }

            return (
              <div key={index} className={styles.box}>
                <div className={styles.groupWrapper}>
                  <h3 className={styles.title}>{group.title}</h3>
                  {filteredFilters.map((filter, filterIndex) => (
                    <FilterBody
                      setIsVotePopup={setIsVotePopup}
                      key={filterIndex}
                      text={filter.text}
                      iconSrc={filter.iconSrc}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isVotePopup && <VotePopUp setIsVotePopup={setIsVotePopup} />}
    </>
  );
}

export default FilterPopup;
