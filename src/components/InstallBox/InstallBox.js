import icon from "./assets/images/Icon.png";
import style from "./assets/css/style.module.css";
import Link from "next/link";

export default function InstallBox(props) {
  return (
    <>
      <div className={style.main}>
        <div className={style.divOne}>
          <img src={icon.src} className={style.icon} />
          <h1 className={style.h1}>{props.title}</h1>
        </div>
        <div className={style.divTwo}>
          <div className={style.short}>
            <p className={style.phead}>
              Paste this code into the <span>&lt;head&gt;</span> of every page
              where you want to track user behavior or collect feedback.
            </p>
          </div>
          <div className={style.code}>{props.children}</div>
          <div className={style.down}>
            <div className={style.leftbtn}>
              {props.leftBottom1}
              {props.leftBottom2}
            </div>
            <div className={style.rightbottom}>
              <Link href="#" className={style.link}>
                Site ID: <strong>{props.rightBottom1}</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
