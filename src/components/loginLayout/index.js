import LoginHeader from "../loginHeader";
import style from "./style.module.css";

function LoginLayout({ children }) {
  return (
    <>
      <LoginHeader />
      {children}
    </>
  );
}

export default LoginLayout;
