'use client'
import style from "./assets/css/style.module.css";
import grayLogin from "./assets/images/gray-login.svg";
import logout from "./assets/images/logout.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRef } from "react";

import { useAccount, useDisconnect } from "wagmi";

function DropDownProfile({ setIsOpen, isOpen }) {
  const { address } = useAccount();

  const dropDownRef = useRef(null);
  const router = useRouter();
  const [p_text, setP_text] = useState("")

  const { disconnect } = useDisconnect({
    onSuccess(data) {
      router.push("/login");
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;
    const disconnectText = "Disconnecting...";
  
    setP_text(address ? shortAddress : disconnectText)
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [address]);

  const handleClickOutside = (event) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target) &&
      event.target.dataset.login !== "login"
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        ref={dropDownRef}
        className={`${style.dropDownProfile} ${isOpen && style.open}`}
      >
        <div className={style.profileInfo}>
          <img className={style.grayLogin} src={grayLogin.src} alt="logo" />
          <p>{p_text}</p>
        </div>
        <div className={style.logoutWrapper}>
          <button className={style.logoutBtn} onClick={() => disconnect()}>
            <img className={style.logoutImg} src={logout.src} alt="logout" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default DropDownProfile;
