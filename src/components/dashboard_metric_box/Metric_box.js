import React from "react";
import styles from "./asset/css/style.module.css";
import graph from "./asset/images/graph.svg";
import box from "./asset/images/box.svg";

//Bu dasboradda olan total session, total connected wallet ve s. bildiren balaca divlerdir

export default function Metric_box({ title, count = 0 }) {
  const noResultsText = "Not result found";

  return (
    <>
      {count ? (
        <div className={styles.wrapperWitdhInfo}>
          <div className={styles.leftSide}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.count}>{count}</p>
          </div>
          <img src={graph.src} alt="graph" />
        </div>
      ) : (
        <div className={styles.wrapperWithNotResutl}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.false_case}>
            <img src={box.src} alt="box" />
            <p className={styles.noResultsText}>{noResultsText}</p>
          </div>
        </div>
      )}
    </>
  );
}
