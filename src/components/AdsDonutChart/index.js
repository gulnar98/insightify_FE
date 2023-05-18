import React from "react";
import HeaderDonutChart from "../headerDonutChart";
import DonutChartBody from "../DonutChartBody";
import styles from "./asset/css/style.module.css";
import HeaderChartBar from "../headerChartBar";
import { useState } from "react";

function AdsDonutChart() {
  const [chartType, setChartType] = useState("Bar");
  const [hashType, setHashType] = useState("Numbers");
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <HeaderChartBar
            hashType={hashType}
            setHashType={setHashType}
            chartType={chartType}
            setChartType={setChartType}
            dataName={"newVsReturing"}
            text="New vs Returing"
          />
        </div>
        <div className={styles.body}>
          <DonutChartBody data={[20, 10]} showPercentage={false} />
        </div>
      </div>
    </>
  );
}

export default AdsDonutChart;
