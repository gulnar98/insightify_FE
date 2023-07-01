import style from "./assets/css/style.module.css";

export default function Avatar({ imgProps, nameProps, surnameProps }) {
  let name = nameProps[0];
  let surname = surnameProps[0];
  console.log(Boolean(imgProps));

  return imgProps ? (
    <>
      <img src={imgProps} className={style.avatarImg} />
    </>
  ) : (
    <>
      <div className={style.avatarNS}>
        {name}
        {surname}
      </div>
    </>
  );
}
