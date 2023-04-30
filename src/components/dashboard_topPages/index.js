import React from "react";
import ChartBarBody from "../ChartBarBody";
import HeaderChartBar from "../headerChartBar";
import Drop_down from "@/UI/drop-down";
import Alert from "@/UI/alert/Alert";
import Button from "@/UI/button/Button";
import styles from "./asset/css/style.module.css";
import line1 from "./asset/images/line1.svg";
import line2 from "./asset/images/line2.svg";
import line3 from "./asset/images/line3.svg";
import line4 from "./asset/images/line4.svg";
import line5 from "./asset/images/line5.svg";
import faleft from "./asset/images/Left.svg";
import mapIcon from "./asset/images/map.svg";

//Bu Toppages boyuk conteynerdi

function TopPages(count) {
  // count=false;

  const dropdownOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const handleDropdownChange = (option) => {
    // console.log('Selected option:', option);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <HeaderChartBar text="Top pages">
            <Drop_down
              options={dropdownOptions}
              onChange={handleDropdownChange}
              border="1px solid #D6D6D6"
              textColor="#303742"
              borderRadius="6px"
              padding="7px 15px"
              fontFamily="Inter"
              fontWeight="500"
              fontSize="14px"
            />
          </HeaderChartBar>
        </div>
        <div className={styles.body}>
          {count ? (
            <>
              <div className={styles.chartBodyContainer}>
                <ChartBarBody
                  imageSrc={line1.src}
                  pTagText="Get started now"
                  anchorHref="#"
                  anchorText="4.8k sessions"
                  faLeftIconSrc={mapIcon.src}
                  mapIconSrc={faleft.src}
                  row={{ display: "flex", justifyContent: "space-between" }}
                  aStyle={{
                    textDecoration: "none",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "12px",
                    color: "#707070",
                  }}
                  pStyle={{
                    marginBottom: "4px",
                    color: "#303742",
                    fontFamily: "Inter",
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
                <ChartBarBody
                  imageSrc={line2.src}
                  pTagText="More details"
                  anchorHref="#"
                  anchorText="1.9k sessions"
                  faLeftIconSrc={mapIcon.src}
                  mapIconSrc={faleft.src}
                  row={{ display: "flex", justifyContent: "space-between" }}
                  aStyle={{
                    textDecoration: "none",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "12px",
                    color: "#707070",
                  }}
                  pStyle={{
                    marginBottom: "4px",
                    color: "#303742",
                    fontFamily: "Inter",
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
                <ChartBarBody
                  imageSrc={line3.src}
                  pTagText="Next"
                  anchorHref="#"
                  anchorText="29 sessions"
                  mapIconSrc={faleft.src}
                  faLeftIconSrc={mapIcon.src}
                  row={{ display: "flex", justifyContent: "space-between" }}
                  aStyle={{
                    textDecoration: "none",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "12px",
                    color: "#707070",
                  }}
                  pStyle={{
                    marginBottom: "4px",
                    color: "#303742",
                    fontFamily: "Inter",
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
                <ChartBarBody
                  imageSrc={line4.src}
                  pTagText="Sign up"
                  anchorHref="#"
                  anchorText="22 sessions"
                  mapIconSrc={faleft.src}
                  faLeftIconSrc={mapIcon.src}
                  row={{ display: "flex", justifyContent: "space-between" }}
                  aStyle={{
                    textDecoration: "none",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "12px",
                    color: "#707070",
                  }}
                  pStyle={{
                    marginBottom: "4px",
                    color: "#303742",
                    fontFamily: "Inter",
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
                <ChartBarBody
                  imageSrc={line5.src}
                  pTagText="Features"
                  anchorHref="#"
                  anchorText="19 sessions"
                  mapIconSrc={faleft.src}
                  faLeftIconSrc={mapIcon.src}
                  row={{ display: "flex", justifyContent: "space-between" }}
                  aStyle={{
                    textDecoration: "none",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    fontSize: "12px",
                    color: "#707070",
                  }}
                  pStyle={{
                    marginBottom: "4px",
                    color: "#303742",
                    fontFamily: "Inter",
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
              </div>
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
                  text="Install the Usersnap tracking code to capture session data."
                />
                <Button
                  color="white"
                  text="Install Usersnapp"
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

export default TopPages;
