import Button from "@/UI/button/Button";
import style from "./assets/css/style.module.css";
import success from "./assets/images/verify-succes.svg";
import error from "./assets/images/verify-error.svg";
import { buttonProps } from "./constants";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function VerifySucces({
  isStatus,
  setIsVerifyModal,
  setInstallBoxStatus,
}) {
  let img;
  let status;
  let message;
  let buttonText;
  const router = useRouter();

  if (isStatus) {
    img = success;
    status = "Installation successful!";
    message =
      "Insightify is capturing data on your site, adn you’re ready to get started with all of Insightify’s tools.";
    buttonText = "Continue";
  } else {
    img = error;
    status = "Tracking code not found";
    message =
      "Please ensure that you have accurately copied and pasted the tracking code into the header section of your website.";
    buttonText = "Try again";
  }

  const onClick = () => {
    if (isStatus) {
      router.push("/");
    } else {
      setIsVerifyModal(false);
      setInstallBoxStatus("verifyPopup");
    }
  };

  return (
    <>
      <div className={style.main}>
        <img src={img.src} width={"15%"} />
        <h1 className={`${!isStatus && style.statusErr} ${style.status}`}>
          {status}
        </h1>
        <p className={style.message}>{message}</p>
        <Button onClick={onClick} text={buttonText} {...buttonProps} />
      </div>
    </>
  );
}
