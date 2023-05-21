import Head from "next/head";
import style from "./assets/css/style.module.css";
import plusIcon from "./assets/images/plus-icon.svg";

import ChartBarBody from "../../components/ChartBarBody";
import TopClickedBtnandLink from "../../components/dasboardTopClikedBtnandLink";
import Metric_box from "../../components/dashboard_metric_box/Metric_box";
import TopPages from "../../components/dashboard_topPages";
import TechnologyContainer from "../../components/dashboardTechnologyContainer";
import TopCountries from "../../components/dashboardTopCountries";
import Button from "../../UI/button/Button";
import { metricBoxData, saveBtnProps } from "../../components/constants";
import LastDayAddFilter from "../../components/lastDayAddFilter/lastDayAddFilterContainer";
import AdsDonutChart from "../../components/AdsDonutChart";
import WalletDonutChart from "../../components/WalletDonutChart";

function Dashboard() {
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
              <img src={plusIcon.src} alt="" /> Add new trend
            </button>
            <Button onClick={() => onClick()} {...saveBtnProps} />
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
            <TopClickedBtnandLink />
          </div>

          <div>
            <TopPages />
          </div>

          <div>
            <TechnologyContainer />
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
