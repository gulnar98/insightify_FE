import React from "react";
import DonutChartBody from "../DonutChartBody";
import styles from "./asset/css/style.module.css";
import HeaderChartBar from "../headerChartBar";
import { useState } from "react";

function WalletDonutChart() {
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
            dataName={"walletDonutChart"}
            text="Wallet distribution "
          />
        </div>
        <div className={styles.body}>
          <DonutChartBody
            text1="Metamask"
            text2="Coinbase"
            data={[20, 10]}
            showPercentage={true}
          />
        </div>
      </div>
    </>
  );
}

export default WalletDonutChart;
