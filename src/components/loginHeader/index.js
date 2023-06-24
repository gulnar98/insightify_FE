import { useContext } from "react";
import style from "./assets/css/style.module.css";
import logo from "./assets/images/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";

function LoginHeader() {
  const { pathname } = useRouter();

  return (
    <header className={style.header}>
      <ul
        className={style.stepItems}
        style={pathname === "/code/install" ? { flex: 14 } : { flex: 3 }}
      >
        <li
          className={`${style.stepItem} ${
            pathname !== "/code/install" && style.isActive
          }`}
        >
          1.Create account
        </li>
        <li
          className={`${style.stepItem} ${
            pathname === "/code/install" && style.isActive
          }`}
        >
          2.Install Insightify
        </li>
      </ul>

      <div
        className={style.logo}
        style={pathname === "/code/install" ? { flex: 15 } : { flex: 4 }}
      >
        <img src={logo.src} alt="logo" />
      </div>

      {pathname === "/code/install" && (
        <div className={style.doItLater}>
          <Link href={"/overview"}>Do it later</Link>
        </div>
      )}
    </header>
  );
}

export default LoginHeader;
