import styles from "./asset/css/style.module.css";
import chart from "./asset/images/chart.svg";
import hash from "./asset/images/hash.svg";
import DropDown from "../../UI/drop-down";
import { useState } from "react";
import { chartDropdownItems, hashDropdownItems } from "./constants";

//Bu boyuk divlerin top pages, top clicked button and links olan hisselerin header hissesidi.

function HeaderChartBar({ text }) {
  const displayText = text || "Top clicked buttons & links";
  const [chartDropdown, setChartDropdown] = useState(false);
  const [hashDropdown, setHashDropdown] = useState(false);

  const clickChart = () => {
    setChartDropdown(!chartDropdown);
  };

  const clickHash = () => {
    setHashDropdown(!hashDropdown);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.text}>{displayText}</div>

        <div className={styles.icon}>
          <div className={styles.hashWrapper}>
            <button onClick={clickHash}>
              <img src={hash.src} alt="hash" />
            </button>
            <DropDown items={hashDropdownItems} isOpen={hashDropdown} />
          </div>
          <div className={styles.chartWrapper}>
            <button onClick={clickChart}>
              <img src={chart.src} alt="chart" />
            </button>
            <DropDown items={chartDropdownItems} isOpen={chartDropdown} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderChartBar;
