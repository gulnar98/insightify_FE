import VerifyPopUp from "../verifyPopUp";
import style from "./assets/css/style.module.css";
import success from "./assets/images/success.svg";
import succesB from "./assets/images/succesB.svg";
import exit from "./assets/images/exit.svg";
import exclamation from "./assets/images/exclamation.svg";
import Button from "@/UI/button/Button";
import VerifySucces from "../verifySucces";
import VerifyInProgress from "../verifyInProgress";

export default function Verification({
  children,
  installBoxStatus,
  isSuccStatus,
  setIsVerifyModal,
  setIsVerifySucc,
  setInstallBoxStatus,
}) {
  let img;
  let message;
  let isSuccess = true;

  const clickExit = () => {
    setIsVerifyModal(false);
    setIsVerifySucc(false);
    setInstallBoxStatus("verifyPopup");
  };

  switch (installBoxStatus) {
    case "verifyPopup":
      img = success;
      message = "Your website has not reported any data in the past 24 hours.";
      break;
    case "verifyProgress":
      img = exclamation;
      message = "Your website has not reported any data in the past 24 hours.";
      break;
    case "verifySuccess":
      if (isSuccStatus) {
        img = success;
        message =
          "https://learning.Insightify.io reported data within the past 1h.";
      } else {
        isSuccess = false;
        img = exclamation;
        message =
          "Your website has not reported any data in the past 24 hours.";
      }
      break;

    default:
      img = success;
      message = "Your website has not reported any data in the past 24 hours.";
      break;
  }

  return (
    <>
      <div className={style.main}>
        <header className={`${style.header} ${!isSuccess && style.headerErr}`}>
          <div>
            <img src={img.src} />
            <h1>{message}</h1>
          </div>
          <div>
            <button onClick={clickExit} className={style.btn}>
              <img src={exit.src} alt="exit" />
            </button>
          </div>
        </header>

        <div className={style.oneDiv}>
          <p>Tracking code</p>
          <p className={`${style.verify} ${!isSuccess && style.verifyErr}`}>
            Verify installation
          </p>
        </div>

        <div className={style.twoDiv}>{children}</div>
      </div>
    </>
  );
}
