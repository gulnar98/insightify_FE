import style from "./style.module.css";
import logo from "../../assets/images/header/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function LoginWallet() {
  return (
    <>
      <div className={style.main}>
        <div className={style.topDiv}>
          <img src={logo.src} width={"35%"} />
        </div>
        <div className={style.centerDiv}>
          <p>Install Usersnap to Get User’s on-chain / off-chain data,</p>
          <p>Visualize user behavior , See and hear from your users</p>
        </div>
        <div className={style.bottomDiv}>
          <ConnectButton />
        </div>
      </div>
    </>
  );
}
