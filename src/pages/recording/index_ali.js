import Head from "next/head";
import style from "./assets/css/style.module.css";
import Emptydataview from "../../components/emptydataview";
import Alert from "../../UI/alert/Alert";
import Button from "../../UI/button/Button";
import RecordingAside from "../../components/RecordingAside";
import { useState } from "react";
import HandlerecordPage from "../../components/handlerecordPage";
import LoadingRecording from "../../components/loadingRecordings";
import DeletePopUp from "../../components/DeletePopup";

export default function Recording() {
  const alertProps = {
    color: "#FFF2DA",
    border: "solid 1px #FFC04D",
    textColor: "#000000",
    borderRadius: "4px",
    padding: "7px 15px",
    text: "Install the Usersnap to get started",
    margin: "22px 0px 0px 0px",
    width: "31%",
    fontWeight: "600",
  };

  const buttonProps = {
    btncolor: "#1F75CC",
    btncolorHover: "#1F75CC",
    text: "Install Usersnap",
    textColorHover: "white",
    border: "solid 1px #1F75CC",
    textColor: "white",
    borderRadius: "4px",
    padding: "7px 15px",
    fontSize: "1em",
    margin: "18px 0px",
  };

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recordings page</title>
      </Head>
      <div className={style.main}>
        {/* <Emptydataview
          alert={<Alert {...alertProps} />}
          button={<Button {...buttonProps} />}/> */}
        <HandlerecordPage />
        {/* <DeletePopUp/> */}
        {/* <LoadingRecording/> */}
      </div>
    </>
  );
}
