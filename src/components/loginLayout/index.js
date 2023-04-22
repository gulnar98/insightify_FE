import LoginHeader from "../loginHeader";
import style from "./style.module.css";

import topLeft from "@//assets/images/login/top-right.svg";
import bottomLeft from "@//assets/images/login/bottom-left.svg";

function LoginLayout({ children }) {
  return (
    <>
      <LoginHeader />
      <main>{children}</main>
    </>
  );
}

export default LoginLayout;
