import Button from "@/UI/button/Button";
import style from "./assets/css/style.module.css";
import success from "./assets/images/verify-succes.svg";
import error from "./assets/images/verify-error.svg";

export default function VerifySucces({ imgName, color, onClick }) {
  const img = imgName == "success" ? success : error;
  return (
    <>
      <div className={style.main}>
        <img src={img.src} width={"9%"} />
        <p style={{ fontWeight: "bold", fontSize: "1.4em", color: "#64817A" }}>
          Installation successful!
        </p>
        <p className={style.p}>
          Usersnap is capturing data on your site, adn you’re ready to get
          started with all of Usersnap’s tools.
        </p>
        <Button
          onClick={() => null}
          padding="7px 15px"
          borderRadius="5px"
          btncolor="#418EFD"
          text="Continue"
          textColor="white"
          border="solid 2px #418EFD"
          fontSize="1em"
        />
      </div>
    </>
  );
}
