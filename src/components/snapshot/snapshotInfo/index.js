import { useEffect, useState } from "react";
import style from "./assets/css/style.module.css";
import exitIcon from "./assets/images/exit-icon.svg";

import upArrow from "./assets/images/up-arrow.svg";
import { pageSsContentItems } from "./constants";

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

function SnapshotInfo({
  dateOfScreenshot
}) {

  const [date, setDate] = useState('');

  useEffect(() => {
    const date = new Date(dateOfScreenshot);
    if (isNaN(date)) {
      return;
    }

    setDate(state => `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`);
  }, [dateOfScreenshot]);

  return (
    <div className={style.container}>
      <header className={style.mainHeader}>
        <h2>About this heatmap</h2>
        <button>
          <img src={exitIcon.src} alt="exitIcon" />
        </button>
      </header>
      <div className={style.pageSsWrapper}>
        <header className={style.pageSsHeader}>
          <div className={style.upDownPageSs}>
            <h3>Page screenShoot</h3>
            <button className={style.clickButton}>
              <img src={upArrow.src} alt="upArrow" />
            </button>
          </div>
          <div className={style.dateOfPageSs}>
            <h4>Date of screenshoot</h4>
            <p>{date}</p>
          </div>
        </header>
        <ul className={style.pageSsContent}>
          {pageSsContentItems.map((item, index) => (
            <li key={index}>
              <img src={item.src} alt={item.alt} />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.overlaysWrapper}>
        <header className={style.overlaysHeader}>
          <div className={style.upDownOverlays}>
            <h3>Overlays</h3>
            <button className={style.clickButton}>
              <img src={upArrow.src} alt="upArrow" />
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default SnapshotInfo;
