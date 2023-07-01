import style from "./assets/css/style.module.css";
import Verification from "../verification";
import InstallBox from "../InstallBox/InstallBox";
import Button from "../../UI/button/Button";
import CodeBox from "../CodeBox/CodeBox";
import {
  VerifyInProgressButton,
  leftBottom1Props,
  leftBottom2Props,
  verifyPopUpButton,
  verifyPopUpProps,
} from "./constants";
import { useState, useEffect } from "react";
import VerifyPopUp from "../verifyPopUp";
import VerifySucces from "../verifySucces";
import VerifyInProgress from "../verifyInProgress";

function InstallVerificationBox({ forOverview }) {
  const [isVerifyModal, setIsVerifyModal] = useState(false);
  const [isVerifySucc, setIsVerifySucc] = useState(true);
  const [installBoxStatus, setInstallBoxStatus] = useState("verifyPopup");
  const [isFetchStatus, setIsFetchStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [codeText, setCodeText] = useState("");

  let VerifyChildren;

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("/api/code");
        const jsonData = JSON.parse(await data.text());
        const codeText = jsonData.codeText;
        setCodeText(codeText);
      } catch {}
    })();
  }, []);

  const installBoxClick = () => {
    setIsVerifyModal(true);
  };

  const verifyPopUpClick = async () => {
    const response = await fetch("/api/code/verify");
    console.log(response);

    setLoading(false);
    setInstallBoxStatus("verifyProgress");

    if (response.ok) {
      setIsVerifySucc(true);
    } else {
      setIsVerifySucc(false);
    }

    setInstallBoxStatus("verifySuccess");
  };

  const verifyInProgressClick = () => {
    setIsVerifyModal(false);
    setInstallBoxStatus("verifyPopup");
  };

  const verificationProps = {
    setIsVerifyModal,
    setIsVerifySucc,
    setInstallBoxStatus,
  };

  const verifySuccProps = {
    setIsVerifyModal,
    setInstallBoxStatus,
  };

  switch (installBoxStatus) {
    case "verifyPopup":
      VerifyChildren = (
        <VerifyPopUp
          {...verifyPopUpProps}
          button={<Button onClick={verifyPopUpClick} {...verifyPopUpButton} />}
        />
      );
      break;
    case "verifyProgress":
      VerifyChildren = (
        <VerifyInProgress
          button={
            <Button
              onClick={verifyInProgressClick}
              text={loading ? "Loading..." : "Try again"}
              {...VerifyInProgressButton}
            />
          }
        />
      );
      break;
    case "verifySuccess":
      VerifyChildren = (
        <VerifySucces {...verifySuccProps} isStatus={isVerifySucc} />
      );
      break;

    default:
      break;
  }

  return (
    <>
      <InstallBox
        forOverview={forOverview}
        leftBottom1={<Button onClick={installBoxClick} {...leftBottom1Props} />}
        leftBottom2={<Button {...leftBottom2Props} />}
      >
        <CodeBox codeText={codeText} />
      </InstallBox>
      {isVerifyModal && (
        <div className={style.verification}>
          <div className={style.verificContent}>
            <Verification
              installBoxStatus={installBoxStatus}
              isSuccStatus={isVerifySucc}
              {...verificationProps}
            >
              {VerifyChildren}
            </Verification>
          </div>
        </div>
      )}
    </>
  );
}

export default InstallVerificationBox;
