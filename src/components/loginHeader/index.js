import style from "./style.module.css";
import logo from "@//assets/images/login/login-logo.svg";

function LoginHeader() {
  return (
    <header className={style.header}>
      <ul className={style.stepItems}>
        <li>1.Create account</li>
        <li>2.Install Usersnap</li>
      </ul>

      <img className={style.logo} src={logo.src} alt="logo" />
    </header>
  );
}

export default LoginHeader;
