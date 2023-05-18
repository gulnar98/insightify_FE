import icon from "./assets/images/Icon.png";
import style from "./assets/css/style.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function InstallBox(props) {
  const [appId, setAppId] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("/api/code");
        const jsonData = JSON.parse(await data.text());
        const appId = jsonData.appId;
        setAppId(appId);
      } catch {}
    })();
  }, []);

  return (
    <>
      <div
        className={style.main}
        style={
          props.forOverview
            ? { margin: 0, width: "100%", backgroundColor: "#F4F7FF" }
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
              <p className={style.link}>
                App ID: <strong>{appId}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
