import style from "./style.module.css";
import logo from "@//assets/images/header/logo-icon.svg";
import logout from "@//assets/images/header/logout.svg";
import { useRouter } from "next/router";

import { useAccount, useDisconnect } from "wagmi";

function DropDownProfile({ isOpen }) {
  const { address } = useAccount();
  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  const router = useRouter();

  const { disconnect } = useDisconnect({
    onSuccess(data) {
      router.push("/login");
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <>
      {isOpen && (
        <div className={style.dropDownProfile}>
          <div className={style.profileInfo}>
            <img src={logo.src} alt="logo" />
            {address && <p>{shortAddress}</p>}
          </div>
          <div>
            <img className={style.logoutImg} src={logout.src} alt="logout" />
            <button onClick={() => disconnect()}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DropDownProfile;
