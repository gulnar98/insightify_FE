import style from "./assets/css/style.module.css";
import grayLogin from "./assets/images/gray-login.svg";
import logout from "./assets/images/logout.svg";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRef } from "react";

import { useAccount, useDisconnect } from "wagmi";

function DropDownProfile({ setIsOpen, isOpen }) {
  const { address } = useAccount();
  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  const dropDownRef = useRef(null);
  const router = useRouter();

  const { disconnect } = useDisconnect({
    onSuccess(data) {
      router.push("/login");
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
          <p>{address ? shortAddress : "Disconnecting..."}</p>
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
