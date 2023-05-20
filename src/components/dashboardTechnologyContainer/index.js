import React from "react";
import ChartBarBody from "../ChartBarBody";
import HeaderChartBar from "../headerChartBar";
import Drop_down from "@/UI/drop-down";
import styles from "./asset/css/style.module.css";
import line1 from "./asset/images/line1.svg";
import line2 from "./asset/images/line2.svg";
import line3 from "./asset/images/line3.svg";
import faleft from "./asset/images/Left.svg";
import desktop from "./asset/images/Desktop.svg";
import phone from "./asset/images/Phone.svg";
import tablet from "./asset/images/Tablet.svg";
import downIcon from "./asset/images/down-icon.svg";
import selectedIcon from "./asset/images/selected-icon.svg";
import { allPagesItems } from "../dashboard_topPages/constants";
import { useState } from "react";
import DonutChartBody from "../DonutChartBody";

function TechnologyContainer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartType, setChartType] = useState("Bar");
  const [hashType, setHashType] = useState("Numbers");
  const [pagesType, setPagesType] = useState("All pages");

  let chartComponent;

  switch (chartType) {
    case "Bar":
      chartComponent = (
        <>
          {" "}
          <ChartBarBody
            iconSrc={desktop.src}
            imageSrc={line1.src}
            pTagText="Desktop"
            anchorHref="#"
            anchorText="4.8k sessions"
            faLeftIconSrc={faleft.src}
            row={{ display: "flex", justifyContent: "space-between" }}
            aStyle={{
              textDecoration: "none",

              fontWeight: "500",
              fontSize: "12px",
              color: "#707070",
            }}
            pStyle={{
              marginBottom: "2px",
              color: "#303742",

              fontWeight: "500",
              fontSize: "14px",
              padding: "5px",
            }}
            secondColumn={{
              alignSelf: "end",
              display: "flex",
              justifyContent: "space-between",
              columnGap: "5px",
            }}
            firstRow={{ display: "flex", columnGap: "5px" }}
            iconStyle={{ marginBottom: "2px", padding: "3px" }}
          />
          <ChartBarBody
            iconSrc={phone.src}
            imageSrc={line2.src}
            pTagText="Phone"
            anchorHref="#"
            anchorText="1.9k sessions"
            faLeftIconSrc={faleft.src}
            row={{ display: "flex", justifyContent: "space-between" }}
            aStyle={{
              textDecoration: "none",

              fontWeight: "500",
              fontSize: "12px",
              color: "#707070",
            }}
            pStyle={{
              marginBottom: "2px",
              color: "#303742",

              fontWeight: "500",
              fontSize: "14px",
              padding: "5px",
            }}
            secondColumn={{
              alignSelf: "end",
              display: "flex",
              justifyContent: "space-between",
              columnGap: "5px",
            }}
            firstRow={{ display: "flex", columnGap: "5px" }}
            iconStyle={{ marginBottom: "2px" }}
          />
          <ChartBarBody
            iconSrc={tablet.src}
            imageSrc={line3.src}
            pTagText="Tablet"
            anchorHref="#"
            anchorText="29 sessions"
            faLeftIconSrc={faleft.src}
            row={{ display: "flex", justifyContent: "space-between" }}
            aStyle={{
              textDecoration: "none",

              fontWeight: "500",
              fontSize: "12px",
              color: "#707070",
            }}
            pStyle={{
              marginBottom: "2px",
              color: "#303742",

              fontWeight: "500",
              fontSize: "14px",
              padding: "5px",
            }}
            secondColumn={{
              alignSelf: "end",
              display: "flex",
              justifyContent: "space-between",
              columnGap: "5px",
            }}
            firstRow={{ display: "flex", columnGap: "5px" }}
            iconStyle={{ marginBottom: "2px" }}
          />
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
          <ChartBarBody
            iconSrc={desktop.src}
            imageSrc={line1.src}
            pTagText="Desktop"
            anchorHref="#"
            anchorText="4.8k sessions"
            faLeftIconSrc={faleft.src}
            row={{ display: "flex", justifyContent: "space-between" }}
            aStyle={{
              textDecoration: "none",

              fontWeight: "500",
              fontSize: "12px",
              color: "#707070",
            }}
            pStyle={{
              marginBottom: "2px",
              color: "#303742",

              fontWeight: "500",
              fontSize: "14px",
              padding: "5px",
            }}
            secondColumn={{
              alignSelf: "end",
              display: "flex",
              justifyContent: "space-between",
              columnGap: "5px",
            }}
            firstRow={{ display: "flex", columnGap: "5px" }}
            iconStyle={{ marginBottom: "2px", padding: "3px" }}
          />

          <ChartBarBody
            iconSrc={phone.src}
            imageSrc={line2.src}
            pTagText="Phone"
            anchorHref="#"
            anchorText="1.9k sessions"
            faLeftIconSrc={faleft.src}
            row={{ display: "flex", justifyContent: "space-between" }}
            aStyle={{
              textDecoration: "none",

              fontWeight: "500",
              fontSize: "12px",
              color: "#707070",
            }}
            pStyle={{
              marginBottom: "2px",
              color: "#303742",

              fontWeight: "500",
              fontSize: "14px",
              padding: "5px",
            }}
            secondColumn={{
              alignSelf: "end",
              display: "flex",
              justifyContent: "space-between",
              columnGap: "5px",
            }}
            firstRow={{ display: "flex", columnGap: "5px" }}
            iconStyle={{ marginBottom: "2px" }}
          />

          <ChartBarBody
            iconSrc={tablet.src}
            imageSrc={line3.src}
            pTagText="Tablet"
            anchorHref="#"
            anchorText="29 sessions"
            faLeftIconSrc={faleft.src}
            row={{ display: "flex", justifyContent: "space-between" }}
            aStyle={{
              textDecoration: "none",

              fontWeight: "500",
              fontSize: "12px",
              color: "#707070",
            }}
            pStyle={{
              marginBottom: "2px",
              color: "#303742",

              fontWeight: "500",
              fontSize: "14px",
              padding: "5px",
            }}
            secondColumn={{
              alignSelf: "end",
              display: "flex",
              justifyContent: "space-between",
              columnGap: "5px",
            }}
            firstRow={{ display: "flex", columnGap: "5px" }}
            iconStyle={{ marginBottom: "2px" }}
          />
        </>
      );
      break;
  }

  const clickDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownProps = {
    width: 210,
    top: "110%",
    right: 0,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 6,
    backgroundColor: "#fff",
    selectedIconSrc: selectedIcon.src,
    isSelected: true,
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <HeaderChartBar
            hashType={hashType}
            setHashType={setHashType}
            chartType={chartType}
            setChartType={setChartType}
            dataName={"technology"}
            text="Technology"
          >
            <div className={styles.dropdownWrapper}>
              <button
                className={styles.allPagesButton}
                onClick={clickDropdown}
                data-dataName={"technology-allPages"}
              >
                {pagesType}
                <img
                  src={downIcon.src}
                  alt="down-icon"
                  data-dataName={"technology-allPages"}
                />
              </button>

              <Drop_down
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
                pagesType={pagesType}
                setPagesType={setPagesType}
                items={allPagesItems}
                {...dropdownProps}
                data={"technology-allPages"}
              />
            </div>
          </HeaderChartBar>
        </div>

        <div className={styles.body}>
          <div className={styles.chartBodyContainer}>{chartComponent}</div>
        </div>
      </div>
    </>
  );
}

export default TechnologyContainer;
