import React from "react";
import styles from "./asset/css/style.module.css";
import graph from "./asset/images/graph.svg";
import box from "./asset/images/box.svg";
import Image from "next/image";

//Bu dasboradda olan total session, total connected wallet ve s. bildiren balaca divlerdir

export default function Metric_box({ title, count = 0 }) {
  const noResultsText = "No result found";

  return (
    <>
      {count ? (
        <div className={styles.wrapperWitdhInfo}>
          <div className={styles.leftSide}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.count}>{count}</p>
          </div>
          <Image src={graph.src} alt="graph" width={108} height={15} />
        </div>
      ) : (
        <div className={styles.wrapperWithNotResutl}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.false_case}>
            <Image src={box.src} alt="box" width={20} height={18} />
            <p className={styles.noResultsText}>{noResultsText}</p>
          </div>
        </div>
      )}
    </>
  );
}
