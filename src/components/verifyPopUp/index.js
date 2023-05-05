import style from "./assets/css/style.module.css";

export default function VerifyPopUp(props) {
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <h1 className={style.h1}>{props.title}</h1>
          <p className={style.about}>{props.about}</p>
          <p className={style.address}>{props.address}</p>
        </div>

        <div>{props.button}</div>
      </div>
    </>
  );
}
