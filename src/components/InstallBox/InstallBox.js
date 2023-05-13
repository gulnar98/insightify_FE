import icon from "./assets/images/Icon.png";
import style from "./assets/css/style.module.css";
import Link from "next/link";

export default function InstallBox(props) {
  return (
    <>
      <div
        className={style.main}
        style={
          props.overview
            ? { margin: 0, width: "100%", backgroundColor: "#E1E1E1" }
            : null
        }
      >
        <div className={style.divOne}>
          <img src={icon.src} className={style.icon} />
          <h1 className={style.h1}>Install UserSnap</h1>
        </div>
        <div className={style.divTwo}>
          <div className={style.short}>
            <p className={style.phead}>
              Paste this code into the <span>&lt;head&gt;</span> of every page
              where you want to track user behavior or collect feedback.
            </p>
          </div>
          <div>{props.children}</div>
          <div className={style.down}>
            <div className={style.leftbtn}>
              {props.leftBottom1}
              {props.leftBottom2}
            </div>
            <div className={style.rightbottom}>
              <Link href="#" className={style.link}>
                Site ID: <strong>3342123</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
