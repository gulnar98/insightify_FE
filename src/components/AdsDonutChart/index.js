import React from "react";
import HeaderDonutChart from "../headerDonutChart";
import DonutChartBody from "../DonutChartBody";
import styles from "./asset/css/style.module.css";

function AdsDonutChart() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <HeaderDonutChart />
        </div>
        <div className={styles.body}>
          <DonutChartBody data={[20, 10]} showPercentage={false} />
        </div>
      </div>
    </>
  );
}

export default AdsDonutChart;
