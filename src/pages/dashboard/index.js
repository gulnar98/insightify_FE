import Head from "next/head";
import style from "./assets/css/style.module.css";
import plusIcon from "./assets/images/plus-icon.svg";

import TopClickedBtnandLink from "../../components/dasboardTopClikedBtnandLink";
import Metric_box from "../../components/dashboard_metric_box/Metric_box";
import TopPages from "../../components/dashboard_topPages";
import TechnologyContainer from "../../components/dashboardTechnologyContainer";
import TopCountries from "../../components/dashboardTopCountries";
import Button from "../../UI/button/Button";
import LastDayAddFilter from "../../components/lastDayAddFilter/lastDayAddFilterContainer";
import AdsDonutChart from "../../components/AdsDonutChart";
import WalletDonutChart from "../../components/WalletDonutChart";
import { useEffect, useState } from "react";
import Image from "next/image";

export const saveBtnProps = {
  padding: "6px 14px",
  btncolor: "inherit",
  btncolorHover: "#f0f0f0",
  text: "Save",
  textColor: "#707070",
  textColorHover: "#2c2c2c",
  borderRadius: "6px",
  border: "1px solid #707070",
};

function Dashboard() {
  const [metricBoxData, setMetricBoxData] = useState([]);
  const [buttonsAndLinks, setButtonsAndLinks] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [devices, setDevices] = useState({
    phone: 0,
    desktop: 0,
  });

  useEffect(() => {
    fetch(`/api/dashboard`)
      .then((result) => result.json())
      .then((result) => {
        setMetricBoxData((state) => result?.counts);
        setButtonsAndLinks((state) => result?.buttonsAndLinks);
        setTopPages((state) => result?.topPages);
        setDevices((state) => result?.devices);
      });
  }, []);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard page</title>
      </Head>
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.leftSection}>
            <h1>Dashboard</h1>
            <p>
              An aggregated view of all your data.{" "}
              <u>We’d love your feedback</u>
            </p>
          </div>
          <div className={style.rightSection}>
            <button className={style.addTrendBtn}>
              <Image src={plusIcon.src} alt="" width={15} height={15} /> Add new
              trend
            </button>
            <Button onClick={() => alert("saved")} {...saveBtnProps} />
          </div>
        </header>

        <div className={style.lastDayAddFilterContainer}>
          <LastDayAddFilter />
        </div>

        <div className={style.metricBoxesContainer}>
          {metricBoxData.map((item, index) => (
            <Metric_box {...item} key={`metricBox_${index}`} />
          ))}
        </div>

        <main className={style.mainWrapper}>
          <div>
            <TopClickedBtnandLink
              buttonsAndLinks={buttonsAndLinks}
              count={true}
            />
          </div>

          <div>
            <TopPages topPages={topPages} count={true} />
          </div>

          <div>
            <TechnologyContainer devices={devices} />
          </div>

          <div>
            <TopCountries />
          </div>

          <div>
            <AdsDonutChart />
          </div>

          <div>
            <WalletDonutChart />
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
