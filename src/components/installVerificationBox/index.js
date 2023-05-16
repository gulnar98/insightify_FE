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
import { useState } from "react";
import VerifyPopUp from "../verifyPopUp";
import VerifySucces from "../verifySucces";
import VerifyInProgress from "../verifyInProgress";

function InstallVerificationBox({ codeText, forOverview }) {
  const [isVerifyModal, setIsVerifyModal] = useState(false);
  const [isVerifySucc, setIsVerifySucc] = useState(false);
  const [installBoxStatus, setInstallBoxStatus] = useState("verifyPopup");

  let VerifyChildren;

  const installBoxClick = () => {
    setIsVerifyModal(true);
  };

  const verifyPopUpClick = () => {
    setIsVerifySucc(false);
    setInstallBoxStatus("verifyProgress");
  };

  const verifyInProgressClick = () => {
    setInstallBoxStatus("verifySuccess");
    setIsVerifySucc(true);
  };

  const verificationProps = {
    setIsVerifyModal,
    setIsVerifySucc,
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
              {...VerifyInProgressButton}
            />
          }
        />
      );
      break;
    case "verifySuccess":
      VerifyChildren = <VerifySucces isStatus={isVerifySucc} />;
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
        <CodeBox code={codeText} />
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
