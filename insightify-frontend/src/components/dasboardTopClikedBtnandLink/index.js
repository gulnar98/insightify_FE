import Alert from "@/UI/alert/Alert";
import Button from "@/UI/button/Button";
import ChartBarBody from "../ChartBarBody";
import HeaderChartBar from "../headerChartBar";
import styles from "./asset/css/style.module.css";
import line1 from "./asset/images/line1.svg";
import line2 from "./asset/images/line2.svg";
import line3 from "./asset/images/line3.svg";
import line4 from "./asset/images/line4.svg";
import line5 from "./asset/images/line5.svg";
import faleft from "./asset/images/Left.svg";
import { useEffect, useState } from "react";
import DonutChartBody from "../DonutChartBody";

//TopClicked button and Link olan konteyner

function TopClickedBtnandLink({count, buttonsAndLinks}) {
  const [chartType, setChartType] = useState("Bar");
  const [hashType, setHashType] = useState("Numbers");
  const [maxSession, setMaxSession] = useState(0);

  let chartComponent;

  useEffect(() => {
    if (!buttonsAndLinks?.length) {
      return;
    }
    const max = buttonsAndLinks.sort((a, b) => {
      return parseInt(b?.count || 0) - parseInt(a?.count || 0)
    })?.[0]?.count || 0;
    setMaxSession(state => max);
  }, [buttonsAndLinks]);

  switch (chartType) {
    case "Bar":
      chartComponent = (
        <>
          {buttonsAndLinks?.length && buttonsAndLinks.map(item => (
            <ChartBarBody
              key={`buttons-and-links-${item.text}`}
              imageSrc={line1.src}
              pTagText={item?.text}
              anchorHref="#"
              anchorText={`${item?.count} sessions`}
              indicatorLevel={item?.count * 100 / maxSession}
              faLeftIconSrc={faleft.src}
              row={{ display: "flex", justifyContent: "space-between" }}
              firstColumn={{
                width: '80%'
              }}
              aStyle={{
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "12px",
                color: "#707070",
              }}
              pStyle={{
                marginBottom: "4px",
                color: "#303742",
                fontWeight: "500",
                fontSize: "14px",
              }}
              secondColumn={{
                alignSelf: "end",
                display: "flex",
                justifyContent: "space-between",
                columnGap: "5px",
              }}
            />
          ))}
        </>
      );
      break;
    case "Line":
      chartComponent = <h1>Line chart is temporarily unavailable.</h1>;
      break;
    case "Pie":
      chartComponent = <DonutChartBody data={[20, 10]} showPercentage={true} />;
      break;
    default:
      chartComponent = (
        <>
          {buttonsAndLinks?.length && buttonsAndLinks.map(item => (
            <ChartBarBody
              key={`buttons-and-links-${item.text}`}
              imageSrc={line1.src}
              pTagText={item.text}
              anchorHref="#"
              anchorText={`${item.count} sessions`}
              faLeftIconSrc={faleft.src}
              row={{ display: "flex", justifyContent: "space-between" }}
              aStyle={{
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "12px",
                color: "#707070",
              }}
              pStyle={{
                marginBottom: "4px",
                color: "#303742",
                fontWeight: "500",
                fontSize: "14px",
              }}
              secondColumn={{
                alignSelf: "end",
                display: "flex",
                justifyContent: "space-between",
                columnGap: "5px",
              }}
            />
          ))}
        </>
      );
      break;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <HeaderChartBar
            hashType={hashType}
            setHashType={setHashType}
            chartType={chartType}
            setChartType={setChartType}
            dataName={"topClickedBtnandLink"}
            text="Top clicked buttons & links"
          />
        </div>
        <div className={styles.body}>
          {count ? (
            <>
              <div className={styles.chartBodyContainer}>{chartComponent}</div>
            </>
          ) : (
            <>
              <div className={styles.uiComponents}>
                <Alert
                  color="#FFF2DA"
                  border="1px solid #FFC04D"
                  textColor="#000000"
                  borderRadius="5px"
                  padding="7px 15px"
                  margin="2px 0"
                  text="Install the Insightify tracking code to capture session data."
                />
                <Button
                  color="white"
                  text="Install Insightify"
                  border="1px solid #1f75cc "
                  textColor="#1f75cc"
                  borderRadius="3px"
                  padding="8px 15px"
                  margin="5px"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TopClickedBtnandLink;
