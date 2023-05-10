import style from "./style.module.css";
import logo from "../../assets/images/header/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { useEffect } from "react";

type LoginWappetProps = {
  onSuccess: Function,
  onFailure: Function
}

export default function LoginWallet(props: LoginWappetProps): any {
  const message = process.env.NEXT_PUBLIC_WEB3_SIGN_MESSAGE;
  const { address, isConnected } = useAccount();
  const { data: sign, isSuccess, signMessage } = useSignMessage({ message });

  useEffect(() => {
    if (isSuccess) {
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          action: "login",
          address,
          sign,
        }),
      })
        .then((result) => {
          if (result.status !== 200) {
            props.onFailure({
              status: result.status
            });
          } else {
            return result.json();
          }
        })
        .then((result) => {
          props.onSuccess(result);
        });
    }
  }, [isSuccess]);

  return (
    <>
      <div className={style.main}>
        <div className={style.topDiv}>
          <img src={logo.src} />
        </div>
        <div className={style.centerDiv}>
          <p>Install Usersnap to Get User’s on-chain / off-chain data,</p>
          <p>Visualize user behavior , See and hear from your users</p>
        </div>
        <div className={style.bottomDiv}>
          {isConnected ? (
            <div>
              <button onClick={() => signMessage()}>Sign in</button>
            </div>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </>
  );
}
