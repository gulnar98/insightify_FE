import Button from "@/UI/button/Button";
import style from "./assets/css/style.module.css";

export default function VerifyInProgress({ button }) {
  return (
    <>
      <div className={style.main}>
        <p className={style.about}>
          Connecting to your site to verify Insightify installation
        </p>
        <p className={style.information}>This can take up to 60 seconds.</p>
        {button}
      </div>
    </>
  );
}
