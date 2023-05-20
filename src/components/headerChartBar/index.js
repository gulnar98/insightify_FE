import styles from "./asset/css/style.module.css";
import hash from "./asset/images/hash.svg";
import percent from "./asset/images/percent.svg";
import bar from "./asset/images/bar.svg";
import line from "./asset/images/line.svg";
import pie from "./asset/images/pie.svg";

import selectedIcon from "./asset/images/selected-icon.svg";
import DropDown from "../../UI/drop-down";
import { useState } from "react";
import { chartDropdownItems, hashDropdownItems } from "./constants";

//Bu boyuk divlerin top pages, top clicked button and links olan hisselerin header hissesidi.

function HeaderChartBar({
  children,
  chartType,
  setChartType,
  hashType,
  setHashType,
  text,
  dataName,
}) {
  const displayText = text || "Top clicked buttons & links";
  const [chartDropdown, setChartDropdown] = useState(false);
  const [hashDropdown, setHashDropdown] = useState(false);
  let hashIcon;
  let chartIcon;

  switch (hashType) {
    case "Numbers":
      hashIcon = hash.src;
      break;
    case "Percents":
      hashIcon = percent.src;
      break;
  }

  switch (chartType) {
    case "Bar":
      chartIcon = bar.src;
      break;
    case "Line":
      chartIcon = line.src;
      break;
    case "Pie":
      chartIcon = pie.src;
  }

  const clickChart = () => {
    setChartDropdown(!chartDropdown);
  };

  const clickHash = () => {
    setHashDropdown(!hashDropdown);
  };

  const dropdownProps = {
    width: 210,
    top: "150%",
    right: 0,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 6,
    backgroundColor: "#fff",
    selectedIconSrc: selectedIcon.src,
    chartType,
    hashType,
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.text}>{displayText}</div>
        <div className={styles.icon}>
          {children}
          <div className={styles.hashWrapper}>
            <button onClick={clickHash} data-dataName={`hash-${dataName}`}>
              <img
                src={hashIcon}
                alt="hash"
                data-dataName={`hash-${dataName}`}
              />
            </button>
            <DropDown
              {...dropdownProps}
              items={hashDropdownItems}
              isOpen={hashDropdown}
              setIsOpen={setHashDropdown}
              setChartType={setChartType}
              setHashType={setHashType}
              data={`hash-${dataName}`}
            />
          </div>
          <div className={styles.chartWrapper}>
            <button onClick={clickChart} data-dataName={`chart-${dataName}`}>
              <img
                src={chartIcon}
                alt="chart"
                data-dataName={`chart-${dataName}`}
              />
            </button>
            <DropDown
              {...dropdownProps}
              items={chartDropdownItems}
              isOpen={chartDropdown}
              setIsOpen={setChartDropdown}
              setChartType={setChartType}
              setHashType={setHashType}
              data={`chart-${dataName}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderChartBar;
