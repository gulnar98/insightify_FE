import style from "./style.module.css";
import logo from "@//assets/images/login/login-logo.svg";

function LoginHeader() {
  return (
    <header className={style.header}>
      <ul className={style.stepItems}>
        <li className={`${style.stepItem} ${style.isActive}`}>
          1.Create account
        </li>
        <li className={`${style.stepItem}`}>2.Install Usersnap</li>
      </ul>

      <div className={style.logo}>
        <img src={logo.src} alt="logo" />
      </div>
    </header>
  );
}

export default LoginHeader;
