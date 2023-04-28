import VerifyPopUp from "../verifyPopUp";
import style from "./assets/css/style.module.css";
import succes from "./assets/images/succes.svg";
import succesB from "./assets/images/succesB.svg";
import exit from "./assets/images/exit.svg";
import exclamation from "./assets/images/exclamation.svg";
import Button from "@/UI/button/Button";
import VerifySucces from "../verifySucces";
import VerifyInProgress from "../verifyInProgress";

export default function Verification({
  children,
  imgName,
  setIsVerExit,
  setIsVerifyInst,
  setIsVerSucc,
}) {
  let backgroundColor = "#418EFD";
  let color = "#418EFD";
  let borderBottom = "2px solid #418EFD";

  const img = imgName == "success" ? succes : exclamation;

  const onClick = () => {
    setIsVerExit(true);
    setIsVerSucc(false);
    setIsVerifyInst(false);
  };

  return (
    <>
      <div className={style.main}>
        <header className={style.header} style={{ backgroundColor }}>
          <div>
            <img src={img.src} />
            <p>
              https://learning.usersnap.io reported data within the past 1h.
            </p>
          </div>
          <div>
            <button onClick={onClick} className={style.btn}>
              <img src={exit.src} alt="exit" />
            </button>
          </div>
        </header>

        <div className={style.oneDiv}>
          <p>Tracking code</p>
          <p className={style.verify} style={{ color, borderBottom }}>
            Verify installation
          </p>
        </div>

        <div className={style.twoDiv}>{children}</div>
      </div>
    </>
  );
}
