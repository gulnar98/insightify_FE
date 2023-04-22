import LoginHeader from "../loginHeader";
import style from "./style.module.css";

function LoginLayout({ children }) {
  return (
    <>
      <LoginHeader />
      <main>{children}</main>
    </>
  );
}

export default LoginLayout;
