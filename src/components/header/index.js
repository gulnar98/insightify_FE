import Link from "next/link";
import style from "./style.module.css";
import logo from "@//assets/images/header/logo.svg";
import profile from "@//assets/images/header/profile.svg";

function Header() {
  return (
    <header className={style.header}>
      <Link className={style.logoWrapper} href={"/"}>
        <img src={logo.src} alt="logo" />
      </Link>
      <Link className="profile" href={"/"}>
        <img src={profile.src} alt="profile" />
      </Link>
    </header>
  );
}

export default Header;
