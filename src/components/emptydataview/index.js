import Alert from "../../UI/alert/Alert";
import Button from "../../UI/button/Button";

export default function Emptydataview({ buttonOnClick }) {
  const alertProps = {
    color: "#FFF2DA",
    border: "solid 1px #FFC04D",
    textColor: "#000000",
    borderRadius: "4px",
    padding: "7px 15px",
    text: "Install the Usersnap to get started",
    margin: "22px 0px 0px 0px",
    width: "300px",
  };

  const buttonProps = {
    btncolor: "#1F75CC",
    btncolorHover: "#fff",
    text: "Install Usersnap",
    textColorHover: "white",
    border: "solid 1px #1F75CC",
    textColor: "white",
    textColorHover: "#1F75CC",
    borderRadius: "4px",
    padding: "7px 15px",
    fontSize: "1em",
    margin: "18px 0px",
  };

  return (
    <div>
      <Alert {...alertProps} />
      <Button {...buttonProps} onClick={buttonOnClick} />
    </div>
  );
}
