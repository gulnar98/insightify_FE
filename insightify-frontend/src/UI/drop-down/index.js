import { useState } from "react";
import style from "./style.module.css";
import { useEffect } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";

function DropDown(props) {
  const dropDownRef = useRef(null);

  const {
    items,
    isOpen,
    setIsOpen,
    lastDate,
    setLastDate,
    chartType,
    setChartType,
    hashType,
    setHashType,
    pagesType,
    setPagesType,
    data,
    width,
    top,
    right,
    selectedIconSrc,
    backgroundColor,
    boxShadow,
    borderRadius,
  } = props;

  const router = useRouter();

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
      event.target.dataset.dataname !== data
    ) {
      setIsOpen(false);
    }
  };

  const onClick = (item) => {
    if (item === "Bar" || item === "Line" || item === "Pie") {
      setChartType(item);
    } else if (item === "Numbers" || item === "Percents") {
      setHashType(item);
    } else if (
      item === "All pages" ||
      item === "Landing pages" ||
      item === "Exit pages"
    ) {
      setPagesType(item);
    } else {
      router.push(`${router.asPath?.replace?.(/\?.+$/gi, '')}?p=${item.value}`);

      setLastDate(item.text);
    }

    setIsOpen(false);
  };

  const containerStyles = {
    width,
    boxShadow,
    borderRadius,
    backgroundColor,
    top,
    right,
    display: isOpen ? "block" : "none",
  };

  return (
    <div ref={dropDownRef} className={style.container} style={containerStyles}>
      {items.map((item, index) => (
        <button
          onClick={() => onClick(item)}
          className={`${style.button} ${
            (item.text === chartType ||
              item.text === hashType ||
              item.text === pagesType ||
              item.text === lastDate) &&
            style.isActiveBtn
          }`}
          key={`${item}-${index}`}
        >
          {item.icon && <img src={item.icon} alt={item.text} />}
          <p>{item.text}</p>
          {(item.text === chartType ||
            item.text === hashType ||
            item.text === pagesType ||
            item.text === lastDate) && (
            <img src={selectedIconSrc} alt="selected-icon" />
          )}
        </button>
      ))}
    </div>
  );
}

export default DropDown;
