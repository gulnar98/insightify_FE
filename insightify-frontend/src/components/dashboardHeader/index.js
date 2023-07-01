import Link from "next/link";
import style from "./assets/css/style.module.css";
import logo from "./assets/images/logo.svg";
import profile from "@//assets/images/header/profile.svg";

function DashboardHeader({ setIsOpen, isOpen, children }) {
  const setDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={style.header}>
      <Link className={style.logoWrapper} href={"/"}>
        <img src={logo.src} alt="logo" />
      </Link>

      <div className={style.profileWrapper}>
        <button
          onClick={setDropDown}
          className={style.profileBtn}
          data-login="login"
        >
          <img src={profile.src} alt="profile" data-login="login" />
        </button>
        {children}
      </div>
    </header>
  );
}

export default DashboardHeader;
