import { useContext } from "react";
import { MyContext } from "@/context/AccountProvider";
import style from "./style.module.css";
import logo from "@//assets/images/login/login-logo.svg";
import Link from "next/link";

function LoginHeader() {
  const [state, dispatch] = useContext(MyContext);

  return (
    <header className={style.header}>
      <ul
        className={style.stepItems}
        style={state.isInstalledStep ? { flex: 14 } : { flex: 3 }}
      >
        <li
          className={`${style.stepItem} ${
            !state?.isInstalledStep && style.isActive
          }`}
        >
          1.Create account
        </li>
        <li
          className={`${style.stepItem} ${
            state?.isInstalledStep && style.isActive
          }`}
        >
          2.Install Usersnap
        </li>
      </ul>

      <div
        className={style.logo}
        style={state.isInstalledStep ? { flex: 15 } : { flex: 4 }}
      >
        <img src={logo.src} alt="logo" />
      </div>

      {state?.isInstalledStep && (
        <div className={style.doItLater}>
          <Link href={"/login"}>Do it later</Link>
        </div>
      )}
    </header>
  );
}

export default LoginHeader;
