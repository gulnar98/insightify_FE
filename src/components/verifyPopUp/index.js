import Input from "@/UI/input";
import style from "./assets/css/style.module.css";

export default function VerifyPopUp(props) {
  return (
    <>
      <div className={style.main}>
        <h1 className={style.h1}>{props.title}</h1>
        <p className={style.about}>{props.about}</p>
        <p className={style.address}>{props.address}</p>
        <Input
          padding="7px 15px"
          borderRadius="3px"
          width="90%"
          fontSize="1em"
          border="solid 1px #D6D6D6"
          margin="0 0 18px 0"
        />
        <div>{props.button}</div>
      </div>
    </>
  );
}
