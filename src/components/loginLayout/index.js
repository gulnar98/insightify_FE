import LoginHeader from "../loginHeader";
import style from "./style.module.css";

import topLeft from "@//assets/images/login/top-right.svg";
import bottomLeft from "@//assets/images/login/bottom-left.svg";

function LoginLayout({ children }) {
  return (
    <>
      <LoginHeader />
      {children}

      <img className={style.topRight} src={topLeft.src} alt="topLeft" />
      <img className={style.bottomLeft} src={bottomLeft.src} alt="bottomLeft" />
    </>
  );
}

export default LoginLayout;
