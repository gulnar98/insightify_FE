import Link from "next/link";
import style from "./style.module.css";
import logo from "@//assets/images/header/logo.svg";
import profile from "@//assets/images/header/profile.svg";

function DashboardHeader({ setIsOpen, isOpen }) {
  const setDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={style.header}>
      <Link className={style.logoWrapper} href={"/"}>
        <img src={logo.src} alt="logo" />
      </Link>

      <button onClick={setDropDown} className={style.profile}>
        <img src={profile.src} alt="profile" />
      </button>
    </header>
  );
}

export default DashboardHeader;
